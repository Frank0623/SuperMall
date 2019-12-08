<template>
  <div class="tab-control">
      <div class="item" v-for="(item,index) in titles" :key="index" 
        :class="{active:index==currentIndex}" @click="btnClick(index)">
        <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
        currentIndex:0,
    }
  },
  methods: {
      btnClick(index){
          this.currentIndex=index;
          this.$emit('tabClick',index)
      }
  },
  props:{
    titles:{
        type:Array,
        default:()=>[]   
    }
  },
  components: {
  },
}
</script >

<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 5px;
}
.item{
    flex: 1;
}
.item span{
    padding: 5px;
}
.active{
    color: var(--color-high-text);
}
.active span{
    border-bottom: 3px solid var(--color-tint);
}
</style>
