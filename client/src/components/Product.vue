<template>
  <div>
    <div class="item">
      <h5 class="item-name">{{ product.name }}</h5>
      <img
        class="item-image"
        :src="product.image_payload"
        :alt="`${product.name}`"
      />
      <p class="item-description">
        {{ product.description.split(" ").slice(0, 50).join(" ") + " ..." }}
      </p>
      <div class="other-info">
        <span class="item-price">Price:&nbsp;{{ product.price }}</span>
        <span class="seller"
          >Seller:&nbsp;{{
            `${product.user_first_name} ${product.user_last_name}`
          }}</span
        >
      </div>
      <div class="reject-reason" v-if="showComment">
        <p class="label red-notice">Reject reason:</p>
        <p class="reject-text">{{ product.comment }}</p>
      </div>
      <button
        type="submit"
        class="btn-accept btn"
        @click="onAccept"
        v-if="showAccept"
      >
        Accept
      </button>
      <button
        type="submit"
        class="btn-accept btn"
        @click="onEdit"
        v-if="showDeleteEdit"
      >
        Edit
      </button>
      <form @submit.prevent="onReject" v-if="showReject" class="add-form">
        <div class="form-control">
          <label for="comment">Revision comment:</label>
          <textarea
            type="text"
            name="comment"
            rows="4"
            cols="30"
            placeholder="Comment"
          />
          <input type="submit" value="Reject" class="btn-reject btn" />
        </div>
      </form>
      <button
        type="submit"
        class="btn-reject btn"
        @click="onDelete"
        v-if="showDeleteEdit"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import constants from "@/constants";
import productService from "@/services/product.service";
export default {
  name: "Product",
  props: {
    product: Object,
  },
  methods: {
    onAccept() {
      productService
        .updateProductState(this.product.product_id, constants.accepted, "")
        .then((res) => {
          this.$emit("update", this.product.product_id);
        });
    },
    onReject(e) {
      productService
        .updateProductState(
          this.product.product_id,
          constants.rejected,
          e.target[0].value
        )
        .then((res) => {
          this.$emit("update", this.product.product_id);
        });
    },
    onDelete(e) {
      if (confirm(`Are you sure to delete ${this.product.name}?`)) {
        productService
          .deleteProduct({ product_id: this.product.product_id })
          .then((res) => {
            this.$emit("update", this.product.product_id);
          });
      }
    },
    onEdit(e) {
      const changeStore = { editMode: true, info: this.product };
      this.$store.commit("productState/underEditProduct", changeStore);
      this.$router.push({ name: "AddProduct" });
    },
  },
  computed: {
    isProductRoute() {
      return this.$route.name === "Product";
    },
    priviledge() {
      return this.$store.state.auth.status.loggedIn
        ? this.$store.state.auth.user.priviledge
        : false;
    },
    showReject() {
      return (
        this.isProductRoute &&
        this.priviledge &&
        this.product.state !== constants.rejected
      );
    },
    showAccept() {
      return (
        this.isProductRoute &&
        this.priviledge &&
        this.product.state !== constants.accepted
      );
    },
    showComment() {
      return (
        this.isProductRoute &&
        this.priviledge &&
        this.product.state === constants.rejected
      );
    },
    showDeleteEdit() {
      return this.isProductRoute && this.priviledge === false;
    },
  },
};
</script>

<style scoped>
.item {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
}

.item-name {
  font-size: 1.2rem;
  align-self: center;
}

.item-image {
  border-radius: 3px;
  width: fit-content;
  height: 350px;
  align-self: center;
  max-width: 90%;
}

.item-description {
  font-weight: 300;
  text-align: initial;
}
.other-info {
  display: flex;
  justify-content: space-between;
}
.item-price {
  bottom: 3px;
  align-self: flex-start;
  font-weight: 700;
  font-size: 1.2rem;
}
.seller {
  font-size: 0.9rem;
}
.error {
  color: tomato;
  font-style: italic;
  font-weight: 300;
}
.error-text {
  padding: 10px;
  line-height: 0;
}
.revision {
  font-style: normal;
  font-weight: 700;
  line-height: 0;
}
textarea {
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

.btn {
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
  width: -webkit-fill-available;
  color: wheat;
  border-radius: 4px;
  font-weight: 700;
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
.btn-accept {
  background-color: #1e5631;
  margin-bottom: 15px;
}
.btn-reject {
  background-color: #c62828;
}
label {
  font-weight: 700;
}
.red-notice {
  margin-top: 30px;
  color: #d32f2f;
  line-height: 0;
}
.reject-text {
  color: #48494b;
  font-weight: 700;
  line-height: 0.5rem;
}
</style>

