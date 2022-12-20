import axios from 'axios'
import { app } from '@/main'
import { Notification } from 'element-ui'

const request = axios.create({
  baseURL: 'http://127.0.0.1/'
})

request.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, function (error) {
  Notification.error({
    title: '错误',
    message: error
  })
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(response => {
  if (response.data.status === 200) {
    Notification.success({
      title: '成功',
      message: response.data.message,
      type: 'success'
    })
  } else if (response.data.status === 401) {
    Notification.error({
      title: '错误',
      message: response.data.message
    })
    localStorage.removeItem('token')
    app.$router.push('/')
  } else {
    Notification.info({
      title: 'Tips：',
      message: response.data.message
    })
  }
  return response
}, function (error) {
  Notification.error({
    title: '错误',
    message: error
  })
  return Promise.reject(error)
})

export default request
