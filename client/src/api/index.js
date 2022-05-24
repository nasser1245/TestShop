import axios from 'axios';

const url = 'http://localhost:5000/api';

export const getAcceptedProducts = () => axios.get(url);
export const postProduct = (product) => axios.post(url, product);
// import axios from 'axios';
// https://api.coindesk.com/v1/bpi/currentprice.json
// const API = axios.create({ baseURL: 'http://localhost:5000' });
// // const API = axios.create({ baseURL: 'https://api.coindesk.com/v1/bpi/currentprice.json' });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//   }
//   return req;
// });
// export const getProducts = () =>API.get('/');
// export const fetchPosts = () => API.get('/posts');
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);

// export const signIn = (formData) => API.post('/user/signin', formData);
// export const signUp = (formData) => API.post('/user/signup', formData);
