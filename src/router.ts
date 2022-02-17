import { createWebHistory, createRouter } from '@ionic/vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('./pages/Home.vue')
  },
  {
    path: '/main',
    component: () => import('./pages/Main.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    component: () => import('./pages/Register.vue')
  },
  {
    path: '/login',
    component: () => import('./pages/Login.vue')
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
      next()
    } else {
      alert("You must be logged in to view this page.")
      next({
        path: '/home'
      })
    }
  } else {
    next()
  }
})

export default router