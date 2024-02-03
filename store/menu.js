export const state = () => ({
    menu: [
        {
            title: "Dashboard",
            link: "/"
        },
        {
            title: "Pegawai",
            link: "/pegawai"
        },
        {
            title: "Unit",
            link: "/unit"
        },
        {
            title: "Jabatan",
            link: "/jabatan"
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