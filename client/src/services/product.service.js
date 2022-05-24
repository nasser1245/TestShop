import http from '../http-common';
import authHeader from './authHeader';
class productService {
  async getAcceptedProducts() {
    let result = null;
    await http({ method: "GET", url: "/" })
      .then(res => { result = res; })
      .catch(error => console.log(error));
    return result ? result.data.rows : null;
  }

  async getUserProductsByState(state, email) {
    let result = null;
    await http({ method: "GET", url: '/seller', params: { state, email }, headers: authHeader() })
      .then(res => { result = res })
      .catch(error => console.log(error));
    return result ? result.data.rows : null;
  }

  async createProduct(data) {
    let result = null;
    await http({
      method: "POST", url: '/seller', data: data, headers: authHeader()
    })
      .then(res => { result = res; })
      .catch(error => console.log(error));
    return result;
  }

  async updateProduct(data) {
    let result = null;
    await http({
      method: "PUT", url: '/seller', data: data, headers: authHeader()
    })
      .then(res => { result = res; })
      .catch(error => console.log(error));
    return result;
  }

  async deleteProduct(data) {
    let result = null;
    await http({
      method: "DELETE", url: '/seller', data: data, headers: authHeader()
    })
      .then(res => { result = res; })
      .catch(error => console.log(error));
    return result;
  }

  async getAllProductsByState(state) {
    let result = null;
    await http({ method: "GET", url: '/admin', params: { state }, headers: authHeader() })
      .then(res => { result = res; })
      .catch(error => console.log(error));
    return result ? result.data.rows : null;
  }

  async updateProductState(product_id, state, comment) {
    let result = null;
    http({ method: "PUT", url: '/admin', data: { product_id, state, comment }, headers: authHeader() })
      .then(res => { result = res; })
      .catch(error => console.log(error));
    return result;
  }

}
export default new productService();