const app = getApp<IAppOption>()

interface IIndex {
    userInfo: WechatMiniprogram.UserInfo
}

Page({
    data: {
        userInfo: {} as WechatMiniprogram.UserInfo,
        statusBarHeight: app.globalData.statusBarHeight + 'px',
        menuButtonHeight: app.globalData.menuButtonHeight + 'px',
        menuButtoMarginRight: app.globalData.menuButtoMarginRight,
    } as IIndex,
    onLoad() {
    },
    getUserProfile() {
        wx.getUserProfile({
            desc: '展示用户信息',
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                })
            }
        })
    },
})
