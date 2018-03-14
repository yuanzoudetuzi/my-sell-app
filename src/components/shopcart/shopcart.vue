<template>
  <div class="shopcart">
    <div class="content">
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
        <div class="pay" :class="{enough:totalPrice>=minPrice}"><span v-text="payDes"></span></div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"  name="drop" tag="div">
        <div v-for="(ball, index) in balls" :key="index" v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
        dropBalls: []
      };
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
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
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
</style>
