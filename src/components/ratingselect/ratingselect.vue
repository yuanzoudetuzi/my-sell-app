<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block all" :class="{'active':foodSelectType ===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':foodSelectType ===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)"  class="block negative" :class="{'active':foodSelectType ===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent($event)" class="switch border-1px" :class="{'on': foodOnlyContent}">
      <span class="icon-check_circle"></span>
      <span>只看内容</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        tyoe: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    data () {
      return {
        foodSelectType: '',
        foodOnlyContent: false
      };
    },
    created () {
      this.foodSelectType = this.selectType;
      this.foodOnlyContent = this.onlyContent;
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          /* eslint-disable no-undef */
            return;
        }
        this.foodSelectType = type;
        this.$emit('ratingtypeSelect', type);
      },
      toggleContent () {
        if (!event._constructed) {
          /* eslint-disable no-undef */
          return;
        }
        this.foodOnlyContent = !this.foodOnlyContent;
        this.$emit('contentToggle', this.foodOnlyContent);
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    text-align: left
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px (rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block;
        padding: 8px 12px
        margin-right: 8px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        .count
          line-height: 16px
          font-size: 8px
          margin-left: 2px
      .all
        background: rgba(0, 160, 220, 0.2)
        &.active
          background-color: rgb(0, 160, 220)
          color: #fff
      .positive
        background: rgba(0, 160, 220, 0.2)
        &.active
          background-color: rgb(0, 160, 220)
          color: #fff
      .negative
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: rgb(77, 85, 93)
          color: #fff
    .switch
      padding: 12px 18px
      line-height: 24px
      border-1px(rgba(7, 17, 27, 0.1))
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      span
        display: inline-block
        line-height: 24px
        vertical-align: top
        font-size: 12px
        color: rgb(147, 153, 159)
        &.icon-check_circle
          font-size: 24px
</style>
