const actions = {
    showBottonMenu({ commit }, status) {
        commit('showBottomMenu', status)
    },

    showLoading({ commit }, status) {
        if (status === true) {

        } else {

        }
        commit('showLoading', status)
    },



}

export default actions