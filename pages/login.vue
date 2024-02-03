<template>
    <div class="w-full flex flex-col items-center justify-center h-screen">
        <h5 class="text-center font-bold text-blue-600 mb-4">Login To System</h5>
        <div class="w-[300px] rounded overflow-hidden shadow-lg">
            <form @submit.prevent="login" class="p-4">
                <div class="input my-1">
                    <CInput type="text" label="Username" :value.sync="username" placeholder="Username" :required="true"/>
                </div>
                <div class="input my-1">
                    <CInput type="password" label="Password" :value.sync="password" placeholder="Password" :required="true"/>
                </div>
                <button type="submit" class="my-4 bg-blue-600 w-full shadow rounded-md p-2 text-sm text-white font-bold transition-all hover:bg-black">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import CInput from '../components/CInput.vue';

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
    async login() {
        try {
            await this.$auth.loginWith('laravelSanctum', {
                data: {
                    username: this.username,
                    password: this.password,
                },
            });
            window.location.href = '/';
        } catch (error) {
            // If there is an error (login failed), handle it here
            console.error('Login failed:', error);
            return 'Login failed. Please check your credentials.';
        }
    },
},

    components: { CInput }
}
</script>