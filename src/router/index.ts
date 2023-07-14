import { createRouter, createWebHistory } from 'vue-router'
import Pokemon from '../views/Pokemon.vue'
import Pokedex from '../views/Pokedex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Pokedex',
      component: Pokedex
    },
    {
      path: '/pokemon/:id',
      name: 'Pokemon',
      component: Pokemon
    }
  ]
})

export default router
