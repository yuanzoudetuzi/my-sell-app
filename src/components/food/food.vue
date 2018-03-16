<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-wrapper">
        <div class="image-header">
          <img :src="food.image" alt="商品图片展示">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content border-1px">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">月售{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="new">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div v-show="food.count>0" class="cartcontrol-wrapper">
            <cartcontrol @cartAdd="addAfterFirst" :food.sync="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div  class="buy" @click="addFirst($event)" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :ratings="food.ratings" :select-type="selectType" :only-content=" onlyContent" :desc="desc" @ratingtypeSelect="listenRatingTypeSelect" @contentToggle="listenContentToggle"></ratingselect>
          <div class="rating-wrapper border-1px">
            <ul v-show="food.ratings && food.ratings.length">
              <li  v-for="(rating, index) in food.ratings" class="rating-item" :key="index" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <div class="name">{{rating.username}}</div>
                  <img class="avatar" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  import split from 'components/split/split.vue';
  import ratingselect from 'components/ratingselect/ratingselect.vue';
  import {formateDate} from 'common/js/date.js';
  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        scroll: '',
        selectType: ALL,
        onlyContent: false,
        desc: {
              all: '全部',
              positive: '推荐',
              negative: '吐槽'
          }
        };
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formateDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      show () {
       this.showFlag = true;
       this.selectType = ALL;
       this.onlyContent = false;
       console.log('food ratings');
       console.log(this.food);
       this.$nextTick(() => {
         if (!this.scroll) {
           this.scroll = new BScroll(this.$refs.food, {
             click: true
           });
         } else {
           this.scroll.refresh();
         }
       });
      },
      hide () {
        this.showFlag = false;
      },
      addFirst (event) {
        if (!event._constructed) {
          /* eslint-disable no-undef */
          return;
        }
        console.log('add first');
        if (!this.count) {
          this.$set(this.food, 'count', 1);
        } else {
          this.$emit('cartAdd', event);
          this.food.count++;
        }
      },
      addAfterFirst (event) {
        this.$emit('cartAdd', event);
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      listenRatingTypeSelect (type) {
        this.selectType = type;
        this.$nextTick(() => {
            this.scroll.refresh();
        });
      },
      listenContentToggle (onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    z-index: 40
    transform: translate3d(0,0,0)
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.5s
    &.move-enter, &.move-leave-to
      transform: translate3d(0,-100%,0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%  /*与width一致*/
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding: 18px 18px
      text-align: left
      background-color: #fff
      border-1px (rgba(7, 17, 27, 0.1))
      .title
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        text-align: left
        margin-top: 8px
        font-size: 0
        span
          display: inline-block
          margin-right: 12px
          height: 10px
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .price
        margin-top:18px
        font-size: 0
        font-weight: 700
        .new
          line-height: 24px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          line-height: 24px
          font-size: 10px
          color: rgb(147, 153, 159)
          text-decoration: line-through
      .cartcontrol-wrapper
        position: absolute
        right: 18px
        bottom: 18px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        box-sizing: border-box
        height: 24px
        line-height: 24px
        padding: 0 12px
        border-radius: 12px
        font-size: 10px
        color: rgb(255,255,255)
        background: rgb(0,160,220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.4s
        &.fade-enter, &.fade-leave-to
          opacity: 0
    .info
      padding: 18px 18px
      text-align: left
      background-color: #fff
      .title
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        margin-top: 6px
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      background: #fff
      .title
        padding-left: 18px
        margin-top: 18px
        line-height: 14px
        font-size: 14px
        text-align: left
        color: rgb(7, 17, 27)
        margin-bottom: 6px
      .rating-wrapper
        .rating-item
          display: relative
          padding: 16px 0
          margin: 0 18px
          border-1px(rgba(7, 17, 27, 0.1))
          .user
              position: absolute
              right: 18px
              bottom: 36px
              height: 12px
              font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              line-height: 12px
              height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              width: 12px
              height: 12px
          .time
            height: 12px
            line-height: 12px
            font-size: 10px
            text-align: left
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            text-align: left
            span
              margin-right: 4px
              line-height: 24px
              &.icon-thumb_up
                color: rgb(0,160,220)
              &.icon-thumb_down
                color: rgb(147,153,159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147,153,159)
</style>
