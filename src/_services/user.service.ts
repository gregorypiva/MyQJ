// import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  register,
};

function login(username: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`http://localhost:8080/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // login successful if there's a jwt token in the response
      if (user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    }).catch((error) => Promise.reject(error));
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function register(user: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };
  return fetch(`http://localhost:8080/users/register`, requestOptions)
    .then(handleResponse)
    .catch((error) => Promise.reject(error));
}

function handleResponse(response: any) {
  return response.text().then((text: any) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              logout();
              location.reload(true);
          }
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      return data;
  }).catch((e: any) => Promise.reject('Erreur de connexion'));
}
