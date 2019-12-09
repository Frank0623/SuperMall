<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !==0">
     <div class="info-desc clear-fix"> 
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
     </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
        <img v-for="(item,i) in detailInfo.detailImage[0].list" :key="i" :src="item" @load="imgLoad">
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      count:0,
      imgLength:0,
    }
  },
  props: {
    detailInfo:{
      type:Object,
      default:()=>{}
    }
  },
  methods: {
    imgLoad(){
      this.$bus.$emit('goodsImgLoad')
    }
  },
  components: {
  },
}
</script >

<style scoped>
 .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }
  .start, .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .start {
    float: left;
  }
  .end {
    float: right;
  }
  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .info-desc .end::after {
    right: 0;
  }

  .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
