import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../views/SignIn';
import Home from '../views/Home';
import AddProduct from '../views/AddProduct';
const routes = [
  {
    path: "/signin",
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product",
    name: "Product",
    component: Home,
  },
  {
    path: "/addproduct",
    name: "AddProduct",
    component: AddProduct,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;