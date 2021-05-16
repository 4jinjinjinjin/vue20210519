import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/theFog/Main";
import Login from "../views/theFog/Login";
import Bill from "@/views/theFog/Bill";
import Member from "@/views/theFog/Member";
import Store from "@/views/theFog/Store";
import Index from "@/views/theFog/Index";
import Goods from "@/views/theFog/Goods";
import Pay from "@/views/theFog/room/Pay";

Vue.use(VueRouter)

const routes = [

  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: '登录',
    component:Login
  },
  {
    path: '/',
    name: '目录',
    component: Index,
    children:[
      {
        path: '/main',
        name: '首页',
        component: Main
      },
      {
        path: '/bill',
        name: '账单管理',
        component: Bill
      },
      {
        path: '/member',
        name: '会员管理',
        component: Member
      },
      {
        path: '/goods',
        name: '商品管理',
        component: Goods
      },

    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
