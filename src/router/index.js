import Vue from 'vue'
import Router from 'vue-router'
import GetProduct from '@/components/GetProduct'
import SellProduct from '@/components/SellProduct'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/stock',
      name: 'GetProduct',
      component: GetProduct
    },
    {
      path: '/',
      name: 'SellProduct',
      component: SellProduct
    }
  ]
})
