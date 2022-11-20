import {DrawMarquee} from "tdesign-miniprogram/notice-bar/type"
import {GetJwt} from "../../util/UserUtil";
import {IAppOption} from "../../../typings";

const app = getApp<IAppOption>()

interface IIndex {
    marquee: DrawMarquee
}

Page({
    data: {
        statusBarHeight: app.globalData.statusBarHeight + 'px',
        menuButtonHeight: app.globalData.menuButtonHeight + 'px',
        menuButtonMarginRight: app.globalData.menuButtonMarginRight,
        marquee: {
            speed: 10
        },
        popupVisible: false,
        jwt: GetJwt(),
    } as IIndex,
    onLoad() {
    },
    // bindGetPhoneNumber(e: { detail: { code?: string; errMsg?: string }; }) {
    //     if (!e.detail.code) {
    //         ShowToast("操作失败：errMsg：" + e.detail.errMsg)
    //         return
    //     }
    //     SignWxSignInPhoneCode({phoneCode: e.detail.code}).then(res => {
    //         wx.clearStorageSync()
    //         ToastSuccess('欢迎回来~')
    //         SetJwt(res.data)
    //         this.setData({
    //             jwt: res.data
    //         })
    //     })
    // },
    cardClick() {
        if (GetJwt()) {

        } else {
        }
    },
    openPopup() {
        this.setData({
            popupVisible: true
        })
    },
    onPopupVisibleChange(e: { detail: { visible: boolean; }; }) {
        this.setData({
            popupVisible: e.detail.visible,
        });
    },
})
