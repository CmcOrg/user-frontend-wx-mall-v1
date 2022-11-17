/// <reference path="./types/index.d.ts" />

interface IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo,
        statusBarHeight: number // 导航栏高度
        menuButtonHeight: number // 右侧胶囊高度
        menuButtonWidth: number // 右侧胶囊宽度
        menuButtoMarginTop: number // 右侧胶囊 margin-top的值
        menuButtoMarginRight: number // 右侧胶囊 margin-right的值
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
