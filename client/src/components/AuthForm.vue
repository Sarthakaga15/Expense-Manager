<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-if="!isLogin"
      v-model="name"
      :rules="[v => !!v || 'Name should not be empty']"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="userName"
      :rules="[v => !!v || 'Username should not be empty']"
      label="UserName"
      required
    ></v-text-field>
    
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      :rules="[v => !!v || 'Password should not be empty']"
      required
    ></v-text-field>
    <v-row>
        <v-btn
        :disabled="!valid"
        style="margin: 10px auto;"
        color="success"
        @click="submit"
      >
        {{ isLogin? 'Login' : 'Signup' }}
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import api from '@/apis'
export default {
  name: 'AuthForm',
  props:{
    isLogin: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      valid: false,
      name: '',
      userName: '',
      password: ''
    }
  },
  methods: {
    async submit(){
      let isValid =  this.$refs.form.validate()
      if(!isValid)
        alert('not valid')
      let res = ''
      try{
        if(this.isLogin){
          res = await api.login({userName: this.userName, password: this.password})
          localStorage.setItem('token', res.token)
          this.$router.push('/dashboard')
        }else{
          res = await api.signup({ name: this.name, userName: this.userName, password: this.password})
          alert('User successfully registered')
          this.$router.push('/login')
        }
      }catch(err){
        console.log(err)
        alert(err.message)
      }
      console.log("response", res)
    }
  }
}
</script>
