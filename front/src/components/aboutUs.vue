<template>
  <div class="wrapper">
    <div class="background3D">
О Нас
    </div>
  </div>
</template>

<script>
export default {
  name: 'aboutUs'
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
    height: calc( 100vh - 150px )
    perspective: 500px
    transform-style: preserve-3d
    color: white
    font-size: 4rem
    .background3D
      width: 64%
      height: 100%
      margin: 0 auto
      border: 1px solid rgba(255, 255, 255, 0.5)
      box-shadow: 0 0 500px 15px rgba(60, 40, 150, 0.6)
      transform: rotateX(20deg) translateY(-10.5%)
</style>
