<template>
  <div class="detail">
    <nav-bar class="nav-bar">
      <div slot="left" @click="back">返回</div>
      <div slot="center" class="item">
        <span v-for="(item,i) in list" :key="i" @click="itemClick(i)" :class="{active:currentIndex==i}">{{item}}</span>
      </div>
    </nav-bar>
    <b-scroll class="content" :pullUpLoad="true" ref="scroll" @scroll="postionScroll">
      <detail-swiper :banners="banners"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo"/>
      <detail-params :detailParams="detailParams" />
      <detail-comment-info :detailComment="detailComment"/>
      <detail-recomment :detailRecomment="detailRecomment"/>
    </b-scroll>
    <back-top @click.native="backTopClick" v-show="isShowTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from "./childComps/DetailShopInfo";
import BScroll from 'components/common/bscroll/BScroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import BackTop from 'components/content/backtop/BackTop'
import DetailParams from './childComps/DetailParams'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecomment from './childComps/DetailRecomment';
import { getDetail,Goods,Shop,getRecomment } from 'network/detail';
export default {
  name: 'Detail',
  data() {
    return {
      iid:null,
      list:['商品','参数' ,'评论', '推荐'],
      currentIndex:0,
      banners:[],
      goods:{},
      shop:{},
      detailInfo:{},
      detailParams:{},
      detailComment:{},
      detailRecomment:[],
      isShowTop:false
    }
  },
  methods: {
    back(){
      this.$router.back()
    },
    itemClick(i){
     this.currentIndex = i
    },
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    postionScroll(position){
      this.isShowTop= (-position.y) >1000
    }
  },
  components: {
    NavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    BScroll,
    DetailGoodsInfo,
    BackTop,
    DetailParams,
    DetailCommentInfo,
    DetailRecomment
  },
  created() {
    //根据iid获取详情页信息
    this.iid=this.$route.params.iid
    getDetail(this.iid).then(res=>{
      // console.log(res.result);
      this.banners.push(...res.result.itemInfo.topImages)
      //详情页商品基本信息
      this.goods=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
      //详情页店铺信息
      this.shop=new Shop(res.result.shopInfo)
      //详情页商品的详细信息
      this.detailInfo=res.result.detailInfo
      //详情页商品的参数信息
      this.detailParams=res.result.itemParams
      //详情页商品的评论信息
      if(res.result.rate.cRate !==0){
        this.detailComment=res.result.rate.list[0]
      }
    })
    //获取推荐数据
    getRecomment().then(res=>{
      console.log(res.data);
      this.detailRecomment=res.data.list
    })
  },
  mounted() {
    this.$bus.$on('swiperImgLoad',()=>{
      this.$refs.scroll.refresh()
    })
    this.$bus.$on('goodsImgLoad',()=>{
      this.$refs.scroll.refresh()
    })
  }
}
</script >

<style scoped>
.detail{
  position: relative;
  z-index: 19;
  background-color: #fff;
  height: 100vh;
}
.nav-bar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: #fff;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
}
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
