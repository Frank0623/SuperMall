<template>
  <swiper>
    <swiper-item v-for="(item,i) in banners" :key="i" class="detail-item">
        <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper';

export default {
  name: '',
  data() {
    return {
    }
  },
  props: {
      banners:{
        type:Array,
        default:()=>[]
      }
  },
  methods: {
  },
  components: {
    Swiper,
    SwiperItem
  },
}
</script >

<style scoped>
.detail-item img{
    height: 450px;    
}
</style>
