<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
            </div>
          </li>
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
            </div>
          </li>
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span :class="{active:favorite}" class="icon-favorite"></span>
          <span :class="{active:favorite}" class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split v-if="seller.bulletin || seller.supports "></split>
      <div class="bulletin  border-1px">
        <h1 class="title">公告与活动</h1>
         <p v-if="seller.bulletin" class="text">{{seller.bulletin}}</p>
      </div>
      <ul v-if="seller.supports" class="support">
        <li class="support-item border-1px" v-for="(support, index) in seller.supports" :key="index">
          <span class="icon" :class="classMap[support.type]"></span>
          <span class="text">{{support.description}}</span>
        </li>
      </ul>
      <split v-if="seller.pics"></split>
      <div v-if="seller.pics" class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="pic">
          <ul class="pic-list" ref="piclist">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" alt="商家展示图片">
            </li>
          </ul>
        </div>
      </div>
      <split v-if="seller.info"></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import split from 'components/split/split.vue';
  import star from 'components/star/star.vue';
  import {saveToLocal, loadFromLocal} from 'common/js/store.js';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        scroll: '',
        picScroll: '',
        classMap: [],
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    components: {
      split,
      star
    },
    created  () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    mounted () {
      this._initScroll();
      if (this.seller.pics) {
        this._initPicScroll();
      }
    },
    methods: {
      toggleFavorite () {
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll () {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
      },
      _initPicScroll () {
        if (!this.picScroll) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.piclist.style.width = width + 'px';
          this.picScroll = new BScroll(this.$refs.pic, {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        } else {
          this.picScroll.refresh();
        }
      }
    },
   watch: {
      seller () {
        console.log('watch');
        this.$nextTick(() => {
          this._initScroll();
          this._initPicScroll();
        });
      }
   }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    z-index: -10
    over-flow: hidden
    .seller-content
      .overview
        position: relative
        padding: 18px
        .title
          line-height: 14px
          font-size: 14px
          text-align: left
          color: rgb(7, 17, 27)
        .desc
          margin-top: 8px
          padding-bottom: 18px
          border-1px(rgba(7,17,27,0.1))
          text-align: left
          font-size: 0
          .star
            display: inline-block
            margin-right: 8px
            vertical-align: top
          .text
            margin-right: 12px
            line-height: 18px
            font-size: 10px
            color: rgb(77, 85, 93)
        .remark
          display: flex
          padding-top: 18px
          text-align: center
          .block
            flex: 1
            border-right: 1px solid rgba(7, 17, 27, 0.1)
            &:last-child
              border: 0
            h2
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .content
              margin-top: 4px
              line-height: 24px
              font-size: 24px
              font-weight: 200
              color: rgb(7, 17, 27)

        .favorite
          position: absolute
          width: 50px
          top: 18px
          right: 11px
          text-align: center
          .icon-favorite
            display: block
            margin-bottom: 4px
            line-height: 24px
            font-size: 24px
            color: #d4d6d9
            &.active
              color: rgb(240, 20 ,20)
          .text
            display: block
            line-height: 10px
            font-size: 10px
            color: #d4d6d9
            &.active
              color: rgb(77, 85, 93)
      .bulletin
        padding: 18px 18px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          line-height: 14px
          font-size: 14px
          text-align: left
          color: rgb(7, 17, 27)
        .text
          margin-top: 8px
          padding: 0 12px
          line-height: 24px
          text-align: left
          font-size: 12px
          font-weight: 200
          color: rgb(240, 20, 20)
      .support
        padding: 12px 18px
        text-align: left
        .support-item
          padding: 12px 12px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .icon
            display: inline-block
            height: 16px
            width: 16px
            vertical-align: top
            background-size: 16px 16px
            &.decrease
              bg-image ('decrease_4')
            &.discount
              bg-image ('discount_4')
            &.guarantee
              bg-image ('guarantee_4')
            &.invoice
              bg-image ('invoice_4')
            &.special
              bg-image ('special_4')
            &:last-child
              margin-bottom: 0
          .text
            display: inline-block
            margin-left: 6px
            line-height: 16px
            vertical-align: top
            font-size: 12px
            font-weight: 200
      .pics
        background: #fff
        text-align: left
        .title
          margin-top: 18px
          padding: 0 18px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .pic-wrapper
          width: 100%
          margin-bottom: 18px
          padding: 0 18px
          overflow: hidden
          white-space: nowrap
          .pic-list
            margin-top: 12px
            font-size: 0
            .pic-item
              display: inline-block
              margin-right: 6px
              width: 120px
              height: 90px
              img
                width: 100%
                height: 100%
              &:last-child
                margin-right: 0
      .info
        padding: 18px 18px 0 18px
        text-align: left
        color: rgb(7, 17, 27)
        .title
          padding-bottom: 12px
          line-height: 14px
          border-1px(rgba(7,17,27, 0.1))
          font-size: 14px
        .info-item
          padding: 16px 12px
          line-height: 16px
          font-size: 12px
          font-weight: 200
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
</style>
