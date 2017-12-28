import { Toast } from 'mint-ui';
const commonFn = {

    j2s(obj) {
        return JSON.stringify(obj)
    },
    closeGlobalLoading() {
        setTimeout(() => {
            store.dispatch('showLoading', false)
        }, 0)
    },
    openGlobalLoading() {
        setTimeout(() => {
            store.dispatch('showLoading', true)
        }, 0)
    },
    cloneJson(obj) {
        return JSON.parse(JSON.stringify(obj))
    },

    //提示框，后期根据不同类型显示不同图标或样式
    toastMsg(type, msg) {
        switch (type) {
            case 'normal':
                Toast(msg)
                break
            case 'success':
                Toast(msg)
                break
            case 'warning':
                Toast(msg)
                break
            case 'error':
                Toast(msg)
                break
        }
    },
    clearVuex(cate) {
        store.dispatch(cate, [])
    },

    /**
     * 加密请求参数
     * @param data
     */
    sign(data) {
        return Date.parse(new Date()) / 1000
    },



    /**
     * 是否微信环境
     */
    isWeiXin() {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
}

export default commonFn
