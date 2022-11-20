import $http from "../../util/HttpUtil";

export interface SignInCodeDTO {
    code: string // 微信 code
}

// 微信 code登录
export function SignWxSignInCode(form: SignInCodeDTO) {
    return $http<string>('/sign/wx/sign/in/code', form)
}

export interface SignInPhoneCodeDTO {
    phoneCode: string // 手机号码 code
}

// 手机号 code登录
export function SignWxSignInPhoneCode(form: SignInPhoneCodeDTO) {
    return $http<string>('/sign/wx/sign/in/phoneCode', form)
}
