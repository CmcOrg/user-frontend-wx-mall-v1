/// <reference path="./types/index.d.ts" />

interface IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo,
        statusBarHeight: number // 导航栏高度
        menuButtonHeight: number // 右侧胶囊高度
        menuButtonWidth: number // 右侧胶囊宽度
        menuButtonMarginTop: number // 右侧胶囊 margin-top的值
        menuButtonMarginRight: number // 右侧胶囊 margin-right的值
        userSelfInfoVO: any // 登录的用户信息，备注：这里的类型是：UserSelfInfoVO
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
