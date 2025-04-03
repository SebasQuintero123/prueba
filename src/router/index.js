

import { createRouter, createWebHistory } from 'vue-router';

// Importa tus componentes de cada "página"
import MenuLayout from '@/layouts/MenuLayout.vue';
import PaginaDragones from '../views/PaginaDragones.vue'; 
import PaginaRick from '../views/PaginaRick'; // Asegúrate de que el nombre sea correcto
import PerfilSebas from '../views/PerfilSebas.vue';

const routes = [
  { path: '/', component: MenuLayout, children: [
    {
      path: '',
      component: PaginaRick,
    },
    {
      path: 'dragones',
      component: PaginaDragones,
    },
    {
      path: 'perfil',
      component: PerfilSebas,
    },

  ],}
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;