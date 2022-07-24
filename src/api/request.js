import axios from 'axios'
import qs from 'qs'
import { Loading, Message } from 'element-ui'
// import store from '@/store'
// import router from '@/router'
let isLoading
function loading(boolean) {
    if (boolean) {
        isLoading = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading'
        })
    } else {
        if (isLoading) {
            isLoading.close()
        }
    }
}

const message = config => {
    if (document.getElementsByClassName('el-message').length !== 0) {
        Message.closeAll()
    }
    Message(config)
}

const NODE_ENV = '//23.13.5.135:8090' // dev
const FILE_UP = NODE_ENV + '/file/uploadFile' // 附件上传
const STATICENV = NODE_ENV + '/file/static' //

const request = function(config) {
    const instance = axios.create({
        baseURL: config.url.startsWith('http') ? config.url : NODE_ENV, // dev
        timeout: 7000
    })

    instance.interceptors.request.use(
        config => {
            const method = config.method.toLowerCase()
            if (method === 'post' || method === 'put' || method === 'delete') {
                if (config.json === true) {
                    config.headers['Content-Type'] = 'application/json'
                    config.data = JSON.stringify(config.data || config.params)
                } else {
                    if (!config.uploadFile) {
                        config.data = qs.stringify(config.data)
                    }
                }
            } else {
                if (config.json === true) {
                    config.headers['Content-Type'] = 'application/json'
                    config.data = JSON.stringify(config.data || config.params)
                }
            }
            const token = localStorage.getItem('token')
            token && (config.headers.token = token)

            if (config.downLoadfile) {
                config.responseType = 'blob'
            }

            if (!config.loading) {
            } else {
                // console.log('----config---', config.loading, config.url)
                if (!config.hasLoading) {
                    loading(true)
                }
            }
            // console.log(config)
            return config
        },
        error => {
            loading(false)
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        response => {
            // console.log(response, response.headers['content-disposition'])
            // 后台添加 Access-Control-Expose-Headers : 'Content-Disposition'，才能在response.headers里面拿到额外的值
            loading(false)

            console.log('axios success====', response)
            if (response.request.responseType === 'blob') {
                if (response.config.responseOrigin) {
                    return response
                } else {
                    return response.data
                }
            }
            if (response.config.origin === 'amap') {
                if (response.config.responseOrigin) {
                    return response
                } else {
                    return response.data
                }
            }
            if (
                response.data.code !== '200' &&
        !response.config.baseURL.startsWith('https://restapi.amap.com')
            ) {
                message({
                    type: 'error',
                    message:
            response.data.msg || response.data.message || '后台状态码code错误！'
                })
                throw new Error(
                    response.data.msg || response.data.message || '后台状态码code错误！'
                )
            }
            if (response.config.responseOrigin) {
                return response
            } else {
                return response.data
            }
        },
        error => {
            console.log('axios error====', error)
            loading(false)
            if (error.response) {
                const { status } = error.response
                switch (status) {
                    case 403:
                        message({ type: 'error', message: '登录过期！' })

                        setTimeout(() => {
                            localStorage.clear()
                            sessionStorage.clear()
                        }, 300)
                        break

                    default:
                        message({ type: 'error', message: '请求后台错误！' })
                }
            } else {
                message({ type: 'error', message: '网络连接错误！' })
            }
            console.log(error)
            return Promise.reject(error)
        }
    )

    return instance(config)
}

export default request
export { NODE_ENV as env, STATICENV, FILE_UP }
