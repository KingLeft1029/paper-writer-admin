import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 找回密码
export function pwdBackSet(type,pwd) {
  return request({
    url: '/out/pwdBackSet?'+`pwdBackType=0&pwdBackNumber=${type}&newPwd=${pwd}`,
    method: 'get',
  })
}

// 密码找回校验
export function pwdBackCheck(type,code) {
  return request({
    url: '/out/pwdBackCheck?'+`pwdBackType=0&pwdBackNumber=${type}&pwdBackCode=${code}`,
    method: 'get',
  })
}

// 密码找回发送验证码
export function pwdBackGetCode(type) {
  return request({
    url: '/out/pwdBackGetCode?'+`pwdBackType=0&pwdBackNumber=${type}`,
    method: 'get',
  })
}
// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}