import request from '@/API/request'
// 查询今日转地
const Inquire = function (username) {
  return request.get('/data/Inquire?username=' + username)
}
// 缩短链接
const toShort = function (data) {
  const params = new URLSearchParams()
  params.append('username', data.username)
  params.append('link', data.link)
  return request.post('/data/toShort', params)
}
// 限时缩短
const toShorts = function (data) {
  return request.post('/data/toShorts', data)
}
// 加密缩短
const toShortp = function (data) {
  return request.post('/data/toShortp', data)
}
export default {
  toShort,
  Inquire,
  toShorts,
  toShortp
}
