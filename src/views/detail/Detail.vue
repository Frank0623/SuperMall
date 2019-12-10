<template>
  <div class="detail">
    <nav-bar class="nav-bar" >
      <div slot="left" @click="back">返回</div>
      <div slot="center" class="item">
        <span v-for="(item,i) in list" :key="i" @click="itemClick(i)" :class="{active:currentIndex==i}">{{item}}</span>
      </div>
    </nav-bar>
    <b-scroll class="content" ref="scroll" @scroll="postionScroll" :probe-type="3" :pullUpLoad="true" >
        <!-- :data="[banners,goods,detailInfo,detailInfo,detailParams,detailComment,detailRecomment]"  > -->
      <detail-swiper :banners="banners" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @goodsImgLoad="goodsImgLoad"/>
      <detail-params ref="params" :detailParams="detailParams" />
      <detail-comment-info ref="comment" :detailComment="detailComment"/>
      <detail-recomment ref="recomment" :detailRecomment="detailRecomment"/>
      
    </b-scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
  
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
import DetailBottomBar from './childComps/DetailBottomBar';
import { getDetail,Goods,Shop,getRecomment } from 'network/detail';
import {debounce} from 'common/utils.js';
// import {itemListenerMixin} from 'common/mixin';
export default {
  name: 'Detail',
  // mixins:[itemListenerMixin],
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
      isShowTop:false,
      themeTopYs:[],
      itemImgListener:null,
      
    }
  },
  methods: {
    back(){
      this.$router.back()
    },
    itemClick(i){
     this.currentIndex = i
     //点击标题滚动到相应内容    
     this.$refs.scroll.scrollTo(0, -this.themeTopYs[i],200)
    },
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    postionScroll(position){
      this.isShowTop= (-position.y) >1000
      // console.log(position);
      const positionY= -position.y
      // for(let i in this.themeTopYs){
        let length=this.themeTopYs.length
        // for (let i=0; i<length;i++) {
        //   if (this.currentIndex !==i && ((i<length-1 && positionY >=this.themeTopYs[i] 
        //   && positionY<this.themeTopYs[i+1]) || (i===length-1 && positionY >=this.themeTopYs[i]))) {
          for(let i=0;i<length-1;i++){
            if(this.currentIndex !==i &&(positionY >= this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
              this.currentIndex=i          
          }
        }       
      },
    //  swiperImgLoad(){
    //   this.$refs.scroll.refresh()
    // },
    goodsImgLoad(){
    //   // this.newRefresh()
      this.$refs.scroll.refresh()
    },
    addToCart(){
      const product={}
      product.img=this.banners[0]
      product.title=this.goods.title
      product.price=this.goods.newPrice
      product.iid=this.iid
      console.log(product);
       
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
    DetailRecomment,
    DetailBottomBar
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
   
      //1、 值获取不对，因为this.$refs.params.$el根本就没有渲染
      //   this.themeTopYs=[]
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recomment.$el.offsetTop)
      
      //2、值获取不对，因为图片没有计算在内
      // // 函数nextTick()是根据组件渲染完进行回调
      // this.$nextTick(()=>{
      //   //根据最新的数据，对应的DOM已经被渲染，  但图片依然未加载完，此时的offsetTop不含其中分图片
        // this.themeTopYs=[]
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recomment.$el.offsetTop)
        // console.log(this.themeTopYs);
      // })
    })
    //获取推荐数据
    getRecomment().then(res=>{
      // console.log(res.data);
      this.detailRecomment=res.data.list
    })
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () =>{
      newRefresh()
    }
    this.$bus.$on('goodsListImgLoad', this.itemImgListener)
  },
  updated() {
    this.$nextTick(()=>{
      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop)
      //给一个最大值，便于滚动内容显示对应标题
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    })
  },
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
  bottom: 58px;
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
