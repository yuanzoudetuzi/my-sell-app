<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliverTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count">
          <span class="count">{{seller.supports.length}}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <span @click="showDetail" class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <div class="background2">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail" >
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="support">
              <li class="support-item" v-for="(support,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <div class="text">
                {{seller.bulletin}}
              </div>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false,
        classMap: []
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      closeDetail() {
        this.detailShow = false;
      }
    },
    components: {
      star
    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
 @import "../../common/stylus/mixin.styl"
  .header
    position: relative
    overflow: hidden
    color: #fff
    background-color: rgba(7, 17, 27,0.5)
    .content-wrapper
      padding: 24px 0 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        border-radius: 2px
      .content
        display: inline-block
        position: relative
        width: 100%
        margin-left: -64px
        font-size: 14px
        .title
          margin: 2px 0 8px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            vertical-align: top
            bg-image ('brand')
            background-size: 30px 18px
            background-repeat: none
          .name
            margin-left 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          margin-top: 8px
          font-size: 12px
        .support
          margin-top: 10px
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image ('decrease_1')
            &.discount
              bg-image ('discount_1')
            &.guarantee
              bg-image ('guarantee_1')
            &.invoice
              bg-image ('invoice_1')
            &.special
              bg-image ('special_1')
          .text
            line-height: 12px
            font-size: 10px
        .support-count
          position: absolute
          right: 12px
          bottom: 0
          height: 24px
          line-height: 24px
          padding: 0 8px
          font-size: 10px
          font-weight: 200
          border-radius: 7px
          background-color: rgba(0,0,0,0.2)
          .icon-keyboard_arrow_right
            margin-left: 2px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space:nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image: ('bulletin')
        background-size: 22px 12px
        background-repeat: none
      .bulletin-text
        margin-left: 4px
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 9px
        font-size: 10px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height:100%
      z-index: -1
      filter: blur(10px)
      img
        width: 100%
        height: 100%
    .background2
      position: absolute
      top: 0
      left: 0
      width: 100%
      height:100%
      z-index: -2
      img
        width: 100%
        height: 100%
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background-color: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin: 64px 36px 0 36px
          padding-bottom: 64px
        .name
          line-height: 16px
          font-size: 16px
          font-weight: 700px
          text-align: center
        .star-wrapper
          margin-top:16px
          text-align: center
        .title
          display: flex
          width: 80%
          margin: 28px auto 0 auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 225, 255, 0.2)
          .text
            padding:0 12px
            font-weight: bolder
        .support
          width: 80%
          margin: 24px auto 0 auto
          font-size: 0
          text-align: left
          .icon
            display: inline-block
            height: 16px
            width: 16px
            margin-bottom: 12px
            vertical-align: top
            background-size: 16px 16px
            &.decrease
              bg-image ('decrease_1')
            &.discount
              bg-image ('discount_1')
            &.guarantee
              bg-image ('guarantee_1')
            &.invoice
              bg-image ('invoice_1')
            &.special
              bg-image ('special_1')
            &:last-child
              margin-bottom: 0
          .text
            display: inline-block
            margin-left: 6px
            line-height: 12px
            vertical-align: top
            margin-top: 2px
            font-size: 12px
        .bulletin
          width: 80%
          margin: 24px auto 0 auto
          .text
            line-height: 24px
            padding: 0 12px
            font-size: 12px
            font-weight: 200
            text-align: left
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0
        clear: both
        font-size: 32px
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-to
        opacity: 0
        background: rgba(7, 17, 27, 0)

</style>
