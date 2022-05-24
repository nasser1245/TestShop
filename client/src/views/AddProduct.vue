<template>
  <div>
    <Heading title="Test Shop" />
    <div class="add-product-form">
      <AddEditProduct />
    </div>
  </div>
</template>

<script>
import AddEditProduct from "@/components/AddEditProduct.vue";
import Heading from "../components/Header.vue";

export default {
  name: "AddProduct",
  components: {
    AddEditProduct,
    Heading,
  },
};
</script>

<style scoped>
.add-product-form {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
  border: 1px solid blue;
  border-radius: 8px;
  padding: 30px;
}
</style>