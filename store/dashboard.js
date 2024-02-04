export const state = () => ({
    totalPerItem: {},
    isLoading: false
});

const getters = {
    totalPerItem(state) {
        return state.totalPerItem
    },
    isLoading(state) {
        return state.isLoading
    }
}

const mutations = {
    setTotalPerItem(state, val) {
        state.totalPerItem = val
    },
    setLoading(state, val) {
        state.isLoading = val
    }
};

const actions = {
    async fetchTotalItem({ commit }, filter) {

        commit('setLoading', true)
        await this.$axios.get('/api/dashboard/total-item', {
            params: filter
        }).then(res => {
            commit('setTotalPerItem', res.data.data)
            commit('setLoading', false)

        }).catch(error => {
            commit('setLoading', false)
            console.log(error)
        })

    },
    async fetchTopLoginAtivity({ commit }, filter) {

        commit('setLoading', true)
        try {
            commit('setLoading', true)
            const data = await this.$axios.get('/api/dashboard/top-login-activity', {
                params: filter
            })
            commit('setLoading', false)
            return data
        } catch (error) {
            commit('setLoading', false)
            console.log(error)
        }

    },
    async fetchAtivity({ commit }, filter) {

        commit('setLoading', true)
        try {
            commit('setLoading', true)
            const data = await this.$axios.get('/api/dashboard/user-activity', {
                params: filter
            })
            commit('setLoading', false)
            return data
        } catch (error) {
            commit('setLoading', false)
            console.log(error)
        }

    }
}

export { getters, mutations, actions }