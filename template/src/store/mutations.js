const mutations = {
    showBottomMenu(state, status) {
        state.showBottomMenu = status
    },

    showLoading(state, status) {
        state.globalLoading = status
    },
}

export default mutations