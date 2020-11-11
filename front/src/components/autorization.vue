<template>
  <div class="wrapper">
    <input type="text" v-model="login" class="login" placeholder="  Login">
    <input type="password" v-model="password" class="password" @keypress.enter="autorization" placeholder="   Password">
    <button @click="autorization" @keypress.enter="autorization">Send</button>
  </div>
</template>

<script>
import axios from 'axios'
import sweetalert2 from 'sweetalert2'

export default {
  name: 'autorization',
  data: () => ({
    login: null,
    password: null
  }),
  methods: {
    async autorization () {
      const params = {
        user: {
          login: this.login,
          password: this.password
        }
      }
      axios.post('http://localhost:3000/users', params)
        .then(response => {
          console.log('response', response)
        })
        .catch(err => {
          sweetalert2.fire({
            title: 'Error',
            text: 'Пользователь с таким логином уже существует\n err: ' + err,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    }
  }
}
</script>

<style lang="sass" scoped>
  *
    outline: 1px solid red
  .wrapper
    width: 100%
    height: 100vh
    & *
      width: 100%
      height: 8%
      font-size: 2rem
      text-align: center
      margin-top: 10%
</style>
