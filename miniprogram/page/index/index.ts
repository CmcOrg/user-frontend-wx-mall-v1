import {DrawMarquee} from "tdesign-miniprogram/notice-bar/type"
import {GetJwt, SetJwt} from "../../util/UserUtil";
import {ToastSuccess} from "../../util/ToastUtil";
import {SignWxSignInPhoneCode} from "../../api/sign/SignWxController";
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
    bindGetPhoneNumber(e: { detail: { code: string; }; }) {
        if (!e.detail.code) {
            return
        }
        SignWxSignInPhoneCode({phoneCode: e.detail.code}).then(res => {
            wx.clearStorageSync()
            ToastSuccess('欢迎回来~')
            SetJwt(res.data)
            this.setData({
                jwt: res.data
            })
        })
    },
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
