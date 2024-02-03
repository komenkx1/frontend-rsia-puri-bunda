<template>
  <div class="">
    <a href="#" @click.prevent="logout">Logout</a>
    
    <Tutorial/>

  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted(){
    this.loadData()
  },
  methods:{
    async loadData(){
      
    },
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    },
  }
}
</script>
