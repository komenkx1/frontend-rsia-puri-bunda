export const state = () => ({
    menu: [
        {
            title: "Dashboard",
            isActive: true,
            link: "/",
            icon: "HeroiconsChartPie"

        },
        {
            title: "Pegawai",
            isActive: false,
            link: "/pegawai",
            icon: "HeroiconsUserIcon"
        },
        {
            title: "Unit",
            isActive: false,
            link: "/unit",
            icon: "HeroiconsInformationCircle"

        },
        {
            title: "Jabatan",
            isActive: false,
            link: "/jabatan",
            icon: "HeroiconsFolderDownload"

        }
    ],
});

const getters = {
    menu(state) {
        return state.menu
    }
}

const mutations = {
    setActive(state, value) {
        state.menu.forEach(element => {
            element.isActive = false
            if (element.link == value) {
                element.isActive = true
            }
        });
    }
};

export { getters, mutations }