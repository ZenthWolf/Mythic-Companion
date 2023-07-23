import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CampaignPage.vue') }]
  },

  {
    path: '/table',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/MeaningTable.vue') }]
  },

  {
    path: '/testground',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Playground.vue') }]
  },

  {
    path: '/journal',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Journaller.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
