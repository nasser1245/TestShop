<template>
  <div class="options-bar">
    <div class="add-new" v-if="!priviledge" @click="gotoAddProduct">
      <i class="fas fa-plus"></i>
    </div>
    <ul class="state-select">
      <li
        :class="[
          state === `${waiting}` ? 'selected-state' : '',
          'state state1',
        ]"
        :id="`${waiting}`"
        @click="changeState"
      >
        {{ waiting }}
      </li>
      <li
        :class="[
          state === `${accepted}` ? 'selected-state' : '',
          'state state2',
        ]"
        :id="`${accepted}`"
        @click="changeState"
      >
        {{ accepted }}
      </li>
      <li
        :class="[
          state === `${rejected}` ? 'selected-state' : '',
          'state state3',
        ]"
        :id="`${rejected}`"
        @click="changeState"
      >
        {{ rejected }}
      </li>
    </ul>
  </div>
</template>

<script>
import constants from "@/constants";
export default {
  name: "OptionSelector",
  computed: {
    priviledge() {
      return this.$store.state.auth.user.priviledge;
    },
    state() {
      return this.$store.state.productState.pstate;
    },
  },
  data() {
    return {
      waiting: constants.waiting,
      accepted: constants.accepted,
      rejected: constants.rejected,
    };
  },
  methods: {
    changeState(e) {
      const newState = e.target.id;
      this.$store.commit("productState/stateChange", newState);
    },
    gotoAddProduct(){
      this.$store.commit("productState/underEditProduct", {editMode: false, inof: null});
      this.$router.push('AddProduct');
    }
  },
};
</script>

<style scoped>
.options-bar {
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.add-new {
  color: aliceblue;
  border-radius: 50%;
  align-self: auto;
  justify-content: auto;
  width: 60px;
  height: 60px;
  background: #1c4966;
  cursor: pointer;
  border: none;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%),
    0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
  font-size: 1.2rem;
  text-align: center;
  vertical-align: middle;
  line-height: 60px;
  position: fixed;
  right: 3vw;
  bottom: 3vh;
}
.fas {
  color: aliceblue;
}
.state-select {
  display: flex;
  flex-direction: row;
  padding: 0;
}
.state {
  list-style-type: none;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  color: rgb(135, 150, 165);
  border: 1px solid #2389da;
  background: white;
  line-height: 3rem;
  width: 150px;
  text-align: center;
  font-weight: 700;
}
.state:hover {
  cursor: pointer;
  background: rgb(229, 232, 236);
}
.selected-state {
  color: rgb(0, 127, 255);
  background: rgb(226, 237, 248);
}
.state1 {
  border-radius: 5px 0 0 5px;
  border-right: 1px solid #7297d6;
  /* border: 1px solid ; */
}
.state3 {
  border-radius: 0 5px 5px 0;
  border-left: 1px solid #7297d6;
}
</style>