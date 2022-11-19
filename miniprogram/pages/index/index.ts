import {DrawMarquee} from "tdesign-miniprogram/notice-bar/type"
import {GetJwt, GetUserInfo} from "../../util/UserUtil";
import {UserSelfInfoVO} from "../../api/none/UserSelfController";
import {ToastSuccess} from "../../util/ToastUtil";

const app = getApp<IAppOption>()

interface IIndex {
    marquee: DrawMarquee
    userSelfInfoVO: UserSelfInfoVO
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
        userSelfInfoVO: {},
        jwt: '',
    } as IIndex,
    onLoad() {
        if (GetJwt()) {
            GetUserInfo().then(res => {
                this.setData({
                    userSelfInfoVO: res
                })
            })
        }
    },
    bindGetPhoneNumber(e: { detail: { code: string; }; }) {
        if (!e.detail.code) {
            return
        }
        ToastSuccess('登录成功')
        this.setData({
            jwt: 'jwt'
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
