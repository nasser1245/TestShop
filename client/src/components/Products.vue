<template>
  <div>
    <div v-if="showProduct" class="content">
      <div :key="product.product_id" v-for="product in newProducts">
        <Product :product="product" @update="updateProducts" />
      </div>
    </div>
    <div v-else>
      <h1>Sorry! There is nothing to show😔</h1>
    </div>
  </div>
</template>

<script>
import Product from "./Product.vue";
import productService from "@/services/product.service";

export default {
  components: { Product },
  name: "Products",
  data() {
    return {
      newProducts: Array,
    };
  },
  methods: {
    updateProducts: function (id) {
      this.newProducts = this.newProducts.filter(
        (product) => product.product_id != id
      );
    },
  },
  watch: {
    products(newp, oldp) {
      
      this.$forceUpdate();
    },
  },
  computed: {
    showProduct(){
      return this.newProducts?.length > 0; 
    },
    async products() {
      const loggedIn = this.$store.state.auth.status.loggedIn;
      let priviledge = null;
      let state = null;
      let email = null;
      if (loggedIn) {
        priviledge = this.$store.state.auth.user.priviledge;
        state = this.$store.state.productState.pstate;
        email = this.$store.state.auth.user.email;
      }
      if (!loggedIn || this.$route.name === 'Home') {
        productService
          .getAcceptedProducts()
          .then((res) => {
            this.newProducts = res;
          })
          .catch((error) => {
            console.log(error);
            this.newProducts = null;
          });
      } else {
        if (priviledge === true) {
          await productService
            .getAllProductsByState(state)
            .then((res) => {
              this.newProducts = res;
            })
            .catch((error) => {
              console.log(error);
              this.newProducts = null;
            });
        } else {
          productService
            .getUserProductsByState(state, email)
            .then((res) => {
              this.newProducts = res;
            })
            .catch((error) => {
              console.log(error);
              this.newProducts = null;
            });
        }
      }
    },
  },
};
</script>

<style scope>
.content {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 400px));
  gap: 30px;
}
h1 {
  color: #424242;
  margin: auto;
  text-align: center;
  margin-top: 100px;
}
</style>
