import {createRouter,createWebHistory} from 'vue-router'



const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },

    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Main.vue'),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'main',
                component: () => import('@/views/Home.vue')
            },
            {
                path: 'booking',
                name: 'booking',
                component: () => import('@/views/Booking.vue')
            },
            {
                path: 'student',
                name: 'student',
                component: () => import('@/views/Student.vue')
            },
            {
                path: 'faculty',
                name: 'faculty',
                component: () => import('@/views/Faculty.vue')
            },
            {
                path: 'country',
                name: 'country',
                component: () => import('@/views/Country.vue')
            },
            {
                path: 'principal',
                name: 'principal',
                component: () => import('@/views/Principal.vue')
            },
            {
                path: 'apartment',
                name: 'apartment',
                component: () => import('@/views/Apartment.vue')
            },
            {
                path: 'building',
                name: 'building',
                component: () => import('@/views/Building.vue')
            },
            {
                path: 'building',
                name: 'building',
                component: () => import('@/views/Building.vue')
            },
            {
                path: 'privilege',
                name: 'privilege',
                component: () => import('@/views/Privilege.vue')
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes

})



// router.beforeEach((to, from) => {
    
// })



export default router