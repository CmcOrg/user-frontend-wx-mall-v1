import LocalStorageKey from "../model/constant/LocalStorageKey";
import {UserSelfInfo, UserSelfInfoVO} from "../api/none/UserSelfController";
import {SignWxSignInCode} from "../api/sign/SignWxController";
import {ShowToast} from "./ToastUtil";

// 微信 code登录
export function WxCodeSignIn() {
    wx.clearStorageSync()
    return onlyWxCodeSignIn()
}

// 只执行；微信 code登录
export function onlyWxCodeSignIn() {
    return new Promise<string>((resolve) => {
        wx.login({
            success(res) {
                if (res.code) {
                    SignWxSignInCode({code: res.code}).then(res => {
                        SetJwt(res.data)
                        resolve(res.data)
                    })
                } else {
                    ShowToast("登录失败，请联系管理员：errMsg：" + res.errMsg)
                }
            }
        })
    })
}

// 获取：jwt
export function GetJwt() {
    return wx.getStorageSync(LocalStorageKey.JWT)
}

// 设置：jwt
export function SetJwt(jwt: string) {
    wx.setStorageSync(LocalStorageKey.JWT, jwt)
}

// 获取：用户基本信息
// 备注：一般使用：const app = getApp<IAppOption>()，app.globalData.userSelfInfoVO，来获取 用户基本信息，基本上不要使用本方法
export async function GetUserInfo() {

    let userInfo = {} as UserSelfInfoVO

    if (!GetJwt()) {
        await WxCodeSignIn()
    }

    userInfo = wx.getStorageSync(LocalStorageKey.USER_SELF_INFO);
    if (userInfo && userInfo.nickname) {
        // 异步：更新：用户基本信息
        UserSelfInfo().then(res => {
            SetUserSelfInfo(res.data)
        })
    } else {
        await UserSelfInfo().then(res => {
            SetUserSelfInfo(res.data)
            userInfo = res.data
        })
    }

    return userInfo

}

// 设置：用户基本信息
export function SetUserSelfInfo(userInfo: UserSelfInfoVO) {
    const app = getApp<IAppOption>()
    app.globalData.userSelfInfoVO = userInfo
    wx.setStorageSync(LocalStorageKey.USER_SELF_INFO, userInfo)
}
