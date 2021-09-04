<template>
  <v-app class="app">
    <v-content class="fill-height" fluid>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      name: 'Kushal'
    }
  }
}
</script>
<style scoped>
.app {
  height: 100%;
}
</style>
