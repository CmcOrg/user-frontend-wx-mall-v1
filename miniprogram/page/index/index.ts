import {DrawMarquee} from "tdesign-miniprogram/notice-bar/type"
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
    } as IIndex,
    onLoad() {
    },
    cardClick() {
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
