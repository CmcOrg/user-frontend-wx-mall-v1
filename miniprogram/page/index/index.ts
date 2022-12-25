import {InDev} from "../../util/CommonUtil";
import {DrawMarquee} from "tdesign-miniprogram/notice-bar/type"
import {UserSelfInfoVO} from "../../api/none/UserSelfController";
import {GetUserInfo} from "../../util/UserUtil";
import {NavigateTo} from "../../util/NavigateUtil";
import PathConstant from "../../model/constant/PathConstant";

const app = getApp<IAppOption>()

type TOrderCardListItemOrderType = 'pay' | 'package' | 'comment' | 'exchange'

interface IOrderCardListItem {
    icon: string
    title: string
    number: number
    orderType: TOrderCardListItemOrderType
}

interface IIndex {
    statusBarHeight: string
    menuButtonHeight: string
    menuButtonMarginRight: number
    marquee: DrawMarquee
    popupVisible: boolean
    userSelfInfoVO: UserSelfInfoVO // 登录的用户信息
    orderCardList: IOrderCardListItem[] // 我的订单 cardList
}

const data: IIndex = {
    statusBarHeight: app.globalData.statusBarHeight + 'px',
    menuButtonHeight: app.globalData.menuButtonHeight + 'px',
    menuButtonMarginRight: app.globalData.menuButtonMarginRight,
    marquee: {
        speed: 10
    },
    popupVisible: false,
    userSelfInfoVO: {} as UserSelfInfoVO,
    orderCardList: [
        {
            icon: "wallet",
            title: "待付款",
            number: 0,
            orderType: 'pay',
        },
        {
            icon: "package",
            title: "待收货",
            number: 0,
            orderType: 'package',
        },
        {
            icon: "comment",
            title: "待评价",
            number: 0,
            orderType: 'comment',
        },
        {
            icon: "exchang",
            title: "退款/售后",
            number: 0,
            orderType: 'exchange',
        },
    ]
}

Page({
    data,
    onLoad() {
        // 获取：用户基本信息
        GetUserInfo().then(res => {
            this.setData({
                userSelfInfoVO: res
            })
        })
    },
    orderItemClick(e: { currentTarget: { dataset: { orderType: TOrderCardListItemOrderType; }; }; }) {
        const {orderType} = e.currentTarget.dataset;
        if (orderType === 'pay') { // 待支付
            console.log("待支付")
            InDev()
        } else if (orderType === 'package') { // 待收货
            console.log("待收货")
            InDev()
        } else if (orderType === 'comment') { // 待评价
            console.log("待评价")
            InDev()
        } else if (orderType === 'exchange') { // 退款/售后
            console.log("退款/售后")
            InDev()
        }
    },
    InDev() {
        InDev()
    },
    addressDelivery() {
        console.log("收货地址")
        InDev()
    },
    myOrderClick() {
        console.log("我的订单")
        InDev()
    },
    accountClick() {
        console.log("accountClick")
        InDev()
    },
    dinnerClick() {
        NavigateTo(PathConstant.DINNER_PATH)
    },
    takeawayClick() {
        NavigateTo(PathConstant.TAKEAWAY_PATH)
    },
    openPopup() {
        this.setData({
            popupVisible: true
        })
    },
    onPopupVisibleClose() {
        this.setData({
            popupVisible: false,
        });
    },
})
