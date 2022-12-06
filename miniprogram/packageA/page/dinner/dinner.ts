import {TakeawayCategoryDO, TakeawaySpuDO, TakeawaySpuUserProduct} from "../../../api/admin/TakeawaySpuController";
import LocalStorageKey from "../../../model/constant/LocalStorageKey";

interface IChooseSkuObj {
    chooseNumber: number
}

interface IDinner {
    sideBarIndex: number
    scrollTop: number
    productList: TakeawayCategoryDO[]
    popupVisible: boolean
    popupSpu: TakeawaySpuDO
    chooseSkuObj: Record<string, IChooseSkuObj>, // id: TakeawaySkuDO
}

const data: IDinner = {
    sideBarIndex: 0,
    scrollTop: 0,
    productList: [],
    popupVisible: false,
    popupSpu: {},
    chooseSkuObj: {},
}

Page({
    offsetTopList: [], // number[]
    data,
    onLoad() {
        this.getListDate() // 获取列表数据
        this.offsetTopListInit()
    },
    chooseNumberChange(e: { currentTarget: { dataset: { index: number }; }; detail: { value: number }; }) {
        this.data.popupSpu.takeawaySkuDOList![e.currentTarget.dataset.index].chooseNumber = e.detail.value
        this.setData({
            popupSpu: this.data.popupSpu
        })
    },
    onPopupVisibleChange(e: { detail: { visible: boolean; }; }) {
        this.setData({
            popupVisible: e.detail.visible,
        });
    },
    // 点击：选规格
    chooseSpecClick(e: { currentTarget: { dataset: { spu: TakeawaySpuDO; }; }; }) {
        this.setData({
            popupVisible: true,
        });
        this.setData({
            popupSpu: e.currentTarget.dataset.spu
        })
    },
    // 获取列表数据
    getListDate() {
        this.setData({
            productList: wx.getStorageSync(LocalStorageKey.DINNER_SPU_USER_PRODUCT)
        })
        TakeawaySpuUserProduct({scene: 1}).then(res => {
            this.setData({
                productList: res.data
            }, () => {
                this.offsetTopListInit()
            })
            wx.setStorageSync(LocalStorageKey.DINNER_SPU_USER_PRODUCT, res.data)
        })
    },
    offsetTopListInit() {
        const query = wx.createSelectorQuery().in(this);
        query
            .selectAll('.title')
            .boundingClientRect((rectList: any) => {
                this.offsetTopList = rectList.map((item: { top: number; }) => item.top);
            }).exec();
    },
    onSideBarChange(e: { detail: { value: number; }; }) {
        const {value} = e.detail;
        this.setData({sideBarIndex: value, scrollTop: this.offsetTopList[value]});
    },
    onScroll(e: { detail: { scrollTop: number; }; }) {
        const {scrollTop} = e.detail;
        let indexValue = -1;
        this.offsetTopList.some((item, index, array) => {
            if (index === array.length) {
                indexValue = index;
                return true
            } else if (scrollTop >= item && scrollTop < array[index + 1]) {
                indexValue = index;
                return true
            } else {
                return false
            }
        })
        if (indexValue !== -1 && this.data.sideBarIndex !== indexValue) {
            this.setData({sideBarIndex: indexValue});
        }
    },
})
;
