import {ToastSuccess} from "./ToastUtil";
import {NavigateTo} from "./NavigateUtil";
import PathConstant from "../model/constant/PathConstant";
import LocalStorageKey from "../model/constant/LocalStorageKey";
import {UserSelfInfo, UserSelfInfoVO} from "../api/none/UserSelfController";

// 退出登录
export function SignOut(msg?: string) {
    wx.clearStorageSync()
    if (msg) {
        ToastSuccess(msg)
    }
    NavigateTo(PathConstant.INDEX_PATH)
}

// 获取：jwt
export function GetJwt() {
    return wx.getStorageSync(LocalStorageKey.JWT)
}

// 设置：jwt
export function SetJwt(jwt: string) {
    return wx.setStorageSync(LocalStorageKey.JWT, jwt)
}

// 获取：用户基本信息
export async function GetUserInfo() {
    if (GetJwt()) {
        let userInfo = {} as UserSelfInfoVO
        await UserSelfInfo().then(res => {
            userInfo = res.data
        })
        return userInfo
    } else {
        return {}
    }
}
