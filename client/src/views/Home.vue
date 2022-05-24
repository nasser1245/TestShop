<template>
  <div>
    <Heading title="Test Shop" />
    <OptionsSelector v-if="loggedInDashboard" />
    <Products />
    <router-view></router-view>
  </div>
</template>

<script>
import Heading from "../components/Header.vue";
import Products from "../components/Products.vue";
import OptionsSelector from "@/components/OptionsSelector.vue";
export default {
  name: "Home",
  components: {
    Heading,
    Products,
    OptionsSelector,
  },
  computed:{
    loggedInDashboard(){
      return this.$store.state.auth.status.loggedIn && this.$route.name === 'Product';
    }
  }
};
</script>