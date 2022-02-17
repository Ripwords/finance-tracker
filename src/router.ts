import { createWebHistory, createRouter } from '@ionic/vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/menu/login'
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/menu/login'
  },
  {
    path: '/menu',
    component: () => import('./pages/Menu.vue'),
    children: [
      {
        path: 'home',
        component: () => import('./pages/Home.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'register',
        component: () => import('./pages/Register.vue')
      },
      {
        path: 'login',
        component: () => import('./pages/Login.vue')
      },
      {
        path: 'statistics',
        component: () => import('./pages/Statistics.vue'),
      },
      {
        path: 'categories',
        component: () => import('./pages/Categories.vue'),
      },
      {
        path: 'accounts',
        component: () => import('./pages/Accounts.vue'),
      },
      {
        path: 'settings',
        component: () => import('./pages/Settings.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const getUser = () => {
    return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(getAuth(), user => {
        removeListener()
        resolve(user)
      },
        reject
      )
    })
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getUser()) {
      if (to.path === '/menu/login') {
        next({
          path: '/menu/home'
        })
      } else {
        next()
      }
    } else {
      next({
        path: '/menu/login'
      })
    }
  } else {
    next()
  }
})

export default router