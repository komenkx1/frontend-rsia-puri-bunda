<template>
    <div class="w-full flex flex-col items-center justify-center h-screen">
        <h5 class="text-center font-bold text-blue-600 mb-4">Login To System</h5>
        <div class="w-[300px] rounded overflow-hidden shadow-lg">
            <form @submit.prevent="login" class="p-4">
                <div class="input my-1">
                    <CInput type="text" label="Username" :value.sync="username" placeholder="Username" :required="true" />
                    <small class="font-bold text-red-600 trasition-all" v-for="errorState in error?.username">
                        {{ errorState }}
                    </small>
                </div>
                <div class="input my-1">
                    <CInput type="password" label="Password" :value.sync="password" placeholder="Password"
                        :required="true" />
                    <small class="font-bold text-red-600 trasition-all" v-for="errorState in error?.password">
                        {{ errorState }}
                    </small>
                </div>
                <small v-if="!error?.password && !error?.username && error?.length > 0 " class="font-bold text-red-600 trasition-all">
                    {{ error }}
                </small>
                <button type="submit"
                    class="my-4 bg-blue-600 w-full shadow flex justify-center rounded-md p-2 text-sm text-white font-bold transition-all hover:bg-black">
                    <span v-if="!isLoading">Submit</span>
                    <SpinnerIcon v-else :variant="'text-white'" />

                </button>
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
            error: [],
            isLoading: false,
        };
    },
    methods: {
        async login() {
            try {
                this.isLoading = true
                await this.$auth.loginWith('laravelSanctum', {
                    data: {
                        username: this.username,
                        password: this.password,
                    },
                });
                this.isLoading = false
                window.location.href = '/';
            } catch (error) {
                this.isLoading = false
                console.error('Login failed:', error);
                this.error = error?.response.data.errors ?? error?.response.data.message
                return 'Login failed. Please check your credentials.';
            }
        },
    },

    components: { CInput }
}
</script>