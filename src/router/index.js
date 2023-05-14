// Composables
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import axios from 'axios'
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'LogIn',
        name: 'LogIn',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/ConnectionPage.vue'),
      },
      {
        path: 'Register',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/RegisterPage.vue'),
      },
      {
        path: 'DashBoard',
        name: 'DashBoard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        
        component: () => import(/* webpackChunkName: "home" */ '@/views/DashBoard.vue'),
      },
      {
        path: 'Home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'Account',
        name: 'Account',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Account.vue'),
      },
      {
        path: 'Teams',
        name: 'Teams',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Teams.vue'),
      },
      {
        path: 'Recover',
        name: 'Recover',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Recover.vue'),
      },
      {
        path: '',
        redirect: 'LogIn'
      },
      {
        path: '*',
        redirect: 'LogIn'
      },
      {
        path:'Active/:id',
        redirect:(to)=>{
          axios.get('https://backendfortasksquad13.onrender.com/api/edit-users/'+to.params.id).then(async (r) =>{
            
              if(r.data._id === to.params.id){
                r.data.status =true
                store.state.auth.status = true
                axios.post('https://backendfortasksquad13.onrender.com/api/update-users/' + r.data._id, r.data)
              }
          })
          return {path:'LogIn'}
        }
      },
      {
        path:'getback/:id',
        redirect:(to)=>{
          axios.get('https://backendfortasksquad13.onrender.com/api/edit-users/'+to.params.id).then(r =>{
                store.state.auth.recover = true
                store.state.auth.userrecoved = r.data._id
          })
          return {path:'Recover'}
        }
      }
    ],
    

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
