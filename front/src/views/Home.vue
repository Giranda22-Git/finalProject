<template>
  <div class="home">
    <div class="formWrapper" v-show="isModalVisible">
      <div class="toggleLabel" ref="toggleLabel">
        <button class="switchRegistration" @click="switchRegistration" >Registration</button>
        <button class="switchAutorization" @click="switchAutorization" >Autorization</button>
      </div>
      <autorization class="auth" ref="auth" />
      <registration class="reg" ref="reg" />
    </div>
  </div>
</template>

<script>

import registration from '../components/registration'
import autorization from '../components/autorization'

export default {
  name: 'Home',
  components: {
    registration,
    autorization
  },
  data: () => ({
    isRegisterToggle: true,
    isModalVisible: true
  }),
  methods: {
    switchRegistration () {
      this.isRegisterToggle = true
      this.translateToggleLine(true)
      this.$refs.reg.style.transform = 'translateX(-100vw) translateZ(-100vw) rotateX(-100deg)'
    },
    switchAutorization () {
      this.isRegisterToggle = false
      this.translateToggleLine(false)
      this.$refs.auth.style.transform = 'translateX(0) translateZ(0) rotateX(0)'
    },
    translateToggleLine (toggle) {
      if (toggle) this.$refs.toggleLabel.classList.remove('translateToggleLine')
      else this.$refs.toggleLabel.classList.add('translateToggleLine')
      console.log(this.$refs.toggleLabel)
    }
  }
}
</script>

<style lang="sass" scoped>
  .translateToggleLine
    &:before
      transform: translateX(100%)
  .home
    min-height: 100vh !important
    display: flex
    justify-content: center
    align-items: center
    .formWrapper
      width: 50%
      height: 100%
      transform-style: preserve-3d
      perspective: 1000px
      position: relative
      .reg
        transform: translateX(0) translateZ(0) rotateX(0)
        transition: 2s
        position: absolute
      .auth
        transform: translateX(100vw) translateZ(100vw) rotateX(100deg)
        transition: 2s
        position: absolute
      .toggleLabel
        position: absolute
        width: 100%
        height: 15%
        display: flex
        justify-content: center
        align-items: center
        position: relative
        &:before
          content: ''
          position: absolute
          bottom: 0
          left: 0
          width: 50%
          height: 1px
          outline: 1px solid silver
          transition: .5s
        & button
          width: 50%
          height: 50%
          text-align: center
          font-size: 2.5rem
          background-color: transparent
          outline: none
          border: none
          cursor: pointer
          color: black !important
          transition: color .25s
          &:hover
            color: darken(lightblue, 50%) !important
</style>
