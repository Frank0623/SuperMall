<template>
  <div class="base-info">
    <div class="title">
        {{goods.title}}
    </div>
    <div class="price">
        <span class="n-price">{{goods.newPrice}}</span>
        <span class="o-price">{{goods.oldPrice}}</span>
        <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="others">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="services" >
        <span class="services-item" v-for="index in goods.services.length-1" :key="index">
            <img :src="goods.services[index-1].icon" alt="">
            <span>{{goods.services[index-1].name}}</span>
        </span>
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
    goods:{
    type:Object,
    default(){
        return {}
    }
    },
    shop:{
        type:Array,
        default:()=>{}
    }
  },
  methods: {
  },
  components: {
  },
}
</script >

<style scoped>
.base-info{
    margin-top: 5px;
    padding: 0 5px;
}
.title{
    color: #222
}
.price{
    margin-top: 10px;
}
.n-price{
    font-size: 24px;
    color: var(--color-high-text)
}
.o-price{
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
}
.discount{
    margin-left: 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 5px;
    /* 使元素上浮，使用相对定位*/
    position: relative;
    top: -8px;
}
.others{
    display: flex;
    justify-content: space-around;
    font-size: 14px;
}
.shop{
    margin: 20px;
}
.shop img{
    height: 40px;
}
.services{
    display: flex;
    justify-content: space-around;
    line-height: 60px;
}
.services-item img{
    height: 20px;
    width: 20px;
    position: relative;
    top: 5px;
}
.services-item span{
    font-size: 13px;
}
</style>
