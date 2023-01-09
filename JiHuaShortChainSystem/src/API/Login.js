import request from '@/API/request'
import DecryptUserData from '@/API/DecryptUserData'
const LoginMenu = function (data) {
  return request.post('/user/login', { data: DecryptUserData(data) })
}
// 新增用户
const UpnewUser = function (userdata) {
  return request.post('/user/reguser', { data: DecryptUserData(userdata) })
}

export default {
  LoginMenu,
  UpnewUser
}
