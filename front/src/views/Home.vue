<template>
  <div class="home">
    <div class="Modal" v-show="isModalVisible">
      <div class="rightClick" @click="moveOnRight"></div>
      <div class="leftClick" @click="moveOnLeft"></div>
      <div class="formWrapper" ref="cube">
        <autorization class="auth left side" @click="switchRegistration" />
        <registration class="reg front side" />
        <div class="top side"></div>
        <div class="bottom side"></div>
        <div class="back side" ></div>
        <div class="right side"></div>
      </div>
    </div>
    <navigation @switchAuctions="switchAuctions" />
    <aboutUs id="aboutUs" v-show="true" />
    <auctions id="auctions" class="auctions" />
  </div>
</template>

<script>
import registration from '../components/registration'
import autorization from '../components/autorization'
import navigation from '../components/navigation'
import aboutUs from '../components/aboutUs'
import auctions from '../components/Auctions'
import anime from 'animejs'
export default {
  name: 'Home',
  components: {
    registration,
    autorization,
    navigation,
    aboutUs,
    auctions
  },
  data: () => ({
    isModalVisible: false,
    rotate: 45,
    currentPage: 'aboutUs'
  }),
  methods: {
    switchRegistration () {
      this.$refs.cube.style.transform = 'rotateY(0deg)'
    },
    switchAutorization () {
      this.$refs.cube.style.transform = 'rotateY(180deg)'
    },
    moveOnRight () {
      this.$refs.cube.style.transform = `rotateY(${this.rotate = this.rotate + -45}deg)`
    },
    moveOnLeft () {
      this.$refs.cube.style.transform = `rotateY(${this.rotate = this.rotate + 45}deg)`
    },
    switchAuctions () {
      const anim = anime({
        targets: `#${this.currentPage}`,
        duration: 3000,
        easing: 'linear',
        keyframes: [
          {
            duration: 1000,
            scale: 0.3,
            easing: 'linear',
            translateY: '-250vh'
          },
          {
            duration: 1,
            scale: 1,
            translateX: '100%'
          },
          {
            duration: 1,
            translateY: '100%'
          },
          {
            duration: 1,
            translateX: 0
          }
        ]
      })
      console.log(anim)
    }
  }
}
</script>

<style lang="sass" scoped>
  .home
    min-height: 100vh !important
    background-color: #000
    #auctions
      transform: translateY(100%)
    .rightClick
      width: calc( 100vw / 2 - 400px / 2 )
      height: 100%
      position: fixed
      right: 0
      top: 0
    .leftClick
      width: calc( 100vw / 2 - 400px / 2 )
      height: 100%
      position: fixed
      left: 0
      top: 0
    .Modal
      min-height: 100vh
      width: 100vw
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      position: fixed
      perspective: 500px
    .formWrapper
      width: 400px
      height: 400px
      transform-style: preserve-3d
      transition: 1s
      transform: rotateY(45deg)
      .side
        position: absolute
        width: 100%
        height: 100%
        border: 1px solid #fff
        font-size: 4rem
        text-align: center
        color: white
      .front
        transform: translateZ(250px)
      .back
        transform: rotateY(180deg) translateZ(250px)
      .right
        transform: rotateY(90deg) translateZ(250px)
      .left
        transform: rotateY(-90deg) translateZ(250px)
      .top
        transform: rotateX(90deg) translateZ(250px)
      .bottom
        transform: rotateX(-90deg) translateZ(250px)
  @keyframes change
    50%
      transition: 1s
      transform: translateY(-100%) scale(0.3)
    100%
      transition: none
      transform: translateY(100%) scale(1)
</style>
