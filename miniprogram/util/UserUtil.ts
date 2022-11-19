import {ToastSuccess} from "@/util/ToastUtil";
import PathConstant from "@/model/constant/PathConstant";
import {NavigateTo} from "@/util/NavigateUtil";
import LocalStorageKey from "@/model/constant/LocalStorageKey";

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
