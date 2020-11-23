<template>
  <header>
    <div class="partitionWrapper">
      <div class="partition3d">
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <div class="menuItem" id="AboutUs" @mouseenter="pushBack('AboutUs')">
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="front">О Нас</div>
        <div class="back"></div>
      </div>
      <div class="partition3d">
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <div class="menuItem" id="Contacts" @mouseenter="pushBack('Contacts')">
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="front">Контакты</div>
        <div class="back"></div>
      </div>
      <div class="partition3d">
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <div class="menuItem" id="PersonArea" @mouseenter="pushBack('PersonArea')">
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="front">Личный кабинет</div>
        <div class="back"></div>
      </div>
      <div class="partition3d">
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <div class="menuItem" @click="switchAuctions" id="Auctions" @mouseenter="pushBack('Auctions')">
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="front">Аукционы</div>
        <div class="back"></div>
      </div>
      <div class="partition3d">
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
    </div>
  </header>
</template>

<script>
const $ = require('jquery')
export default {
  name: 'navigation',
  mounted () {
    $('.topHeader3D .right').css({ transform: `rotateY(90deg) translateZ(${window.innerWidth - ((window.innerWidth / 100) * 5) - 17.5}px)` })
    $('.bottomHeader3D .right').css({ transform: `rotateY(90deg) translateZ(${window.innerWidth - ((window.innerWidth / 100) * 5) - 17.5}px)` })
    $('.partitionWrapper .right').css({ transform: `rotateY(90deg) translateZ(${((window.innerWidth - ((window.innerWidth / 100) * 5)) / 9) - 17.5}px)` })
    this.pushBack('AboutUs')
    this.pushBack('Contacts')
    this.pushBack('PersonArea')
    this.pushBack('Auctions')
  },
  methods: {
    pushBack (selector) {
      $(`#${selector}`).hover(() => {
        $(`#${selector}`).css({ transform: 'translateZ(20px)' })
      }, () => {
        $(`#${selector}`).css({ transform: 'translateZ(0px)' })
      })
    },
    switchAuctions () {
      this.$emit('switchAuctions')
    }
  }
}
</script>

<style lang="sass" scoped>
  header
    width: 100%
    height: 150px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    perspective: 300px
    transform: rotateX(30deg)
    transform-style: preserve-3d
    .partitionWrapper
      width: 95%
      height: 50px
      display: flex
      justify-content: center
      .menuItem
        transition: 1s
        cursor: pointer
        & *
          border: 1px solid rgba(255, 255, 255, 0.5)
      .partition3d, .menuItem
        width: calc( 100% + .10px / 9 )
        height: 50px
        font-size: 1.3rem
        color: white
        transform-style: preserve-3d
        & div
          position: absolute
          width: 100%
          height: 100%
          color: white
          backface-visibility: hidden
          border: 1px solid rgba(255, 255, 255, 0.5)
          box-shadow: 0 0 25px 4px rgba(60, 40, 150, 0.6)
        .front
          transform: translateZ(17.5px)
          display: flex
          justify-content: center
          align-items: center
        .back
          transform: rotateY(180deg) translateZ(25px)
        .right
          width: 35px
        .left
          transform: rotateY(-90deg) translateZ(17.5px)
          width: 35px
        .top
          transform: rotateX(90deg) translateZ(17.5px)
          height: 35px
        .bottom
          transform: rotateX(-90deg) translateZ(33px)
          height: 35px
    .topHeader3D, .bottomHeader3D
      transform-style: preserve-3d
      width: 95%
      height: 35px
      transition: 1s
      & div
        position: absolute
        width: 100%
        height: 100%
        color: white
        backface-visibility: hidden
      .front
        transform: translateZ(17.5px)
      .back
        transform: rotateY(180deg) translateZ(17.5px)
      .right
        width: 35px
      .left
        transform: rotateY(-90deg) translateZ(17.5px)
        width: 35px
      .top
        transform: rotateX(90deg) translateZ(17.5px)
      .bottom
        transform: rotateX(-90deg) translateZ(17.5px)
</style>
