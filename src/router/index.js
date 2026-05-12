import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Solutions from '../views/Solutions.vue'
import SolutionDetail from '../views/SolutionDetail.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Admin from '../views/Admin.vue'
import AdminLogin from '../views/AdminLogin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/solutions',
    name: 'Solutions',
    component: Solutions
  },
  {
    path: '/solutions/:id',
    name: 'SolutionDetail',
    component: SolutionDetail
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router