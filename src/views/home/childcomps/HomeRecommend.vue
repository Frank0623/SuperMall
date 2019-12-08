<template>
  <div class="recommend" >
    <div v-for="(item,i) in recommends" :key="i" class="recommend-item">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div >{{item.title}}</div>
        </a>
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
  props:{
      recommends:{
          type:Array,
          default(){
              return []
          }
      }
  },
  methods: {
  },
  components: {
  },
}
</script >

<style scoped>
.recommend{
    display: flex;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 5px solid #eee;
}
.recommend-item {
    flex: 1;
    font-size: 14px;
}
.recommend-item img{
    height: 80px;
    width: 80px;
}
</style>
