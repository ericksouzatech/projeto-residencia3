import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from "../pages/HomePage.vue"
import CalendarioPage from "../pages/CalendarioPage.vue"
import CursosPageVue from '../pages/CursosPage.vue';
import BibliotecaPageVue from '../pages/BibliotecaPage.vue';
import ForumPageVue from '../pages/ForumPage.vue';
import UsuariosPageVue from '../pages/UsuariosPage.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/calendario',
        component: CalendarioPage
    },
    {
        path: '/cursos',
        component: CursosPageVue
    },
    {
        path: '/library',
        component: BibliotecaPageVue
    },
    {
        path: '/forum',
        component: ForumPageVue
    },
    {
        path: '/users',
        component: UsuariosPageVue
    },
]

const router = new VueRouter({
    routes
})

export default router