import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from "../pages/HomePage.vue"
import CalendarioPage from "../pages/CalendarioPage.vue"
import CursosPageVue from '../pages/CursosPage.vue';
import BibliotecaPageVue from '../pages/BibliotecaPage.vue';
import ForumPageVue from '../pages/ForumPage.vue';
import UsuariosPageVue from '../pages/UsuariosPage.vue';
import LoginViewVue from '../pages/LoginView.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: LoginViewVue
    },
    {
        path: '/',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/calendario',
        component: CalendarioPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/cursos',
        component: CursosPageVue,
        meta: { requiresAuth: true }
    },
    {
        path: '/library',
        component: BibliotecaPageVue,
        meta: { requiresAuth: true }
    },
    {
        path: '/forum',
        component: ForumPageVue,
        meta: { requiresAuth: true }
    },
    {
        path: '/users',
        component: UsuariosPageVue,
        meta: { requiresAuth: true }
    },
]

const router = new VueRouter({
    routes
});

export default router