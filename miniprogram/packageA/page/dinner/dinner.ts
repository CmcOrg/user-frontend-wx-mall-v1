import {TakeawayCategoryDO, TakeawaySpuUserProduct} from "../../../api/admin/TakeawaySpuController";
import LocalStorageKey from "../../../model/constant/LocalStorageKey";

interface IDinner {
    sideBarIndex: number
    scrollTop: number
    offsetTopList: number[]
    productList: TakeawayCategoryDO[]
}

const data: IDinner = {
    sideBarIndex: 0,
    scrollTop: 0,
    offsetTopList: [],
    productList: [],
}

Page({
    data,
    onLoad() {
        this.getListDate() // 获取列表数据
        this.offsetTopListInit()
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
                const offsetTopList = rectList.map((item: { top: number; }) => item.top);
                this.setData({
                    offsetTopList
                })
            }).exec();
    },
    onSideBarChange(e: { detail: { value: number; }; }) {
        const {value} = e.detail;
        this.setData({sideBarIndex: value, scrollTop: this.data.offsetTopList[value]});
    },
    onScroll(e: { detail: { scrollTop: number; }; }) {
        const {scrollTop} = e.detail;
        let indexValue = -1;
        this.data.offsetTopList.some((item, index, array) => {
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
