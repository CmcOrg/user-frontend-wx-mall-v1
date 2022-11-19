import {ToastError} from './ToastUtil'
import {SignOut} from "./UserUtil";

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


function $http<T = any>(url: string,
                        data?: T,
                        method: 'GET' | 'POST' = 'POST',
                        header?: any) {
    return new Promise<ApiResultVO>((resolve, reject) => {
        wx.request({
            url: baseUrl + url,
            // @ts-ignore
            data,
            method,
            timeout: 30 * 60 * 1000, // 默认 30分钟
            header: {...header, category: 4},
            success: (res) => {
                const data = res.data as ApiResultVO
                if (data.code !== 200 || !data.successFlag) {
                    if (data.code === 100111) { // 这个代码需要跳转到：登录页面
                        SignOut()
                        ToastError(data.msg)
                    } else {
                        if (!(header && header.hiddenErrorMsg)) {
                            ToastError(data.msg)
                        }
                    }
                    reject(data.msg)
                }
                return resolve(data)
            },
            fail: (err) => {
                ToastError(err.errMsg)
                reject(err.errMsg)
            }
        })
    })
}

export default $http
