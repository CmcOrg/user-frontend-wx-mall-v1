import {ToastSuccess} from "./ToastUtil";
import {NavigateTo} from "./NavigateUtil";
import PathConstant from "../model/constant/PathConstant";
import LocalStorageKey from "../model/constant/LocalStorageKey";

// 退出登录
export function SignOut(msg?: string) {
    wx.clearStorageSync()
    if (msg) {
        ToastSuccess(msg)
    }
    NavigateTo(PathConstant.SIGN_IN_PATH)
}

// 获取：jwt
export function GetJwt() {
    return wx.getStorageSync(LocalStorageKey.JWT)
}
