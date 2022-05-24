<template>
  <div class="header">
    <router-link to="/" class="header-title" tag="h1">{{ title }}</router-link>
    <router-link
      to="/signin"
      v-if="!loggedIn"
      class="login"
      :key="$route.path"
      tag="button"
      >Login or Sign Up</router-link
    >
    <div v-if="loggedIn">
      <span class="welcome-message"
        >Welcome {{first_name}}</span
      >
      <router-link to="/product" class="dashboard" tag="button"
        >Dashboard</router-link>
      <a class="nav-link" @click.prevent="logOut">Log Out</a>
    </div>
  </div>
</template>

  <script>
export default {
  name: "Header",
  props: {
    title: String,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    first_name() {
      return this.$store.state.auth.user.first_name;
    },
    last_name() {
      return this.$store.state.auth.user.last_name;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>


<style scoped>
.header {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #2155cd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
    margin-bottom: 20px;
}

.login {
  align-self: center;
  margin-right: 2rem;
  background-color: #f44336;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1.2rem;
  text-decoration: none;
  color: #333;
  border: 0;
  padding: 1rem;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
  cursor: pointer;
}

.header-title {
  font-size: 2rem;
  font-weight: 900;
  color: whitesmoke;
  align-self: center;
  margin-left: 30px;
  text-decoration: none;
  cursor: pointer;
}

h1 {
  font-weight: 900;
  color: aliceblue;
  margin-left: 2rem;
}
.welcome-message {
  color: #f5f5f5;
  font-size: 1.2rem;
  font-weight: 700;
  margin-right: 40px;
}
.dashboard {
  background: rgb(251, 177, 23);
  color: #3f3f3f;
  border-radius: 4px;
  padding: 15px;
  margin-right: 20px;
  margin-left: 20px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);

}
.nav-link {
  background: #8b0000;
  color: #e2e5de;
  border-radius: 4px;
  padding: 15px;
  font-weight: 700;
  margin-left: 10px;
  margin-right: 40px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
}
@media only screen and (max-width: 800px) {
  .welcome-message {
    display: none;
  }
  .header-title{
    font-size: 1.2rem;
    font-weight: 700;
  }
  .nav-link, .dashboard{
    padding: 10px;
  }
  .nav-link{
    margin-right: 20px;
  }
}
</style>
