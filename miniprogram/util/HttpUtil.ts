import {ToastError} from './ToastUtil'
import {GetJwt, onlyWxCodeSignIn} from "./UserUtil";

const baseUrl = 'http://localhost:30000'

export interface ApiResultVO<T = string> {
    code: number
    successFlag: boolean
    msg: string
    data: T
    service: string
}

export interface Page<T> {
    total: number // 总数
    size: number // 每页显示条数，默认 10
    current: number // 当前页
    records: T[] // 查询数据列表
}

const MAX_RETRY = 5; // 最大重试次数

function $http<T = any, D = any>(url: string,
                                 data?: D,
                                 method: 'GET' | 'POST' = 'POST',
                                 header?: any) {
    return new Promise<ApiResultVO<T>>((resolve, reject) => {

        const jwt = GetJwt();

        wx.request({
            url: baseUrl + url,
            // @ts-ignore
            data,
            method,
            timeout: 30 * 60 * 1000, // 默认 30分钟
            header: {...header, category: 4, Authorization: jwt},
            success: (res) => {
                const data = res.data as ApiResultVO<T>
                if (data.code !== 200 || !data.successFlag) {
                    if (data.code === 100111) { // 这个代码表示需要：重新登录
                        console.log(data.msg)
                        let retryNumber = 0 // 累计重试次数
                        if (header && header.retryNumber) {
                            retryNumber = header.retryNumber
                        }
                        if (retryNumber > MAX_RETRY) {
                            ToastError("jwt 获取失败，请联系管理员")
                        } else {
                            onlyWxCodeSignIn().then(() => { // 换取最新的 jwt，再执行一遍
                                $http(url, data, method, {...header, retryNumber: retryNumber + 1}).then(res => {
                                    return resolve(res)
                                }).catch(err => {
                                    return reject(err)
                                })
                            })
                            return
                        }
                    } else {
                        if (!(header && header.hiddenErrorMsg)) {
                            ToastError(data.msg)
                        }
                    }
                    return reject(data.msg)
                } else {
                    return resolve(data)
                }
            },
            fail: (err) => {
                ToastError(err.errMsg)
                reject(err.errMsg)
            }
        })
    })
}

export default $http
