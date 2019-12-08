<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    }
  },
  methods: {
  },
  components: {
  },
}
</script >

<style scoped>
.tab-bar{
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -1px 5px #888;
  background-color: #fff;
}
</style>
