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
        const threshold = 50; // 下一个标题与顶部的距离
        if (scrollTop < threshold) {
            this.setData({sideBarIndex: 0});
            return;
        }
        const index = this.data.offsetTopList.findIndex((item) => item > scrollTop && item - scrollTop <= threshold);
        if (index !== -1 && this.data.sideBarIndex !== index) {
            this.setData({sideBarIndex: index});
        }

    },
});
