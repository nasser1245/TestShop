<template>
  <form v-on:submit.prevent="onSaveChange" class="add-form">
    <div id="show-error" v-if="form.state === 'Rejected'" class="error">
      <p class="revision">Revision comment:</p>
      <p class="error-text">{{ form.revisionComment || "" }}</p>
    </div>
    <div class="form-control">
      <label for="productName">Product name</label>
      <input
        type="text"
        required
        name="productName"
        v-model="form.productName"
        placeholder="Add name of the product"
      />
    </div>
    <div class="image-upload">
      <p class="image-label">
        {{
          form.productImage
            ? "Click on image to choose another"
            : "Select an image for product"
        }}
      </p>
      <label for="file-input">
        <img v-if="form.productImage" :src="form.productImage" />
      </label>
      <input
        id="file-input"
        type="file"
        name="img"
        accept="image/png, image/jpeg, image/jpg"
        :class="!form.productImage ? 'show-dialog' : 'hide-dialog'"
        @change="getImage"
      />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea
        type="text"
        name="description"
        rows="4"
        cols="30"
        v-model="form.description"
        placeholder="Description"
        required
      />
    </div>
    <div class="form-control">
      <label for="price">Price</label>
      <input
        type="text"
        name="price"
        v-model="form.price"
        placeholder="Price"
        required
      />
    </div>
    <input
      type="submit"
      name="btn-submit"
      :class="[isUpdate === true ? 'edit' : 'add', 'btn']"
      :value="[isUpdate === true ? 'Edit Product' : 'Add Product']"
    />
  </form>
</template>

<script>
import productService from "@/services/product.service";
export default {
  name: "AddEditProduct",
  props: {
    product: Object,
  },
  data() {
    return {
      form: {
        state: String,
        product_id: String,
        productName: String,
        productImage: String,
        description: String,
        price: String,
        editMode: Boolean,
        revisionComment: String,
      },
      isUpdate: Boolean,
    };
  },
  created() {
    this.isUpdate = this.$store.state.productState.observedProduct.editMode;
    if (this.isUpdate) {
      this.form.state = this.$store.state.productState.pstate;
      this.form.product_id =
        this.$store.state.productState.observedProduct.info.product_id || "";
      this.form.productName =
        this.$store.state.productState.observedProduct.info.name || "";
      this.form.productImage =
        this.$store.state.productState.observedProduct.info.image_payload || "";
      this.form.description =
        this.$store.state.productState.observedProduct.info.description || "";
      this.form.price =
        this.$store.state.productState.observedProduct.info.price || "";
      this.form.revisionComment =
        this.$store.state.productState.observedProduct.info.comment || "";
    } else {
      this.form.productName = "";
      this.form.productImage = "";
      this.form.description = "";
      this.form.price = "";
      this.form.revisionComment = "";
    }
  },
  methods: {
    async onSaveChange(e) {
      var r = /^[0-9]+(\.[0-9][0-9])?$/;
      if (!r.test(this.form.price)) {
        alert(
          "Please enter a valid price value. Correct values likes 25 or 59.99 in format"
        );
      } else {
        const params = {
          product_id: this.form.product_id,
          name: this.form.productName,
          image_payload: this.form.productImage,
          description: this.form.description,
          price: this.form.price,
          user_email: this.$store.state.auth.user.email,
          user_first_name: this.$store.state.auth.user.first_name,
          user_last_name: this.$store.state.auth.user.last_name,
        };
        // isCreate
        if (!this.isUpdate) {
          await productService
            .createProduct(params)
            .then((res) => {
              alert(
                "Successfully created product. It will added to waiting queue."
              );
              e.target.reset();
              this.$store.commit("productState/underEditProduct", null);
              this.$router.push("Product");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // isUpdates
          productService
            .updateProduct(params)
            .then((res) => {
              alert(
                "Successfully updated product. It will added to waiting queue."
              );
              e.target.reset();
              this.$store.commit("productState/underEditProduct", null);
              this.$router.push("Product");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    getImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = (e) => {
        this.form.productImage = e.target.result;
      };
    },
  },
};
</script>
<style scoped>
.error {
  color: tomato;
  font-style: italic;
  font-weight: 300;
}
.error-text {
  padding: 10px;
  line-height: 0;
}
.hide {
  display: none;
}
label,
.image-label {
  display: block;
  margin-top: 20px;
}
textarea,
input {
  width: -webkit-fill-available;
  font-size: 1.2rem;
  padding-left: 7px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #f7f7f7;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  margin-top: 5px;
}
img {
  width: 400px;
  margin-left: 50%;
  transform: translate(-50%, 0);
  border: 4px dashed cadetblue;
}
.btn {
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
  font-weight: 700;
  width: -webkit-fill-available;
  border-radius: 4px;
  font-size: 1.2rem;
  border: 0;
  padding: 1rem;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
}
.btn:hover,
img {
  cursor: pointer;
}
.edit {
  background-color: #fda50f;
}
.add {
  background-color: #4be178;
}
.show-dialog {
  display: inherit;
}
.hide-dialog {
  display: none;
}
</style>
