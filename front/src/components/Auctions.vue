<template>
  <div class="wrapper">
    <div class="background3D">
      <auctionTile ref="Tile" class="Tile" @click="modalTile" />
      <auctionTile ref="Tile" class="Tile" />
      <auctionTile ref="Tile" class="Tile" />
      <auctionTile ref="Tile" class="Tile" />
      <auctionTile ref="Tile" class="Tile" />
      <auctionTile ref="Tile" class="Tile" />
    </div>
  </div>
</template>

<script>
import auctionTile from '@/components/auctionTile.vue'

export default {
  name: 'Auctions',
  components: {
    auctionTile
  },
  methods: {
    modalTile () {
    }
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
    height: calc( 100vh - 150px )
    perspective: 500px
    transform-style: preserve-3d
    color: white
    font-size: 3.5rem
    .background3D
      width: 64%
      height: 100%
      margin: 0 auto
      border: 1px solid rgba(255, 255, 255, 0.2)
      box-shadow: 0 0 500px 15px rgba(60, 40, 150, 0.6)
      transform: rotateX(20deg) translateY(-10.5%)
      padding: 2%
      text-align: justify
      transform-style: preserve-3d
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      align-items: center
      &::-webkit-scrollbar
        width: 0rem
      .Tile
        width: 32%
        height: 50%
        transition: 1s
        cursor: pointer
        position: relative
        border-radius: 3px
        z-index: 2 !important
        margin-bottom: 1%
        &::after
          opacity: 0
          transition: opacity 1s
          position: absolute
          content: ""
          z-index: -1
          top: calc(-1 * 3px)
          left: calc(-1 * 3px)
          z-index: -1
          width: calc(100% + 3px * 2)
          height: calc(100% + 3px * 2)
          background: linear-gradient( 60deg, hsl(224, 85%, 66%), hsl(269, 85%, 66%), hsl(314, 85%, 66%), hsl(359, 85%, 66%), hsl(44, 85%, 66%), hsl(89, 85%, 66%), hsl(134, 85%, 66%), hsl(179, 85%, 66%))
          background-size: 300% 300%
          background-position: 0 50%
          border-radius: calc(2 * 3px)
        &:hover::after
          opacity: 1
          animation: moveGradient 4s alternate infinite
        &:hover
          transform: translateZ(60px)
          z-index: -1
  @keyframes moveGradient
    50%
      background-position: 100% 50%
</style>
