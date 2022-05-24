import { createStore } from "vuex";
import { auth } from "./auth.module";
import { productState } from './product.module';
const store = createStore({
  modules: {
    auth,
    productState
  },
});

export default store;
