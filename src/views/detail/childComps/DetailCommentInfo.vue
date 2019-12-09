<template>
  <div class="detail-com" v-if="Object.keys(detailComment).length !== 0">
    <div class="top">
        <span>用户评价</span>
        <span>更多</span>
    </div>
    <div class="user">
        <img :src="detailComment.user.avatar" alt="">
        <span>{{detailComment.user.uname}}</span>
    </div>
    <div class="content">
        <span>{{detailComment.content}}</span>
        <div class="other">
            <span>{{detailComment.created | showData}}</span>
            <span>{{detailComment.style}}</span>
        </div>
        <div class="imgs">
            <img :src="detailComment.images" alt="">
        </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils'
export default {
  name: '',
  data() {
    return {
    }
  },
  props: {
   detailComment:{
    type:Object,
    default:()=>{}
   }
  },
  filters:{
    showData(value){
        //将时间戳转为Date()对象
        const date=new Date(value * 1000)
        //将date进行格式化
        return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
  },
  components: {
  },
}
</script >

<style scoped>

.detail-com{
    margin: 10px 15px;
}

.top{
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
.user{
    display: flex;
    align-items: center;
}
.user img{
    height: 50px;
    width: 50px;
    border-radius: 50%;
}
.user span{
    margin-left: 15px;
}
.content{
    font-size: 20px;
    margin: 15px 0;
    color: #777;
    line-height: 1.5;
}
.other{
    font-size: 17px;
    margin: 15px 0;
    color: #999;
}
.other span{
    margin-right: 15px;
}
</style>
