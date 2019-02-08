import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from './views/Home.vue';
import LoginComponent from './views/Login.vue';

Vue.use(Router);

export const router = new Router({
  // mode: 'history',
  routes: [
    {
        path: '/login',
        name: 'login',
        component: LoginComponent,
    },
    {
        path: '/',
        name: 'home',
        component: HomeComponent,
        meta: { requiresAuth: true },
    },
    // cualquier otra ruta, se redirige a home
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  const logueado = localStorage.getItem('usuario');

  if (to.name === 'login' && logueado) {
    return next('/');
  } else if (!logueado && to.matched.some((x) => x.meta.requiresAuth)) {
      return next({ path: '/login', query: { redirect: to.fullPath }});
  }
  next();
});
