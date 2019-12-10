<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,i) in banners" :key="i" >
        <img :src="item" alt="" @load="imgLoad">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper';

export default {
  name: '',
  data() {
    return {
      isLoad:false
    }
  },
  props: {
      banners:{
        type:Array,
        default:()=>[]
      }
  },
  methods: {
    imgLoad(){
       if(!this.isLoad){
              this.$emit('swiperImgLoad')
              this.isLoad=true
          }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
}
</script >

<style scoped>
.detail-swiper{
    height: 450px;  
    overflow: hidden;  
}
</style>
