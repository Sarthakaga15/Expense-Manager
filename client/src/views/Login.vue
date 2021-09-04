<template>
  <div>
    <navbar />
    <v-card 
      elevation="2"
      outlined
      style="width: 40%; margin:30px auto; padding: 20px 20px;">
      <auth-form :isLogin="true"/>
      <p>New User? <router-link to="/signup">Signup</router-link></p>
    </v-card>
  </div>
</template>
<script>
import AuthForm from '@/components/AuthForm.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Login',
  components: {
    AuthForm,
    Navbar
  }
}
</script>
