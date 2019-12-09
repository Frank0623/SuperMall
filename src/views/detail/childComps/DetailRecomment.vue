<template>
  <div class="">
    <div>热门推荐</div>
    <goods-list :goods="detailRecomment" />  
  </div>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList';
import GoodsListItem from 'components/content/goods/GoodsListItem';
export default {
  name: '',
  data() {
    return {
    }
  },
  props: {
    detailRecomment:{
        type:Array,
        default:()=>[]
    }
  },
  methods: {
  },
  components: {
    GoodsList,
    GoodsListItem
  },
}
</script >

<style scoped>
.item{
    width: 100%;
}
.item img{
    width: 100%;
}
</style>
