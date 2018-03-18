<template>
  <div class="main-box">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!--<div class="tab-item"><a>商品</a></div>-->
      <!--<div class="tab-item"><a>评价</a></div>-->
      <!--<div class="tab-item"><a>商家</a></div>-->
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="seller">商家</router-link></div>
    </div>
    <!--<goods :seller="seller"></goods>-->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    <!--<ratings :seller="seller"></ratings>-->
    <!--<seller :seller="seller"></seller>-->
  </div>
</template>

<script>
  import header from 'components/header/header.vue';
  import goods from 'components/goods/goods.vue';
  import ratings from 'components/ratings/ratings.vue';
  import seller from 'components/seller/seller.vue';
  import {urlParse} from 'common/js/urlParse.js';
  const ERR_OK = 0;
  export default {
    name: 'App',
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log('queryParam');
            console.log(queryParam);
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/seller?id=this.seller.id').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
          console.log(this.seller);
        }
      });
    },
    components: {
      'v-header': header,
      'goods': goods,
      'ratings': ratings,
      'seller': seller
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "common/stylus/index.styl"
  .main-box
    max-width: 1200px
    height: 100%
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
        &.link-active
          color: rgb(240,20,20)
</style>
