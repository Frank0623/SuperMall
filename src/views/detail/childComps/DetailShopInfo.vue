<template>
  <div class="shop">
    <div class="logo">
        <img :src="shop.shopLogo" alt="">
        <span>{{shop.name}}</span>
    </div>
    <div class="middle">
      <div class="middle-item middle-left">
        <div class="sells">
          <div class="sells-count">{{shop.cSells | countFilter}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="goods">
          <div class="goods-count">{{shop.cGoods}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="middle-item middle-right">
        <div >
          <table>
            <tr v-for="(item,i) in shop.score" :key="i">
              <td>{{item.name}}</td>
              <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
              <td class="better" :class="{'better-more':item.isBetter}">{{item.isBetter ? '高':'低' }}</td>
            </tr>
          </table>
        </div>
      </div>
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
    shop:{
        type:Object,
        default:()=>{}
    }
  },
  filters:{
    countFilter(value){
      if(value<1000) return value;
      return (value/10000).toFixed(1)+'万'
    }
  },
  methods: {
  },
  components: {
  },
}
</script >

<style scoped>
.logo{
  margin-left: 15px;
  display: flex;
  align-items: center;
}
.logo img{
    height: 60px;
    width: 60px;
   border-radius: 100%;
   border: 1px solid rgba(0, 0, 0, .1);
}
.logo span{
  margin-left: 15px;
  font-size: 20px;
}
.middle{
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.middle-item{
  flex: 1;
}
.middle-left{
  color: #333;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, .1);
}

.sells-count, .goods-count{
  font-size: 23px;
}
.sells-text, .goods-text{
  font-size: 15px;
  color: #000;
  margin-top: 10px;
}
.middle-right{
  color: #333;
  font-size: 15px;
}
.middle-right table{
  width: 150px;
  margin-left: 30px;
  text-align: center;
}
.middle-right table td{
  padding: 5px 0;
}
.score{
  color: #5ea732;
}
.score-better{
  color: #f13e3a;
}
.better{
  background-color: #5ea732;
  color: #fff;
}
.better-more{
  background: #f13e3a;
  color: #fff;
}

</style>
