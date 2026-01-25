import Http from '../http'

// 验证码响应
export interface CaptchaResponse {
  key: string
  image: string
}

// 获取验证码
export function getCaptcha() {
  return Http.post<CaptchaResponse>('/captcha')
}
