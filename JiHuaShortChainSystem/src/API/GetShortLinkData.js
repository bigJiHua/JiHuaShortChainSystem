import request from '@/API/request'
import DecryptUserData from '@/API/DecryptUserData'
// 获取用户所有短链
const getMyChainData = function (end) {
  return request.get('/data/UserChains?end=' + end)
}
// 删除或者恢复链接
const deleteChainData = function (data) {
  return request.get('/data/deleteChain?&id=' + data.id + '&short=' + data.short)
}
// 修改有效期 恢复限时短链 删除限时短链 修改加密密码
const ChangeRestoreLinnk = function (data) {
  const params = new URLSearchParams()
  params.append('id', data.id)
  params.append('endtime', 'changePwd')
  if (data.data) {
    params.append('data', DecryptUserData(data.data))
  }
  return request.get('/data/CResLink?' + params)
}
// 获取7天内的所有数据
const UserPeriod = function () {
  return request.get('/data/UserPeriod')
}
export default {
  getMyChainData,
  deleteChainData,
  ChangeRestoreLinnk,
  UserPeriod
}