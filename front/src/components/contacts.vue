<template>
  <div class="wrapper">
    <div class="background3D">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo veritatis natus non repudiandae, optio alias voluptate accusamus. Veniam earum, dolorum ipsum iure qui nulla molestias esse velit similique illo dolores.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo aspernatur pariatur quasi magnam dolores, et doloribus dolorem fuga asperiores repellendus facilis ipsam quidem minima architecto laudantium tempore ipsum nesciunt quod.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nesciunt molestias nisi facere eius deserunt rerum doloremque expedita tempore laboriosam? Ducimus fugiat possimus deleniti dolorum. Beatae quia adipisci odit enim nostrum at voluptatem, fugiat minus eaque vel omnis quaerat tempore?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nobis libero illo repellat. Quidem doloribus fugit error ut quaerat quam repudiandae nam ad officiis enim maiores, eveniet laboriosam sapiente cum ex quis numquam expedita autem, magni eum saepe molestiae! Sit expedita porro placeat laborum? Dolor odio aperiam delectus veniam! Consequatur est earum obcaecati id voluptatem error dicta laudantium aperiam ab cum temporibus nihil deserunt at deleniti, reiciendis illum maxime iste vel dolor fugit tenetur optio odit? Rem nesciunt quaerat, suscipit possimus nulla fugit, necessitatibus autem sunt ducimus quos reprehenderit veritatis maxime laborum harum explicabo dicta laudantium, quam ipsum earum ut.
    </div>
  </div>
</template>

<script>
export default {
  name: 'contacts'
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
