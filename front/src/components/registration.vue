<template>
  <div class="wrapper">
    <input type="text" v-model="login" class="login">
    <input type="password" v-model="password" class="password">
    <input type="password" v-model="checkPassword" class="checkPassword" @keypress.enter="sendUserData">
    <button @click="sendUserData" @keypress.enter="sendUserData">Send</button>
  </div>
</template>

<script>
import axios from 'axios'
import sweetalert2 from 'sweetalert2'

export default {
  name: 'registration',
  data: () => ({
    login: null,
    password: null,
    checkPassword: null
  }),
  methods: {
    async sendUserData () {
      if (this.password === this.checkPassword) {
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
      } else {
        sweetalert2.fire({
          title: 'Error',
          text: 'Пароли не совпадают',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
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
    display: flex
    flex-direction: column
    justify-content: space-evenly
    align-items: center
    & *
      width: 50%
      height: 8%
      font-size: 2rem
      text-align: center
</style>
