<template>
  <div class="goods-list" @click="goodsClick">
    <img :src="showImg" alt="" @load="imgLoad" >
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
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
  props: {
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    imgLoad(){
      //监听图片的加载
      this.$bus.$emit('goodsListImgLoad')
    },
    goodsClick(){
      this.$router.push('/detail/'+ this.goodsItem.iid)
    }
  },
  computed: {
    //根据获取数据的不同，判断展示图片
    showImg(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  components: {
  },
}
</script >

<style scoped>
.goods-list{
  padding-bottom: 40px;
  position: relative;
  width: 45%;
}
.goods-list img{
  width: 100%;
  border-radius: 5px;
}
.goods-info{
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
}
.goods-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 30px;
}
</style>
