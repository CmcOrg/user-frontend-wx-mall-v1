const image = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';
const itemList: ICategoryListItemItemListItem[] = new Array(20).fill({label: '标题文字', image, type: 2}, 0, 20);

type TCategoryListItemItemListItemType = 1 | 2

interface ICategoryListItemItemListItem {
    label: string
    image?: string
    type: TCategoryListItemItemListItemType
}

interface ICategoryListItem {
    label: string,
}

interface IDinner {
    sideBarIndex: number
    scrollTop: number
    offsetTopList: number[]
    categoryList: ICategoryListItem[]
    itemList: ICategoryListItemItemListItem[][],
}

const data: IDinner = {
    sideBarIndex: 0,
    scrollTop: 0,
    offsetTopList: [],
    categoryList: [
        {
            label: '波波奶茶',
        },
        {
            label: '普通奶茶',
        },
        {
            label: '果茶',
        },
        {
            label: '烧仙草',
        },
        {
            label: '芋圆奶茶',
        },
    ],
    itemList: [
        {label: "波波奶茶", type: 1}, ...itemList
    ]
}

Page({
    itemTitleHeight: 61,
    itemProductHeight: 75,
    itemProductGapHeight: 20, // 间隔高度
    allHeight: 0, // 整体高度
    marginBottomHeight: 200, // 距离底部的高度
    data,
    onLoad() {
        this.calcAllHeight() // 计算：整体高度
    },
    // 计算：整体高度
    calcAllHeight() {

        this.data.categoryList.forEach((item, index) => {
            let itemAllHeight = 0 // 这一块分类商品的整体高度
            itemAllHeight += this.itemTitleHeight
            itemAllHeight += item.itemList.length * this.itemProductHeight
            itemAllHeight += (item.itemList.length - 1) * this.itemProductGapHeight
            this.data.offsetTopList[index] = this.allHeight
            this.allHeight += itemAllHeight
        })

        this.allHeight += this.marginBottomHeight

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
