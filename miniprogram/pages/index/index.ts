import {DrawMarquee} from "tdesign-miniprogram/notice-bar/type"

const app = getApp<IAppOption>()

interface IIndex {
    userInfo: WechatMiniprogram.UserInfo
    marquee: DrawMarquee
}

Page({
    data: {
        userInfo: {} as WechatMiniprogram.UserInfo,
        statusBarHeight: app.globalData.statusBarHeight + 'px',
        menuButtonHeight: app.globalData.menuButtonHeight + 'px',
        menuButtonMarginRight: app.globalData.menuButtonMarginRight,
        marquee: {
            speed: 10
        },
    } as IIndex,
    onLoad() {
    },
})
