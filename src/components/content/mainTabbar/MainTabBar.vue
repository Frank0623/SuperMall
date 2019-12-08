<template>
  <div class="">
    <tab-bar>
      <tab-bar-item path="/home">
        <img src="~assets/imgs/tabbar/home.svg" alt="" slot="icon">
        <img src="~assets/imgs/tabbar/home_a.svg" alt="" slot="icon-active">
        <div slot="text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="~assets/imgs/tabbar/category.svg" alt="" slot="icon">
        <img src="~assets/imgs/tabbar/category_a.svg" alt="" slot="icon-active">
        <div slot="text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img src="~assets/imgs/tabbar/cart.svg" alt="" slot="icon">
        <img src="~assets/imgs/tabbar/cart_a.svg" alt="" slot="icon-active">
        <div slot="text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img src="~assets/imgs/tabbar/profile.svg" alt="" slot="icon">
        <img src="~assets/imgs/tabbar/profile_a.svg" alt="" slot="icon-active">
        <div slot="text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  name: '',
  data() {
    return {
    }
  },
  methods: {
  },
  components: {
    TabBar,
    TabBarItem
  },
}
</script >

<style scoped>

</style>
