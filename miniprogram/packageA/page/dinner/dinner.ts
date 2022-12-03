import {TakeawayCategoryDO, TakeawaySpuUserProduct} from "../../../api/admin/TakeawaySpuController";

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
    },
    // 获取列表数据
    getListDate() {
        TakeawaySpuUserProduct({scene: 1}).then(res => {
            console.log(res)
        })
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
