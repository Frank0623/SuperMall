<template>
  <div class="shop">
      <div class="logo">
          <img :src="shop.shopLogo" alt="">
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    }
  },
  props:{
    shop:{
        type:Object,
        default:()=>{}
    }
  },
  methods: {
  },
  components: {
  },
}
</script >

<style scoped>

.logo img{
    height: 60px;
    width: 60px;
   border-radius: 100%;
   border: 1px solid rgba(0, 0, 0, .1);
}
</style>
