import {DrawMarquee} from "tdesign-miniprogram/notice-bar/type"
import {UserSelfInfoVO} from "../../api/none/UserSelfController";
import {GetUserInfo} from "../../util/UserUtil";

const app = getApp<IAppOption>()

interface IOrderCardListItem {
    icon: string
    title: string
    number: number
    iconClass: string
}

interface IIndex {
    marquee: DrawMarquee
    userSelfInfoVO: UserSelfInfoVO // 登录的用户信息
    orderCardList: IOrderCardListItem[] // 我的订单 cardList
}

Page({
    data: {
        statusBarHeight: app.globalData.statusBarHeight + 'px',
        menuButtonHeight: app.globalData.menuButtonHeight + 'px',
        menuButtonMarginRight: app.globalData.menuButtonMarginRight,
        marquee: {
            speed: 10
        },
        popupVisible: true,
        userSelfInfoVO: {} as UserSelfInfoVO,
        orderCardList: [
            {
                icon: "wallet",
                title: "待付款",
                number: 0,
                iconClass: 'f-23',
            },
            {
                icon: "package",
                title: "待收货",
                number: 0,
                iconClass: 'f-23',
            },
            {
                icon: "comment",
                title: "待评价",
                number: 0,
                iconClass: 'f-22',
            },
            {
                icon: "exchang",
                title: "退款/售后",
                number: 0,
                iconClass: 'f-22',
            },
        ]
    } as IIndex,
    onLoad() {
        // 获取：用户基本信息
        GetUserInfo().then(res => {
            this.setData({
                userSelfInfoVO: res
            })
        })
    },
    goMyOrderClick() {
        console.log("我的订单")
    },
    accountClick() {
        console.log("accountClick")
    },
    cardClick() {
        console.log("cardClick")
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
