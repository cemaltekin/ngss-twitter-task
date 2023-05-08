import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import DashboardView from '../views/DashboardView'
import UserDetailsView from '../views/UserDetailsView'
import LastTweetsView from '../views/LastTweetsView'
import { getAuth } from 'firebase/auth'
// routelar title değişiklikleri de yapıldı
const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true,
      title: 'Twitter Task || Dashboard'
    }
  },
  {
    path: '/user-details',
    name: 'user-details',
    component: UserDetailsView,
    meta: {
      requiresAuth: true,
      title: 'Twitter Task || User Detail'

    }
  },
  {
    path: '/last-tweets',
    name: 'last-tweets',
    component: LastTweetsView,
    meta: {
      requiresAuth: true,
      title: 'Twitter Task || Last Tweets'

    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false,
      title: 'Twitter Task || Login'

    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      requiresAuth: false,
      title: 'Twitter Task || Register'
    }
  },
  // diğer tüm routelar anasayfaya gidecek şekilde ayarlandı giriş yapılmadıysa logine gidecek
  {
    path: '/:catchAll(.*)',
    redirect: (to) => {
      const auth = getAuth()
      const currentUser = auth.currentUser
      const user = localStorage.getItem('user')
      if (currentUser || user) {
        return '/'
      } else {
        return '/login'
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const currentUser = auth.currentUser
  const user = localStorage.getItem('user')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const title = to.meta.title
  if (requiresAuth && !currentUser && !user) {
    next('/login')
  } else if ((currentUser || user) && (to.path === '/login' || to.path === '/register')) {
    next('/')
  } else {
    next()
  }
  if (title) {
    document.title = title
  }
  next()
})

export default router
