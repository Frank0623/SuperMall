<template>
  <div class="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" 
      @tabClick="tabClick" ref="tabcontroltop" v-show="isTabFixed" />
    <!-- :probeType="3"====>>不加 ： 无论传入什么都会被作为字符串 -->
    <b-scroll class="content" ref="scroll" :probeType="3" @scroll="positionScroll"
     :pullUpLoad="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommends="recommends"/>
      <tab-control  :titles="['流行','新款','精选']" 
      @tabClick="tabClick" ref="tabcontrolbottom"  />
      <goods-list :goods="goods[currentType].list"/>   
    </b-scroll>
    <!-- 组件不能监听原生点击 -->
    <back-top @click.native="backTopClick" v-show="isShowBack"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childcomps/HomeSwiper'
import HomeRecommend from './childcomps/HomeRecommend'
import GoodsList from 'components/content/goods/GoodsList'
import TabControl from 'components/content/tabControl/TabControl'
import BScroll from 'components/common/bscroll/BScroll'
import BackTop from 'components/content/backtop/BackTop'
import {getHomeData,getHomeGoods} from 'network/home.js'
import {debounce} from 'common/utils'
// import {itemListenerMixin} from 'common/mixin'
export default {
  name: 'Home',
  // mixins:[itemListenerMixin],
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBack:false,
      //tabControl吸顶的位置
      tabOffSetTop:0,
      isTabFixed:false,
      saveY:0,
      itemImgListener:null
    }
  },
  methods: {
    swiperImageLoad(){
      //获取tabcontrolbottom的offsetTop
      this.tabOffSetTop=this.$refs.tabcontrolbottom.$el.offsetTop;
    },
    //上拉加载更多
    loadMore(){
      this.getHomeGoods(this.currentType)
      //等待图片加载完重新刷新，计算可滚动区域的高度
      this.$refs.scroll.refresh()
    },
    positionScroll(position){
      //是否显示backtop
      this.isShowBack= (-position.y)>1000;
      //判断TabControl是否吸顶
      this.isTabFixed= (-position.y) > this.tabOffSetTop
    },
    backTopClick(){
      // console.log('回到顶部');
      this.$refs.scroll.scrollTo(0,0,500)
    },
    tabClick(index){
      // console.log(index);
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'  
          break
      }
      this.$refs.tabcontroltop.currentIndex=index
      this.$refs.tabcontrolbottom.currentIndex=index
    },
    getHomeData(){
      getHomeData().then(res=>{
      // console.log(res);
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{ 
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page+=1
      //上拉加载完成刷新
      this.$refs.scroll.finishPullUp()
    })
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    GoodsList,
    TabControl,
    BScroll,
    BackTop
  },
  created() {
    this.getHomeData()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //  //等待goodsListd的image加载完，调用刷新计算高度
      let newRefresh = debounce(this.$refs.scroll.refresh,100)
      //对监听的事件进行保存
      this.itemImgListener=()=>{
        newRefresh()
      }
      this.$bus.$on('goodsListImgLoad',this.itemImgListener)    
    // this.$bus.$on('goodsListImgLoad',()=>{
    //   this.$refs.scroll.refresh()
    // })
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY=this.$refs.scroll.bscroll.y
    //取消全局事件的监听
    this.$bus.$off('goodsListImgLoad',this.itemImgListener)
  },
}
</script >

<style scoped>
.home{
  height: 100vh;
  position: relative;
}
.nav-bar{
  background-color: var(--color-tint);
  font-size: 20px;
  color: #fff;
 /* position: fixed;
  top:0;
  right: 0;
  left: 0;
  z-index: 9;*/
}
.content{
  position: absolute;
  top: 44px;
  bottom: 62px;
  right: 0;
  left: 0;
  overflow: hidden;
}
.tab-control{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
