<template>
  <div class="wrapper">
    <div class="background3D">
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur similique aliquam vero voluptatum vitae laborum ipsum accusamus perspiciatis odio repellat? Dolorem totam autem laboriosam ipsa suscipit, omnis sint pariatur ex?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dolorum ipsum officiis deleniti nam corporis dolores cumque illum tenetur modi. Ducimus aperiam aut explicabo quisquam iste, voluptates eius inventore vero.
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic earum ex sequi eaque, eos expedita dicta alias autem, debitis nihil, dolorum commodi aperiam. Quo impedit quidem consequuntur earum sint consectetur.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptas veniam quod aliquam beatae, placeat consequatur ipsum impedit numquam quo reprehenderit nisi ipsam necessitatibus? Delectus cupiditate temporibus nemo asperiores sint.
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
      padding: 50px
      text-align: justify
      overflow-y: auto
</style>
