import $http from "@/util/HttpUtil";

// 当前用户-退出登录
export function SignOutSelf() {
    return $http<string>('/sign/out/self')
}
