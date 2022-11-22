const image = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';
const itemList = new Array(20).fill({label: '标题文字', image}, 0, 20);

Page({
    offsetTopList: [],
    data: {
        sideBarIndex: 0,
        scrollTop: 0,
        categoryList: [
            {
                label: '选项选项选项',
                title: '标题',
                itemList,
            },
            {
                label: '选项',
                title: '标题',
                itemList,
            },
            {
                label: '选项',
                title: '标题',
                itemList,
            },
            {
                label: '选项',
                title: '标题',
                itemList,
            },
            {
                label: '选项',
                title: '标题',
                itemList,
            },
        ],
    },
    onLoad() {
        this.imageLoad()
    },
    imageLoad() {
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

        const threshold = 50; // 下一个标题与顶部的距离

        if (scrollTop < threshold) {
            this.setData({sideBarIndex: 0});
            return;
        }

        const index = this.offsetTopList.findIndex((item) => item > scrollTop && item - scrollTop <= threshold);

        if (index !== -1 && this.data.sideBarIndex !== index) {
            this.setData({sideBarIndex: index});
        }

    },
});
