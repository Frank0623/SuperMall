<template>
  <div class="tab-bar-item" @click="imgClick">
    <div v-if="!isActive"><slot name="icon"></slot></div>
    <div v-else><slot name="icon-active"></slot></div>
    <div :style="isStyle"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    }
  },
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#3CB371'
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !=-1
    },
    isStyle(){
      return this.isActive ? { color:this.activeColor}:{}
    }
  },
  methods: {
    imgClick(){
      this.$router.push(this.path)
    }
  },
  components: {
  },
}
</script >

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
}
.tab-bar-item img{
  height: 40px;
  width:40px;
}
</style>
