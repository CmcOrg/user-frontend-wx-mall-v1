import {GetJwt, GetUserInfo, SetJwt} from "./util/UserUtil";
import {IAppOption} from "../typings";
import {UserSelfInfoVO} from "./api/none/UserSelfController";
import {ShowToast} from "./util/ToastUtil";
import {SignWxSignInCode} from "./api/sign/SignWxController";

App<IAppOption>({
    globalData: {
        statusBarHeight: 0,
        menuButtonHeight: 0,
        menuButtonWidth: 0,
        menuButtonMarginTop: 0,
        menuButtonMarginRight: 0,
        userSelfInfoVO: {} as UserSelfInfoVO, // 登录的用户信息
    },
    onLaunch() {
        const menuButton = wx.getMenuButtonBoundingClientRect();
        const that = this
        wx.getSystemInfo({
            success: (res) => {
                that.globalData.statusBarHeight = res.statusBarHeight
                that.globalData.menuButtonMarginTop = menuButton.top - res.statusBarHeight
                that.globalData.menuButtonMarginRight = res.windowWidth - menuButton.right
                that.globalData.menuButtonWidth = menuButton.width + that.globalData.menuButtonMarginRight
                that.globalData.menuButtonHeight = menuButton.height + (that.globalData.menuButtonMarginTop * 2);
            },
        })

        // 获取：登录的用户信息
        if (GetJwt()) {
            doGetUserInfo()
        } else {
            wx.clearStorageSync()
            wx.login({
                success(res) {
                    if (res.code) {
                        SignWxSignInCode({code: res.code}).then(res => {
                            SetJwt(res.data)
                            doGetUserInfo()
                        })
                    } else {
                        ShowToast("登录失败：errMsg：" + res.errMsg)
                    }
                }
            })
        }

        // 执行：获取：登录的用户信息
        function doGetUserInfo() {
            GetUserInfo(true).then(res => {
                that.globalData.userSelfInfoVO = res
            })
        }

    },

})
