<template>
  <div  ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: '',
  data() {
    return {
        bscroll:null
    }
  },
  props: {
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    refresh(){
      //判断bscroll有值，再继续
      this.bscroll && this.bscroll.refresh()
    },
    scrollTo(x,y, time=500){
      this.bscroll && this.bscroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.bscroll.finishPullUp()
    }
  },
  components: {
  },
  mounted() {
      this.bscroll=new BScroll(this.$refs.wrapper,{
          click:true,
          //监听滚动probeType：0与probeType：1不监听，probeType：3实时监听
          probeType:this.probeType,
          //上拉加载
          pullUpLoad:this.pullUpLoad
      })
    //监听滚动的位置  
    this.bscroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
    //监听上拉加载
    this.bscroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
}
</script >

<style scoped>
</style>
