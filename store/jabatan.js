export const state = () => ({
    jabatan: [],
    isLoading: false
});

const getters = {
    jabatan(state) {
        return state.jabatan
    },
    isLoading(state) {
        return state.isLoading
    }
}

const mutations = {
    setjabatan(state, val) {
        state.jabatan = val
    },
    setLoading(state, val) {
        state.isLoading = val
    }
};

const actions = {
    async fetch({ commit }, filter) {
        try {
            commit('setLoading', true)
            const data = await this.$axios.get('/api/jabatan', {
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
        return await this.$axios.post('/api/jabatan', data.data)
    },
    async update({ commit }, data) {
        return await this.$axios.post('/api/jabatan/' + data.id, data.data)
    },
    async delete({ commit }, data) {
        return await this.$axios.delete('/api/jabatan/' + data)
    },
}

export { getters, mutations, actions }