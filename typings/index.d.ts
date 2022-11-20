/// <reference path="./types/index.d.ts" />

import {UserSelfInfoVO} from "../miniprogram/api/none/UserSelfController";

interface IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo,
        statusBarHeight: number // 导航栏高度
        menuButtonHeight: number // 右侧胶囊高度
        menuButtonWidth: number // 右侧胶囊宽度
        menuButtonMarginTop: number // 右侧胶囊 margin-top的值
        menuButtonMarginRight: number // 右侧胶囊 margin-right的值
        userSelfInfoVO: UserSelfInfoVO // 登录的用户信息
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
