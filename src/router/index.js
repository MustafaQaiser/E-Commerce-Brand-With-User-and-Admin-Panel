import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import LoginPage from '../components/user/LoginPage.vue';
import SignUp from '../components/register User/SignUp.vue';
import csvUploader from '../components/user/csvUploader.vue';
import csvDownloader from '../components/user/csvDownloader.vue';
import UsersPage from '../components/admin/UsersPage.vue';
import viewPage from '../components/admin/viewPage.vue';
import adminLogin from '../components/admin/adminLogin.vue';
import userView from '../components/user/userView.vue';
import UserDetailAdminSide from '../components/admin/UserDetailAdminSide.vue';
import orderPage from '../components/user/orderPage.vue';
import ProdcutViewPage from '../components/user/ProdcutViewPage.vue';
import viewOrder from '../components/user/viewOrder.vue';
import AdminSideViewOrder from '../components/admin/AdminSideViewOrder.vue';
import RedisDb from '../components/admin/RedisDb.vue';
viewOrder
const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//   },
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: adminLogin,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/csvUploader',
    name: 'csvUploader',
    component: csvUploader,
  },
  {
    path: '/csvDownloader',
    name: 'csvDownloader',
    component: csvDownloader,
  },
  {
    path: '/UsersPage',
    name: 'UsersPage',
    component: UsersPage,
  },
  {
    path: '/viewPage/:id',
    name: 'viewPage',
    component: viewPage,
  },
  {
    path: '/userView',
    name: 'userView',
    component: userView,
  },
  {
    path: '/UserDetailAdminSide/:id',
    name: 'UserDetailAdminSide',
    component: UserDetailAdminSide,
  },

  {
    path: '/AdminSideViewOrder/:id',
    name: 'AdminSideViewOrder',
    component: AdminSideViewOrder,
    props: (route) => ({ id: route.params.id }) // Define the props function
  }
,  
  {
    path: '/orderPage',
    name: 'orderPage',
    component: orderPage,
  },
  {
    path: '/viewOrder',
    name: 'viewOrder',
    component: viewOrder,
  },
  {
    path: '/RedisDb',
    name: 'RedisDb',
    component: RedisDb,
  },
  {
    path: '/productview',
    name: 'ProdcutViewPage',
    component: ProdcutViewPage,
  },

  
  // {
  //   path: '/editPage/:id',
  //   name: 'editPage',
  //   component: editPage,
    
  // }

  
  
  // Add more routes here if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
