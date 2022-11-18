// app.ts
App<IAppOption>({
    globalData: {
        statusBarHeight: 0,
        menuButtonHeight: 0,
        menuButtonWidth: 0,
        menuButtoMarginTop: 0,
        menuButtoMarginRight: 0,
    },
    onLaunch() {
        const menuButton = wx.getMenuButtonBoundingClientRect();
        const that = this
        wx.getSystemInfo({
            success: (res) => {
                that.globalData.statusBarHeight = res.statusBarHeight
                that.globalData.menuButtoMarginTop = menuButton.top - res.statusBarHeight
                that.globalData.menuButtoMarginRight = res.windowWidth - menuButton.right
                that.globalData.menuButtonWidth = menuButton.width + that.globalData.menuButtoMarginRight
                that.globalData.menuButtonHeight = menuButton.height + (that.globalData.menuButtoMarginTop * 2);
            },
        })
    },
})
