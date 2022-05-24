import http from '../http-common';
class AuthService {
  login(user) {
    return http
      .post('/auth/signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(user) {
    return http.post('/auth/signup', {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });;
  }
}

export default new AuthService();