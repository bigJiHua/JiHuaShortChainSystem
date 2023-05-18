import request from '@/API/request'
import DecryptUserData from '@/API/DecryptUserData'

// 查询今日转地
const Inquire = function () {
  return request.get('/data/Inquire')
}
// 缩短链接
const toShort = function (data) {
  const params = new URLSearchParams()
  params.append('link', data.link)
  return request.post('/data/toShort', params)
}
// 限时缩短
const toShorts = function (data) {
  return request.post('/data/toShorts', data)
}
// 加密缩短
const toShortp = function (data) {
  return request.post('/data/toShortp', {
    data: DecryptUserData(data)
  })
}
// 解密短链
const todecrypt = function (data) {
  return request.post('/jump/dec', {
    data: DecryptUserData(data)
  })
}
export default {
  toShort,
  Inquire,
  toShorts,
  toShortp,
  todecrypt
}
