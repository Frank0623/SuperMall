<template>
  <div class="goods-list">
      <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: '',
  data() {
    return {
    }
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
  },
  components: {
      GoodsListItem
  },
}
</script >

<style scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
