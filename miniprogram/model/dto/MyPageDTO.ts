import MyOrderDTO from "@/model/dto/MyOrderDTO";

export default interface MyPageDTO {
    current?: number // 第几页
    pageSize?: number // 每页显示条数
    order?: MyOrderDTO // 排序字段
}
