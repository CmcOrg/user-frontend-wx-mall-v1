import {DrawMarquee} from "tdesign-miniprogram/notice-bar/type"
import {GetJwt} from "../../util/UserUtil";
import {NavigateTo} from "../../util/NavigateUtil";
import PathConstant from "../../model/constant/PathConstant";

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
        if (GetJwt()) {

        } else {
            NavigateTo(PathConstant.SIGN_IN_PATH)
        }
    },
    signInClick() {
        NavigateTo(PathConstant.SIGN_IN_PATH)
    },
    openPopup() {
        this.setData({
            popupVisible: true
        })
    },
    onPopupVisibleChange(e: any) {
        this.setData({
            popupVisible: e.detail.visible,
        });
    },
})
