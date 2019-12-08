<template>
  <div class="detail">
    <nav-bar>
    <div slot="left" @click="back">返回</div>
    <div slot="center" class="item">
        <span v-for="(item,i) in list" :key="i" @click="itemClick(i)" :class="{active:currentIndex==i}">{{item}}</span>
    </div>
    </nav-bar>
    <detail-swiper :banners="banners"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
  </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from "./childComps/DetailShopInfo";
import { getDetail,Goods,Shop } from 'network/detail';
export default {
  name: 'Detail',
  data() {
    return {
        iid:null,
        list:['商品','参数' ,'评论', '推荐'],
        currentIndex:0,
        banners:[],
        goods:{},
        shop:{}
    }
  },
  methods: {
    back(){
        this.$router.back()
    },
    itemClick(i){
     this.currentIndex = i
    }
  },
  components: {
    NavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  created() {
    this.iid=this.$route.params.iid
    getDetail(this.iid).then(res=>{
        console.log(res.result);
        this.banners.push(...res.result.itemInfo.topImages)
        //详情页商品基本信息
        this.goods=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
        //详情页店铺信息
        this.shop=new Shop(res.result.shopInfo)
    })
  },
}
</script >

<style scoped>
.item{
    display: flex;
}
.item span{
    flex:1;
}
.active{
    color: var(--color-high-text)
}
</style>
