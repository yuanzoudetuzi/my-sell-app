<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul v-if="goods" class="content">
        <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <div class="text border-1px">
            <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul v-if="goods" class="content">
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook border-1px">
          <h1 class="title border-1px">{{item.name}}</h1>
          <ul v-if="item.foods">
            <li v-for="(food, index) in item.foods"  :key="index" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="加载图片失败">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售 {{food.sellCount}}</span><span>好评率 {{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new-price">￥{{food.price}}</span>
                  <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @cartAdd="listenCartAdd" :food.sync="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--<food :food="detailFood"></food>-->
    <shopcart ref="shopcart" :select-foods="selectFoods" :min-price="seller.minPrice" :delivery-price="seller.deliveryPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import food from 'components/food/food.vue';
  import shopcart from 'components/shopcart/shopcart.vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object,
        required: true
      },
      detailFood: {

      }
    },
    components: {
      food,
      shopcart,
      cartcontrol
    },
    data () {
      return {
        goods: [],
        classMap: [],
        menuScroll: '',
        foodScroll: '',
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      /* 当前在哪一类食物分类下 */
      currentIndex() {
        let len = this.listHeight.length;
        for (let i = 0; i < len; i++) {
          let height1 = this.listHeight[i];
          if (i === len - 1) {
            return i;
          } else {
            let height2 = this.listHeight[i + 1];
            if (this.scrollY >= height1 && this.scrollY < height2) {
              return i;
            }
          }
        }
        return 0;
      },
      /* 选择了哪些food */
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count > 0) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      _initScroll() {
          this.menuScroll = new BScroll(this.$refs.menuWrapper, {
            click: true
          });
          this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3
          });
          this.foodScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
//            console.log(scrollY);
          });
      },
      _calculateHeight() {
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          let len = foodList.length;
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < len; i++) {
            let item = foodList[i];
            height += item.clientHeight;
            this.listHeight.push(height);
          }
      },
      selectMenu (index, event) {
        console.log('selectMenu');
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      /* 监听cartcontrol组件的cartAdd事件，再调用shopcart组件的方法 */
      listenCartAdd (target) {
        /* 异步优化动画显示 */
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
          if (response.errno === ERR_OK) {
            this.goods = response.data;
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            });
            console.log(this.goods);
          }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    over-flow: hidden
    z-index: -10
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative
          z-index: 10px
          margin-top: -1px
          background-color: #fff
          font-weight: 700
          .text
            border-none()
        .text
          display: table-cell
          width: 56px
          border-1px (rgba(7,17,27,0.1))
          vertical-align: middle
          font-size: 12px
          font-weight: 200
          text-align: left
          .icon
            /*vertical-align: middle*/
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            /*background-position: center center*/
            &.decrease
              bg-image ('decrease_3')
            &.discount
              bg-image ('discount_3')
            &.guarantee
              bg-image ('guarantee_3')
            &.invoice
              bg-image ('invoice_3')
            &.special
              bg-image ('special_3')
    .foods-wrapper
      flex: 1
      .food-list
        text-align: left
        .title
          padding-left: 14px
          line-height: 26px
          height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          background-color: rgba(7, 17, 27, 0.1)
        .food-item
          display: flex
          padding:18px 0
          margin: 0 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .icon
            flex: 0 0 57px
            width: 54px
            height: 54px
            img
              width: 100%
              height: 100%
          .content
            position: relative
            flex: 1
            margin: 4px 0 0 10px
            text-align: left;
            .name
              line-height: 14px
              font-size: 14px
              color: rgb(7,17,27)
            .desc, .extra
              margin-top: 8px
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
              /*white-space: nowrap*/
              /*overflow: hidden*/
              /*text-overflow: ellipsis*/
            .extra
              span
                &:first-child
                  margin-right: 12px
            .price
              line-height: 24px
              font-size: 14px
              font-weight: 700
              color: rgb(240, 20, 20)
              span
                &:nth-child(2)
                  font-size: 10px
                  margin-left: 8px
                  text-decoration: line-through
                  color: rgb(147, 153, 159)
            .cartcontrol-wrapper
              position: absolute
              bottom: -12px
              right: 0
</style>
