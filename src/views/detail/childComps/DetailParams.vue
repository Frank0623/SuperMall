<template>
  <div class="param-info" v-if="Object.keys(detailParams).length !==0">
      <table>
          <tr><td>{{detailParams.rule.key}}</td></tr>
          <tr v-for="(item,index) in detailParams.rule.tables[0]" :key="index">
            <td v-for="(info,i) in item " :key="i">{{info}}</td>
          </tr>
      </table>
      <div style="font-size:20px;">{{detailParams.rule.desc}}</div>
      <table>
          <tr><td>{{detailParams.info.key}}</td></tr>
          <tr v-for="(item,index) in detailParams.info.set" :key="index">
            <td class="info-param-key">{{item.key}}</td>
            <td class="param-value">{{item.value}}</td>
          </tr>
      </table>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    }
  },
  props: {
      detailParams:{
          type:Object,
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
.param-info{
    padding: 15px;
    font-size: 16px;
    border-bottom: 5px solid #f2f5f8;
}
.param-info table{
    width: 100%;
    border-collapse: collapse;
}
.param-info table tr{
    height: 42px;
}
  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
    .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }
    .param-value {
    color: #eb4868
  }

</style>
