import request from '@/API/request'
const LoginMenu = function (data) {
  return request.post('/user/login', data)
}

// 新增用户
const UpnewUser = function (userdata) {
  const params = new URLSearchParams()
  params.append('username', userdata.username)
  params.append('password', userdata.password)
  params.append('email', userdata.email)
  return request.post('/user/reguser', params)
}

export default {
  LoginMenu,
  UpnewUser
}
