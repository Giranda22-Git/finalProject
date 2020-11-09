<template>
  <div class="home">
    <registration />
  </div>
</template>

<script>

import registration from '../components/registration'

export default {
  name: 'Home',
  components: {
    registration
  }
}
</script>

<style lang="sass" scoped>
  .home
    min-height: 100vh !important
</style>
