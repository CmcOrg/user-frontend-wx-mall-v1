import {ToastError} from './ToastUtil'
import {GetJwt, onlyWxCodeSignIn, RemoveJwt} from "./UserUtil";

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
                const resData = res.data as ApiResultVO<T>
                if (resData.code !== 200 || !resData.successFlag) {
                    if (resData.code === 100111) { // 这个代码表示需要：重新登录
                        RemoveJwt() // 清除 jwt
                        let retryNumber = 0 // 累计重试次数
                        if (header && header.retryNumber) {
                            retryNumber = header.retryNumber
                        }
                        if (retryNumber > MAX_RETRY) {
                            ToastError("jwt 获取失败，请联系管理员")
                        } else {
                            onlyWxCodeSignIn().then(() => { // 换取最新的 jwt，再执行一遍
                                $http(url, data, method, {...header, retryNumber: retryNumber + 1}).then(resData => {
                                    return resolve(resData)
                                }).catch(errMsg => {
                                    return reject(errMsg)
                                })
                            })
                            return
                        }
                    } else {
                        if (!(header && header.hiddenErrorMsg)) {
                            ToastError(resData.msg)
                        }
                    }
                    return reject(resData.msg)
                } else {
                    return resolve(resData)
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
