export const state = () => ({
    menu: [
        {
            title: "Dashboard",
            link: "/"
        },
        {
            title: "Pegawai",
            link: "/pegawai"
        }
    ],
});

const getters = {
    menu(state) {
        return state.menu
    }
}

const mutations = {

};

export { getters, mutations }