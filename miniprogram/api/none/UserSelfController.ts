import $http from "../../util/HttpUtil";

export interface UserSelfInfoVO {
    avatarUri?: string // 头像uri
    nickname?: string // 昵称 {"regexp":"^[\\u4E00-\\u9FA5A-Za-z0-9_-]{2,20}$"}
    bio?: string // 个人简介
    email?: string // 邮箱，会脱敏
    passwordFlag?: boolean // 是否有密码，用于前端显示，修改密码/设置密码
    signInName?: string // 登录名，会脱敏
    phone?: string // 手机号码，会脱敏
    createTime?: string // 账号注册时间
}

// 获取：当前用户，基本信息
export function UserSelfInfo() {
    return $http<UserSelfInfoVO>('/user/self/info')
}

// 当前用户：刷新jwt私钥后缀
export function UserSelfRefreshJwtSecretSuf() {
    return $http<string>('/user/self/refreshJwtSecretSuf')
}

export interface UserSelfUpdateInfoDTO {
    avatarUri?: string // 头像uri
    nickname?: string // 昵称 {"regexp":"^[\\u4E00-\\u9FA5A-Za-z0-9_-]{2,20}$"}
    bio?: string // 个人简介
}

// 当前用户：基本信息：修改
export function UserSelfUpdateInfo(form: UserSelfUpdateInfoDTO) {
    return $http<string>('/user/self/updateInfo', form)
}
