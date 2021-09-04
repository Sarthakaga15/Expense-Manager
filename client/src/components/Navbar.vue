<template>
  <nav>
    <v-app-bar app dense>   
      <v-app-bar-nav-icon v-if="isLoggedIn" @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Expenses Manager</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary hide-overlay>
      <v-list>
        <menu-item :title="`Welcome ${name}`"/>
      </v-list>

      <v-divider></v-divider>
      <v-list>
        <menu-item title="Dashboard" icon="mdi-folder" to="/dashboard"/>
        <menu-item title="Expenses" icon="mdi-account-multiple" to="/expense"/>
        <menu-item title="Report" icon="mdi-star" to="/report"/>
        <menu-item title="Logout" icon="mdi-account-arrow-right" to="/logout" />
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import MenuItem from '@/components/MenuItem'
export default {
  name: 'Navbar',
  components: {
    MenuItem
  },
  props: {
    name: {
      type: String,
      default: 'User'
    }
  },
  data(){
    return {
      drawer: false
    }
  },
  computed: {
    isLoggedIn(){
      return localStorage.getItem('token') !== null
    }
  }
}
</script>
