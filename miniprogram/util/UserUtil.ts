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
    wx.setStorageSync(LocalStorageKey.JWT, jwt)
}

// 获取：用户基本信息，cacheFlag：如果有缓存值，是否从缓存里面获取值，并且会异步更新缓存值
export async function GetUserInfo(cacheAndUpdateFlag: boolean) {

    let userInfo = {} as UserSelfInfoVO

    const jwt = GetJwt();

    if (cacheAndUpdateFlag) {
        if (!jwt) {
            return userInfo;
        }
        userInfo = wx.getStorageSync(LocalStorageKey.USER_SELF_INFO);
        if (userInfo && userInfo.nickname) {
            doUserSelfInfo()
            return userInfo;
        }
    }

    if (!jwt) {
        return userInfo
    } else {
        await doUserSelfInfo()
        return userInfo
    }

    // 执行：获取：用户基本信息
    function doUserSelfInfo() {
        return UserSelfInfo().then(res => {
            userInfo = res.data
            SetUserSelfInfo(res.data)
        })
    }

}

// 设置：用户基本信息
export function SetUserSelfInfo(userInfo: UserSelfInfoVO) {
    wx.setStorageSync(LocalStorageKey.USER_SELF_INFO, userInfo)
}
