// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import VueResouce from 'vue-resource';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResouce);
/* eslint-disable n */
let routes = [
  { path: '/', redirect: 'goods' },
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];
let router = new VueRouter({
  routes,
  linkActiveClass: 'link-active'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  router
  // template: '<App/>'
});
