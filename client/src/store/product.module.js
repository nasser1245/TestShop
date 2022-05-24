import { string } from 'yup';
import constants from '../constants';
export const productState = {
  namespaced: true,
  state() {
    return {
      pstate: constants.accepted,
      observedProduct: {
        editMode: false,
        info: {
          product_id: String,
          name: String,
          image_payload: String,
          description: String,
          price: String,
          comment: String
        }
      }
    }
  },
  mutations: {
    stateChange(state, newState) {
      state.pstate = newState
    },
    underEditProduct(state, editingValue) {
      state.observedProduct = editingValue;
    }
  }
};