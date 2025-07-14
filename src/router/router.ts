import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router';
import Login from "../Pages/Auth/Login.vue";
import Register from "@/Pages/Auth/Register.vue";
import Dashboard from "@/Pages/Dashboard.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Login,
        meta: {title: 'Login'}
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {title: 'Registro'},
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {title: 'Painel Inicial', requiresAuth: true}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const authToken = localStorage.getItem('authToken');

    if (to.name === 'Home' && authToken) {
        next({ name: 'Dashboard' });
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!authToken) {
            next({ name: 'Home' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router

router.afterEach((to) => {
    const defaultTitle = 'Gedu';
    const title = typeof to.meta?.title === 'string' ? to.meta.title : defaultTitle;
    document.title = title;
})