<template>
  <div class="container">
    <div class="button-container">
      <button
        :class="[isSignUp ? 'unselected-form' : 'selected-form', 'button-form']"
        @click="signInForm"
      >
        Sign In
      </button>
      <button
        :class="[isSignUp ? 'selected-form' : 'unselected-form', 'button-form']"
        @click="signUpForm"
      >
        Sign Up
      </button>
    </div>
    <Form @submit="handleAuth" :validation-schema="schema">
      <h2 class="heading-text">{{ HeadingText }}</h2>

      <div v-if="isSignUp" class="personal-info">
        <Field
          type="text"
          name="first_name"
          placeholder="Name"
          required
          class="personal"
        />
        <Field
          type="text"
          name="last_name"
          placeholder="Last Name"
          class="personal"
        />
      </div>

      <div class="form-control">
        <Field
          type="text"
          name="email"
          placeholder="Email"
          class="input-text"
        />
      </div>

      <div class="form-control">
        <Field
          type="password"
          name="password"
          placeholder="Password"
          class="input-text"
        />
      </div>
      <ErrorMessage name="first_name" class="error-feedback" />
      <ErrorMessage name="last_name" class="error-feedback" />
      <ErrorMessage name="email" class="error-feedback" />
      <ErrorMessage name="password" class="error-feedback" />
      <input
        type="submit"
        :value="[isSignUp ? 'Create Account' : 'Login']"
        class="btn"
      />
      <div class="form-group">
        <div v-if="message" class="alert error-feedback" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Auth",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      HeadingText: "Login",
      isSignUp: false,
      schema: this.yupValidate("signin"),
      message: "",
      loading: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/product");
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/product");
    }
  },
  methods: {
    handleAuth(user) {
      if (!this.isSignUp) {
        this.loading = true;
        this.$store.dispatch("auth/login", user).then(
          () => {
            this.$router.push("/product");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      } else {
        this.message = "";
        this.successful = false;
        this.loading = true;
        this.$store.dispatch("auth/register", user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
            this.$router.push("/product");
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
            this.loading = false;
          }
        );
      }
    },
    yupValidate(type) {
      if (type === "signup") {
        return yup.object().shape({
          first_name: yup
            .string()
            .required("- First name is required!")
            .min(3, "- First name Must be at least 3 characters!")
            .max(20, "- First name Must be maximum 20 characters!"),
          last_name: yup
            .string()
            .required("- Last name is required!")
            .min(3, "- Last name Must be at least 3 characters!")
            .max(20, "- Last name Must be maximum 20 characters!"),
          email: yup
            .string()
            .required("- Email is required!")
            .email("- Email is invalid!")
            .max(50, "- Email must be maximum 50 characters!"),
          password: yup
            .string()
            .required("- Password is required!")
            .min(3, "- Password must be at least 3 characters!")
            .max(40, "- Password must be maximum 40 characters!"),
        });
      } else {
        return yup.object().shape({
          email: yup
            .string()
            .required("- Email is required!")
            .email("- Email is invalid!")
            .max(50, "- Email must be maximum 50 characters!"),
          password: yup
            .string()
            .required("- Password is required!")
            .min(3, "- Password must be at least 3 characters!")
            .max(40, "- Password must be maximum 40 characters!"),
        });
      }
    },
    signInForm() {
      this.isSignUp = false;
      this.HeadingText = "Login";
      this.schema = this.yupValidate("signin");
    },
    signUpForm() {
      this.isSignUp = true;
      this.HeadingText = "Sign Up";
      this.schema = this.yupValidate("signup");
    },
  },
};
</script>

<style scoped>
.container {
  margin-left: auto;
  margin-right: auto;
  place-self: center;
  margin-top: 40px;
  width: calc(450px + (100% - 450px) / 12);
  border: 1 solid blue;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
}
.button-form {
  width: 50%;
  font-size: 1.2rem;
  border: 0px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}
.selected-form {
  background: #fff;
}
.unselected-form {
  background: #bbbbbb;
}
form {
  display: flex;
  flex-direction: column;
  width: 65%;
  margin-left: auto;
  margin-right: auto;
}
.input-text {
  width: -webkit-fill-available;
  margin-bottom: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  background-color: #f7f7f7;
  border: 1px solid #e6e6e6;
  font-size: 1.1rem;
}
.personal {
  width: 45%;
  margin-bottom: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  background-color: #f7f7f7;
  border: 1px solid #e6e6e6;
  font-size: 1.1rem;
}
.personal-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.btn {
  margin-top: 20px;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  width: -webkit-fill-available;
  background-color: #f64747;
  color: wheat;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1.2rem;
  border: 0;
  padding: 1rem;
  cursor: pointer;
}
.heading-text {
  align-self: center;
  font-weight: 700;
  margin-bottom: 20px;
  color: #777;
  cursor: default;
}
.error-feedback {
  color: #f44336;
  font-size: 0.8rem;
  line-height: 1.1rem;
  font-weight: 700;
}
.alert{
  margin-bottom: 30px;
  line-height: 2rem;
  font-size: 1rem;
}
</style>