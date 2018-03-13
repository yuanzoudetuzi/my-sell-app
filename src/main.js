// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import VueRouter from 'vue-router';
import App from './App';
import VueResouce from 'vue-resource';
// import goods from 'components/goods/goods';
// import ratings from 'components/ratings/ratings';
// import seller from 'components/seller/seller';
Vue.config.productionTip = false;
Vue.use(VueResouce);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  }
  // template: '<App/>'
});
// Vue.use(VueRouter);
/* eslint-disable no-new */
// let app = Vue.extend(App);
// let router = new VueRouter({
//   linkActiveClass: 'active'
// });
// router.map({
//   '/goods': {
//     components: goods
//   },
//   '/ratings': {
//     components: ratings
//   },
//   '/seller': {
//     components: seller
//   }
// });
// router.star(app, '#app');
// router.go('/goods');
