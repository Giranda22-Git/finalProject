<template>
  <div class="home">
    <div class="Modal" v-show="isModalVisible">
      <div class="rightClick" @click="moveOnRight"></div>
      <div class="leftClick" @click="moveOnLeft"></div>
      <div class="formWrapper" ref="cube">
        <autorization @close="close" class="auth left side" />
        <registration @close="close" class="reg front side" />
        <div class="top side"></div>
        <div class="bottom side"></div>
        <div class="back side" ></div>
        <div class="right side"></div>
      </div>
    </div>
    <navigation v-show="!isModalVisible" @switchPage="switchPage" />
    <aboutUs v-show="!isModalVisible" id="aboutUs" class="aboutUs" ref="aboutUs" />
    <auctions v-show="!isModalVisible" id="auctions" class="auctions" ref="auctions" />
    <contacts v-show="!isModalVisible" id="contacts" class="contacts" ref="contacts"/>
    <personalArea v-show="!isModalVisible" :userData="userData" id="personalArea" class="personalArea" ref="personalArea" />
  </div>
</template>

<script>
import registration from '../components/registration'
import autorization from '../components/autorization'
import navigation from '../components/navigation'
import aboutUs from '../components/aboutUs'
import auctions from '../components/Auctions'
import contacts from '../components/contacts'
import personalArea from '../components/personalArea'
import anime from 'animejs'
export default {
  name: 'Home',
  components: {
    registration,
    autorization,
    navigation,
    aboutUs,
    auctions,
    personalArea,
    contacts
  },
  data: () => ({
    isModalVisible: true,
    rotate: 45,
    currentPage: 'aboutUs',
    inAnimation: false,
    userData: null,
    aboutUsPos: {
      x: '0%',
      y: '0%'
    },
    contactsPos: {
      x: '0%',
      y: '100%'
    },
    personalAreaPos: {
      x: '0%',
      y: '100%'
    },
    auctionsPos: {
      x: '0%',
      y: '100%'
    }
  }),
  mounted () {
    this.$refs.aboutUs.$el.style.transform = `translateX(${this.aboutUsPos.x}) translateY(${this.aboutUsPos.y})`
    this.$refs.auctions.$el.style.transform = `translateX(${this.auctionsPos.x}) translateY(${this.auctionsPos.y})`
    this.$refs.contacts.$el.style.transform = `translateX(${this.contactsPos.x}) translateY(${this.contactsPos.y})`
    this.$refs.personalArea.$el.style.transform = `translateX(${this.personalAreaPos.x}) translateY(${this.personalAreaPos.y})`
  },
  methods: {
    close () {
      this.isModalVisible = false
    },
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
    switchPage (nextPage) {
      if (this.currentPage !== nextPage && !this.inAnimation) {
        const slideToTop = '-250vh'
        anime({
          targets: `#${this.currentPage}`,
          easing: 'linear',
          keyframes: [
            {
              duration: 1000,
              scale: 0.3,
              easing: 'linear',
              translateY: [this[`${this.currentPage}Pos`].y, slideToTop]
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
        // switch first element Position
        this[`${this.currentPage}Pos`].y = '100%'

        // switch currentPage element
        this.currentPage = nextPage

        anime({
          targets: `#${this.currentPage}`,
          duration: 500,
          easing: 'linear',
          translateY: [this[`${this.currentPage}Pos`].y, '0%']
        })
        // switch second element Position
        this[`${this.currentPage}Pos`].y = '0%'

        // userData for new page
        this.userData = JSON.parse(localStorage.getItem('userData'))

        // disable next animation if current animation no finished
        this.inAnimation = true
        setTimeout(this.onTimeOut, 1200)
      }
    },
    onTimeOut () {
      this.inAnimation = false
    }
  }
}
</script>

<style lang="sass" scoped>
  .home
    min-height: 100vh !important
    background-color: #000
    #aboutUs, #auctions, #contacts, #personalArea
      position: absolute
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
</style>
