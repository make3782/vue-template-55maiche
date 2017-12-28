// 公共的filter方法
import Vue from 'vue'
export default (function () {
    Vue.filter('cdn_img', function (value) {
        return CDN_URL + value
    })

    Vue.filter('time-format', function (value) {
        let day = moment(value)
        let date = moment(day).format('YYYY/MM/DD')
        return date
    })

    // 数字转未字符串
    Vue.filter('number2string', function (value) {
        return value + ""
    })

})()