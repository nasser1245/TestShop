import axios from 'axios';

const url = 'http://localhost:5000/api';

export const getAcceptedProducts = () => axios.get(url);
export const postProduct = (product) => axios.post(url, product);

