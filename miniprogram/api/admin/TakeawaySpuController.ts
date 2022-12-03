import $http from "../../util/HttpUtil";

export interface TakeawaySpuDO {
    name?: string // SPU名称
    scene?: 1 | 2 // 场景：1 堂食 2 外卖
    mustFlag?: boolean // 是否必选，即：不选无法下单
    orderNo?: number // 排序号（值越大越前面，默认为 0）
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
