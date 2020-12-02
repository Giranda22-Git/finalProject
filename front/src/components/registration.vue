<template>
  <div class="wrapper">
    <input type="text" v-model="login" class="login" placeholder="Login">
    <input type="password" v-model="password" class="password" placeholder="Password">
    <input type="password" v-model="checkPassword" class="checkPassword" @keypress.enter="sendUserData" placeholder=" repeat Password">
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
            localStorage.setItem('userData', JSON.stringify(response.data))
            sweetalert2.fire({
              title: 'OK',
              text: `Добро пожаловать ${response.data.userData.Login._login}`,
              icon: 'success',
              confirmButtonText: 'OK'
            })
              .then(() => {
                this.$emit('close')
              })
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
  .wrapper
    width: 100%
    height: 100%
    & *
      width: 100%
      height: 8%
      font-size: 2rem
      text-align: center
      margin-top: 10%
</style>
