<template>
  <div class="wrapper">
    <div class="background3D">
      <auctionTile class="Tile" />
    </div>
  </div>
</template>

<script>
import auctionTile from '@/components/auctionTile.vue'

export default {
  name: 'Auctions',
  components: {
    auctionTile
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
      overflow-y: auto
      padding: 2%
      text-align: justify
      &::-webkit-scrollbar
        width: 0rem
</style>
