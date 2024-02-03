<template>
    <div>
        <main v-if="this.$auth.state.loggedIn">
            <Sidebar />
            <div class=" sm:ml-64">
                <Header />
            <div class="p-4">
                <Nuxt class="w-full" />

                <Footer />
                </div>
            </div>
        </main>
        <main v-else>
            <Nuxt class="w-full" />
        </main>
    </div>
</template>

<script>
import Footer from '../components/layouts/Footer.vue';
import Header from '../components/layouts/Header.vue';
import Sidebar from '../components/layouts/Sidebar.vue';

export default {
    components: { Header, Sidebar, Footer },
    mounted() {
        console.log()
    },
}
</script>
  