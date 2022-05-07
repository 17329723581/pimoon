import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/views/home";
import presale from "@/views/presale";
import airdrop from "@/views/airdrop";
import promo from "@/views/promo";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/",
    name: "主页",
    component: home,
  },
  {
    path: "/presale",
    name: "预售",
    component: presale,
  },
  {
    path: "/airdrop",
    name: "空投",
    component: airdrop,
  },
  {
    path: "/promo",
    name: "推广",
    component: promo,
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  //这里就是scrollBehavior：当路由切换时可以让页面滚到顶部
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;
