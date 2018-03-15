<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <span class="icon-shopping_cart"></span>
            </div>
            <div v-if="totalCount>0" class="num">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥<span v-text="deliveryPrice"></span>元</div>
        </div>
        <div class="content-right">
          <div class="pay" @click.stop="pay" :class="{enough:totalPrice>=minPrice}"><span v-text="payDes"></span></div>
        </div>
      </div>
      <div class="ball-container">
        <transition-group @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"  name="drop" tag="div">
          <div v-for="(ball, index) in balls" :key="index" v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header border-1px">
            <h1 class="name">购物车</h1>
            <span class="empty" @click="emptyShopcart">清空</span>
          </div>
          <ul class="list-content" ref="listContent">
            <div>
              <li class="food" v-for="(food,index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food.sync="food"></cartcontrol>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            count: 1,
            price: 40
          }];
        }
      },
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 30
      }
    },
    data () {
      return {
        scroll: '',
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    components: {
      cartcontrol
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDes () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      listShow () {
        if (!this.totalCount) {
          // eslint-disable-next-line
          this.fold = true;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              // eslint-disable-next-line
              this.scroll = new BScroll(this.$refs.listContent,{
                click: true
              });
              console.log('new shop cart scroll');
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop (el) {
        console.log('drop target');
        console.log(el);
        for (let i = 0;i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      emptyShopcart () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList () {
        this.fold = true;
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          /* eslint-disable no-useless-return */
          return;
        } else {
          window.alert('去支付');
        }
      },
      beforeEnter: function (el) {
        console.log(' beforeEnter');
//        console.log(el);
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          console.log(ball.show);
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            console.log(rect);
            console.log('rect');
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22 * 2);
            el.style.display = 'inline-block';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
//        console.log(el);
      },
      enter: function (el, done) {
        // ...
        /* 触发浏览器重绘 */
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        console.log('enter');
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
        done();
      },
      afterEnter: function (el) {
        console.log('after enter');
        let ball = this.dropBalls.shift();
        if (ball.show) {
            ball.show = false;
//          el.style.display = 'none';  /*不能加，否则看不到小球*/
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 100
    .content
      display: flex
      background: #141d27
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex:1
        display: flex
        flex-direction: row
        align-items: center
        .logo-wrapper
          position: relative
          box-sizing: border-box
          margin: 0 12px 2px 12px
          width: 56px
          height: 56px
          margin-top: -10px
          padding: 6px
          border-radius: 50%
          background: #141d27
          .logo
            width: 44px
            height: 44px
            border-radius: 50%
            background: rgba(255, 255, 255, 0.2)
            .icon-shopping_cart
              display:inline-block
              line-height: 44px
              font-size: 24px
              text-align: center
              color: rgba(255, 255, 255, 0.4)
            &.highlight
              background: rgb(0, 160, 220)
              .icon-shopping_cart
                color: rgb(255, 255, 255)
          .num
            position: absolute
            right: 0
            top: 0
            width: 24px
            height: 16px
            line-height: 16px
            border-radius: 6px
            font-size: 9px
            font-weight: 700
            background: #f01414
            color: #fff
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
           padding-right: 12px
           font-weight: 700
           &.highlight
            color: #fff
        .desc
          padding: 0 12px
          line-height: 24px
          border-left: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 10px
      .content-right
        display: flex
        flex: 0 0 105px
        align-items: center
        justify-content: center
        width: 105px
        box-sizing: border-box
        .pay
          width: 100%
          line-height: 48px
          font-size: 12px
          font-weight: 700
          padding: 0 8px
          background-color: #2b333b
          &.enough
            background-color: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200px
        transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s
        &.drop-enter-active
          transition: all 0.4s
          .inner
            transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      width: 100%
      z-index: -1
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        width: 100%
        line-height: 40px
        padding: 0 18px
        box-sizing: border-box
        border-1px (rgba(7,17,27,0.1))
        background: #f3f5f7
        .name
          float: left
          line-height: 40px
          height: 40px
          vertical-align: top
          font-size: 14px
          font-weight: 200
          color: rgb(7, 17, 27)
        .empty
          float: right
          display: inline-block
          height: 40px
          line-height: 40px
          vertical-align: top
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          height: 48px
          padding: 12px 0
          box-sizing: border-box
          line-height: 24px
          font-size: 14px
          text-align: left
          border-1px (rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .name
            display: inline-block
            height: 24px
            color: rgb(7,17,27)
          .price
            display: inline-block
            position: absolute
            right: 90px
            top: 12px
            line-height: 24px
            height: 24px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position:absolute
            right: 0
            top: 6px
  .list-mask
    position: fixed;
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 50
    backdrop-filter: blur(10px)
    background-color: rgba(7,17,27,0.6)
    &.fade-enter-active,&.fade-leave-active
      opacity: 0
      transition: all 0.4
    &.fade-enter, &.fade-leave-to
      opacity: 1
      background-color: rgba(7,17,27,0)
</style>
