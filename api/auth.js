import request from '../utils/request'

export const fetchCaptcha = () => {
  return request.post('/v1/captchas')
}

export const fetchAccountLogin = (username, password, captcha_code) => {
  let formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  formData.append('captcha_code', captcha_code)

  return request.post('/v2/login', formData, true)
}

export const fetchUpdatePwd = (
  username,
  oldpassWord,
  newpassword,
  confirmpassword,
  captcha_code
) => {
  return request.post(
    'username, oldpassWord, newpassword, confirmpassword, captcha_code',
    {
      username,
      oldpassWord,
      newpassword,
      confirmpassword,
      captcha_code
    }
  )
}
