import {
    TakeawayCategoryDO,
    TakeawaySkuDO,
    TakeawaySpuDO,
    TakeawaySpuUserProduct
} from "../../../api/admin/TakeawaySpuController";
import LocalStorageKey from "../../../model/constant/LocalStorageKey";
// @ts-ignore
import Dialog from '@vant/weapp/dialog/dialog';
import CollUtil from "../../../util/CollUtil";

interface IDinner {
    sideBarIndex: number
    scrollTop: number
    productList: TakeawayCategoryDO[]
    popupVisible: boolean
    choosePopupVisible: boolean
    popupSpu: TakeawaySpuDO
    chooseSkuObj: Record<string, TakeawaySkuDO>, // skuId: TakeawaySkuDO
    allChooseMoney: number,
}

const data: IDinner = {
    sideBarIndex: 0,
    scrollTop: 0,
    productList: [],
    popupVisible: false,
    choosePopupVisible: false,
    popupSpu: {},
    chooseSkuObj: {}, // 已选择的 sku对象
    allChooseMoney: 0, // 已选商品的总金额
}

Page({
    offsetTopList: [], // number[]
    data,
    onLoad() {
        this.getListDate() // 获取列表数据
        this.offsetTopListInit()
        this.initChooseSkuObjFromStorage() // 从缓存里初始化：已选择的 sku对象
    },
    clearChooseClick() {
        if (CollUtil.isEmpty(Object.keys(this.data.chooseSkuObj))) {
            return
        }
        Dialog.confirm({
            title: '提示',
            message: '确定清空已选商品吗？',
        }).then(() => {
            this.doSetChooseSkuObj({})
        }).catch(() => {
        })
    },
    showChooseClick() {
        this.setData({
            choosePopupVisible: true
        });
    },
    // 从缓存里初始化：已选择的 sku对象，目的：比如用户再次打开页面，也会选中之前选中的商品
    initChooseSkuObjFromStorage() {
        this.doSetChooseSkuObj(wx.getStorageSync(LocalStorageKey.DINNER_CHOOSE_SKU_OBJ) || {});
    },
    // 执行：设置 chooseSkuObj
    doSetChooseSkuObj(newChooseSkuObj: Record<string, TakeawaySkuDO>, setDataChooseSkuObjFlag = true) {
        if (setDataChooseSkuObjFlag) {
            this.setData({
                chooseSkuObj: newChooseSkuObj
            }, () => {
                this.setAllChooseMoney() // 设置：已选商品的总金额
            })
        } else {
            this.setAllChooseMoney() // 设置：已选商品的总金额
        }
        wx.setStorageSync(LocalStorageKey.DINNER_CHOOSE_SKU_OBJ, newChooseSkuObj)
    },
    // 选择的数量，发生改变时
    chooseNumberChange(e: { currentTarget: { dataset: { sku: TakeawaySkuDO }; }; detail: { value: number }; }) {
        const sku = e.currentTarget.dataset.sku
        sku.chooseNumber = e.detail.value
        this.setData({
            ['chooseSkuObj.' + sku.id]: sku
        }, () => {
            this.doSetChooseSkuObj(this.data.chooseSkuObj, false) // 执行：设置方法
        })
    },
    // 设置：已选商品的总金额
    setAllChooseMoney() {
        let allChooseMoney = 0
        for (const key of Object.keys(this.data.chooseSkuObj)) {
            const sku = this.data.chooseSkuObj[key];
            if (sku && sku.chooseNumber && sku.price) {
                allChooseMoney = allChooseMoney + (sku.chooseNumber * sku.price)
            }
        }
        this.setData({
            allChooseMoney
        })
    },
    onChoosePopupVisibleClose() {
        this.setData({
            choosePopupVisible: false,
        });
    },
    onPopupVisibleClose() {
        this.setData({
            popupVisible: false,
        });
    },
    // 点击：选规格
    chooseSpecClick(e: { currentTarget: { dataset: { spu: TakeawaySpuDO; }; }; }) {
        this.setData({
            popupSpu: e.currentTarget.dataset.spu
        })
        this.setData({
            popupVisible: true,
        });
    },
    // 获取列表数据
    getListDate() {
        this.doSetProductList(wx.getStorageSync(LocalStorageKey.DINNER_SPU_USER_PRODUCT) || [])
        TakeawaySpuUserProduct({scene: 1}).then(res => {
            this.doSetProductList(res.data)
        })
    },
    // 执行：设置 productList
    doSetProductList(newProductList: TakeawayCategoryDO[]) {
        this.execDoSetProductList(newProductList);
    },
    // 执行：设置 productList
    execDoSetProductList(newProductList: TakeawayCategoryDO[]) {
        this.setData({
            productList: newProductList
        }, () => {
            this.offsetTopListInit()
            wx.setStorageSync(LocalStorageKey.DINNER_SPU_USER_PRODUCT, newProductList)
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
});
