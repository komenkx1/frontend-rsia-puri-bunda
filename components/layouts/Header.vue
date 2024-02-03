<template>
    <div class="shadow p-3">
        

        <div class="flex justify-between">
            Manajemen Pegawai
            <a href="#" @click="logout">Logout</a>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
    async loadData(){
      
    },
    async logout() {
      await this.$auth.logout()

      window.location.href = '/login';

    },
  }
}
</script>