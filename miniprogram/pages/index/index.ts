const app = getApp<IAppOption>()
Page({
    data: {
        statusBarHeight: app.globalData.statusBarHeight + 'px',
        menuButtonHeight: app.globalData.menuButtonHeight + 'px',
        menuButtoMarginRight: app.globalData.menuButtoMarginRight,
    },
    onLoad() {
    },
})
