import $http from "../../util/HttpUtil";

export interface TakeawaySpecItemDTO {
    typeName?: string // 规格类型名称
    name?: string // 规格名称
}

export interface TakeawaySkuDO {
    spuId?: number // SPU 主键 id（外键）
    spuSpecJsonListStr?: string // 规格 json对象集合字符串，例如：[{}]
    price?: number // 价格
    minBuyNumber?: number // 最低购买数量
    maxBuyNumber?: number // 最高购买数量
    discountPrice?: number // 优惠价格
    discountNumber?: number // 优惠个数
    packagePrice?: number // 打包价格
    scene?: 1 | 2 // 场景：1 堂食 2 外卖
    prepareS?: number // 备货时长（秒）
    number?: number // 库存
    spuName?: string // spu名称
    spuSpecJsonListStrSet?: string[] // 规格 json对象集合字符串，例如：[{}]，set
    spuSpecJsonSet?: TakeawaySpecItemDTO[] // 规格 json对象集合，例如：[{}]
    specIdSet?: number[] // 关联的规格主键 idSet
    id?: number // 主键id
    createId?: number // 创建人id
    createTime?: string // 创建时间
    updateId?: number // 修改人id
    updateTime?: string // 修改时间
    version?: number // 乐观锁
    enableFlag?: boolean // 是否启用
    delFlag?: boolean // 是否逻辑删除
    remark?: string // 备注
    chooseNumber?: number // 前端用：当前选择的个数
}

export interface TakeawaySpuDO {
    name?: string // SPU名称
    scene?: 1 | 2 // 场景：1 堂食 2 外卖
    mustFlag?: boolean // 是否必选，即：不选无法下单
    orderNo?: number // 排序号（值越大越前面，默认为 0）
    takeawaySkuDOList?: TakeawaySkuDO[] // spu下的 sku集合
    id?: number // 主键id
    createId?: number // 创建人id
    createTime?: string // 创建时间
    updateId?: number // 修改人id
    updateTime?: string // 修改时间
    version?: number // 乐观锁
    enableFlag?: boolean // 是否启用
    delFlag?: boolean // 是否逻辑删除
    remark?: string // 备注
}

export interface TakeawaySpuUserProductDTO {
    scene?: 1 | 2 // 场景：1 堂食 2 外卖
}

export interface TakeawayCategoryDO {
    name?: string // 分类名称
    scene?: 1 | 2 // 场景：1 堂食 2 外卖
    orderNo?: number // 排序号（值越大越前面，默认为 0）
    takeawaySpuDOList?: TakeawaySpuDO[] // 分类关联的 spu集合
    id?: number // 主键id
    createId?: number // 创建人id
    createTime?: string // 创建时间
    updateId?: number // 修改人id
    updateTime?: string // 修改时间
    version?: number // 乐观锁
    enableFlag?: boolean // 是否启用
    delFlag?: boolean // 是否逻辑删除
    remark?: string // 备注
}

// 用户获取商品
export function TakeawaySpuUserProduct(form: TakeawaySpuUserProductDTO) {
    return $http<TakeawayCategoryDO[]>('/takeaway/spu/user/product', form)
}
