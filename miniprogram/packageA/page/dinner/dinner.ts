const image = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';
const items = new Array(90).fill({label: '标题文字', image}, 0, 90);

Page({
    offsetTopList: [],
    data: {
        sideBarIndex: 0,
        scrollTop: 0,
        categoryList: [
            {
                label: '选项选项选项',
                title: '标题',
                items,
            },
            {
                label: '选项',
                title: '标题',
                items: items.slice(0, 90),
            },
            {
                label: '选项',
                title: '标题',
                items: items.slice(0, 90),
            },
            {
                label: '选项',
                title: '标题',
                items: items.slice(0, 90),
            },
            {
                label: '选项',
                title: '标题',
                items: items.slice(0, 90),
            },
        ],
    },
    onLoad() {

        const query = wx.createSelectorQuery().in(this);

        query
            .selectAll('.title')
            .boundingClientRect((rectList: any) => {
                this.offsetTopList = rectList.map((item: { top: number; }) => item.top);
            })
            .exec();

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

        const index = this.offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);

        if (index > -1) {
            this.setData({sideBarIndex: index});
        }

    },
});
