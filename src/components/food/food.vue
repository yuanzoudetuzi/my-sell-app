<template>
  <div class="food" v-show="showFlag">
    <div class="food-wrapper">i am food</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: true
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .food
    position: fixed
    left: 0
    bottom: 48px
    width: 100%
    height: 100%
    z-index: 40
    background: #fff
</style>
