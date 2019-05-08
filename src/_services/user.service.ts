import { util } from '../_helpers';

export const userService = {
  login,
  logout,
  register,
};

function login(username: string, password: string) {
  const requestOptions = util.requestOptions({ username, password }, 'POST');

  return fetch(`/api/login`, requestOptions)
    .then(util.handleResponse)
    .then((user: any) => {
      // login successful if there's a jwt token in the response
      if (user.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          return user;
      } else {
        return Promise.reject('Impossible de se connecter.');
      }
    }).catch((error) => Promise.reject(error));
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function register(user: any) {
  const requestOptions = util.requestOptions(user, 'POST');
  return fetch(`/api/register`, requestOptions)
    .then(util.handleResponse)
    .catch((error) => Promise.reject(error));
}
