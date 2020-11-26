<template>
  <div class="wrapper">
    <div class="img"></div>
    <div class="title">Lorem</div>
    <div class="description">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque ipsa odio vero, provident optio dicta. Sunt nam nobis magni, omnis velit quaerat quis distinctio voluptatum, ut vitae perspiciatis voluptate similique?
    </div>
    <a class="button">Перейти</a>
  </div>
</template>

<script>
export default {
  name: 'auctionTile'
}
</script>

<style lang="sass" scoped>
  .wrapper
    border: 1px solid rgba(255, 255, 255, 0.3)
    .img
      width: 100%
      height: 40%
      background: url(../assets/kettle.png) center no-repeat
      background-size: contain
    .title
      width: 100%
      font-size: 3rem
      text-align: center
    .description
      width: 100%
      height: calc( 60% - (3rem + 3.5%) )
      overflow-y: auto
      font-size: 2rem
      padding: 3%
    .button
      width: 100%
      height: 15%
      font-size: 2.5rem
      display: none
      justify-content: center
      align-items: center
      cursor: pointer
</style>
