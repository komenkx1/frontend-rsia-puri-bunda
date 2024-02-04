export const state = () => ({
    pegawai: [],
    isLoading: false
});

const getters = {
    pegawai(state) {
        return state.pegawai
    },
    isLoading(state) {
        return state.isLoading
    }
}

const mutations = {
    setpegawai(state, val) {
        state.pegawai = val
    },
    setLoading(state, val) {
        state.isLoading = val
    }
};

const actions = {
    async fetch({ commit }, filter) {
        try {
            commit('setLoading', true)
            const data = await this.$axios.get('/api/pegawai', {
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
        return await this.$axios.post('/api/pegawai', data.data)
    },
    async update({ commit }, data) {
        return await this.$axios.post('/api/pegawai/' + data.id, data.data)
    },
    async delete({ commit }, data) {
        return await this.$axios.delete('/api/pegawai/' + data)
    },
}

export { getters, mutations, actions }