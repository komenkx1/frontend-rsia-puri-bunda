export const state = () => ({
    unit: [],
    isLoading: false
});

const getters = {
    unit(state) {
        return state.unit
    },
    isLoading(state) {
        return state.isLoading
    }
}

const mutations = {
    setunit(state, val) {
        state.unit = val
    },
    setLoading(state, val) {
        state.isLoading = val
    }
};

const actions = {
    async fetch({ commit }, filter) {
        try {
            commit('setLoading', true)
            const data = await this.$axios.get('/api/unit', {
                params: filter
            })
            commit('setLoading', false)
            return data
        } catch (error) {
            commit('setLoading', false)
            console.log(error)
        }
    },
    async add({ commit }, data) {
        return await this.$axios.post('/api/unit', data.data)
    },
    async update({ commit }, data) {
        return await this.$axios.post('/api/unit/' + data.id, data.data)
    },
    async delete({ commit }, data) {
        return await this.$axios.delete('/api/unit/' + data)
    },
}

export { getters, mutations, actions }