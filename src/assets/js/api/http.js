'use strict'
import axios from 'axios'
import { Indicator } from 'mint-ui'

// 配置全局axios属性
axios.defaults.baseURL = HOST
axios.defaults.timeout = 1000 * 15      // 15s请求超时时间
axios.defaults.headers['authKey'] = Lockr.get('auth_key')
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.responseType = 'json'

//axios拦截器
axios.interceptors.request.use(
    config => {
        Indicator.open();   //显示loading
        if (config.method == 'post') {
            config.data = {
                ...config.data,
                //sign: _g.sign(config.data),
            }
        } else if (config.method == 'get') {
            config.params = {
                ...config.params,
                //sign: _g.sign(config.params),
            }
        }
        return config
    }, function (error) {
        Indicator.close();
        _g.toastMsg('error', '错误的传参')
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    response => {
        Indicator.close()
        return checkCode(response.data)
    }, error => {
        Indicator.close();   //显示loading
        _g.toastMsg('error', '请求超时，请检查网络')
        return Promise.reject(error)
    }
)

/**
 * 检查api后端返回的json中的code: 公用的错误返回码，直接在这里处理
 * @param {*res} res:ajax返回的json值
 */
function checkCode(res) {
    //返回数据的格式判断 + 解密操作
    //todo
    if (!res.code) {
        _g.toastMsg('error', '12')
        return Promise.reject("123")
    }

    // 公共错误码处理
    if (res.code == -999) {
        Lockr.rm("auth_key")
        Lockr.set("redirect", router.currentRoute.fullPath)
        router.push({ path: '/login_in' })
        console.log("请登录")
        return Promise.reject("用户信 息已过期，请重新登录")
        // return
    } else if (res.code == -1) {
        _g.toastMsg('error', '请填写用户名')
        return Promise.reject("请填写用户名")
    }
    return Promise.resolve(res)
}

/**
 * 对外提供的方法：apiGet/apiPost/apiDelete/apiPut
 */
const apiMethods = {
    apiGet(url, data) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params: data }).then(
                response => {
                    resolve(response)
                }, error => {
                    //reject(error)
                }
            )
        })
    },

    apiPost(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then(
                response => {
                    resolve(response)
                }, error => {
                    //reject(error)
                }
            )
        })
    },
}

export default apiMethods
