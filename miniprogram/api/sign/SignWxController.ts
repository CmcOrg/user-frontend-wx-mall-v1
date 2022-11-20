import $http from "../../util/HttpUtil";

export interface SignInPhoneCodeDTO {
    phoneCode: string // 手机号码 code
}

// 手机号 code登录
export function SignWxSignInPhoneCode(form: SignInPhoneCodeDTO) {
    return $http<string>('/sign/wx/sign/in/phoneCode', form)
}
