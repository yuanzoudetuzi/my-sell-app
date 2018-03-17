<template>
  <div class="ratings" ref="rating">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-time">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings" @ratingtypeSelect="listenRatingTypeSelect"  @contentToggle="listenContentToggle"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" alt="用户头像">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div v-if="rating.score" class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text" v-show="rating.text">{{rating.text}}</p>
              <div class="recommend" v-if="rating.recommend && rating.recommend.length>0">
                <span class="icon-thumb_up"></span>
                <span class="recommend-item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import split from 'components/split/split.vue';
  import star from 'components/star/star.vue';
  import ratingselect from 'components/ratingselect/ratingselect.vue';
  import {formateDate} from 'common/js/date.js';
  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        ratings: [],
        scroll: ''
      };
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formateDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
          response = response.body;
          if (response.errno === ERR_OK) {
            this.ratings = response.data;
            console.log('this.ratings');
            console.log(this.ratings);
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.rating, {
                  click: true
                });
            });
          }
      });
    },
    components: {
      split,
      star,
      ratingselect
    },
    methods: {
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
  .ratings
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    z-index: -10
    over-flow: hidden
    .rating-content
      .overview
        display: flex
        padding: 18px 0
        text-align: center
        .overview-left
          flex: 0 0 137px
          width: 137px
          padding: 6px 0
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          text-align: center
          @media only screen and (max-width: 320px)
            flex: 0 0 120px
            width: 120px
          .score
            line-height: 28px
            font-size: 24px
            color: rgb(255, 153, 0)
          .title
            margin-top: 6px
            line-height: 12px
            font-size: 12px
            color: rgb(7, 17, 27)
          .rank
            margin-top: 8px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
        .overview-right
          flex: 1
          padding: 6px 24px
          text-align: left
          @media only screen and (max-width: 320px)
            padding: 6px 0 6px 6px
          .score-wrapper
            margin-bottom: 8px
            font-size: 0px
            .title
              display: inline-block
              margin-right: 12px
              line-height: 18px
              font-size: 12px
              color: rgb(7, 17, 27)
            .star
              display: inline-block
              vertical-align: top
            .score
              display: inline-block
              margin-left: 12px
              line-height: 18px
              font-size: 12px
              color: rgb(255, 153, 0)
          .delivery-time
            font-size: 12px
            .title
              margin-right: 12px
              line-height: 18px
              color: rgb(7, 17, 27)
            .time
              line-height: 18px
              color: rgb(147, 153, 159)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          padding: 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          display: flex
          &:last-child
            border-none()
          .avatar
            flex:0 0 28px
            img
              width: 28px
              height: 28px
          .content
            position: relative
            flex: 1
            margin-left: 12px
            text-align: left
            .name
              line-height; 12px
              font-size: 10px
              color: rgb(7, 17 ,27)
            .star-wrapper
              margin-top: 4px
              font-size: 0
              .star
                display: inline-block
                vertical-align: top
              .delivery
                margin-left: 6px
                line-height: 12px
                font-size: 10px
                color: rgb(147,153,159)
            .text
              margin-top: 6px
              line-height: 18px
              font-size: 12px
              color: rgb(7, 17, 27)
            .recommend
              .icon-thumb_up
                line-height: 16px
                font-size: 12px
                color: rgb(0,160,220)
              .recommend-item
                padding: 0 6px
                margin-right: 8px
                line-height: 16px
                border: 1px solid rgba(7,17,27,0.1)
                border-radius: 2px
                font-size: 9px
                color: rgb(147,153,159)
                background-color: #fff
            .time
              position: absolute
              top: 0
              right: 0
              line-height: 12px
              font-size: 10px
              font-weight: 200
              color: rgb(147, 153, 159)
</style>
