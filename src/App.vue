<template>
  <div class="main-box">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><a><span  class="icon-arrow_lift">商品</span></a></div>
      <div class="tab-item"><a><span></span>评价</a></div>
      <div class="tab-item"><a>商家</a></div>
    </div>
    <goods :seller="seller"></goods>
    <!--<rounter-view></rounter-view>-->
    <div>
    </div>
  </div>
</template>

<script>
  import header from 'components/header/header.vue';
  import goods from 'components/goods/goods.vue';
  const ERR_OK = 0;
  export default {
    name: 'App',
    data () {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
          console.log(this.seller);
        }
      });
    },
    components: {
      'v-header': header,
      'goods': goods
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "common/stylus/index.styl"
  .main-box
    max-width: 1200px
    margin: auto
    text-align: center
    .tab
      display: flex
      flex-direction: row
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.2))
      background-color: #fff
      .tab-item
        flex:1 1 auto
        text-align: center
  .tab-item > a
    display: block
    width: 100%
    height 100%
    font-size: 14px
    color: rgb(77,82,93)
  /*.main-box {
    max-width: 1200px;
    margin: auto;
    text-align: center;
  }
  .main-box .tab {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7,17,27,0.2);
  }
  .tab .tab-item {
    flex:1 1 auto;
    text-align: center;
  }
  .tab-item > a {
    display: block;
    font-size: 14px;
    color: rgb(77,82,93);
  }
  .tab-item > a.active {
    color: rgb(240,20,20);
  }*/

</style>
