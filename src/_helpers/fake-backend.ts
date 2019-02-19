// array in local storage for registered users
const users = JSON.parse((localStorage as any).getItem('users')) || [];

// tslint:disable: no-shadowed-variable
export function configureFakeBackend() {
  const realFetch = window.fetch;
  window.fetch = (url, opts) => {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {

        // authenticate
        if ((url as any).endsWith('/users/authenticate') && (opts as any).method === 'POST') {
          // get parameters from post request
          const params = JSON.parse((opts as any).body);
          // find if any user matches login credentials
          const filteredUsers = users.filter((user: any) => {
            return user.username === params.username && user.password === params.password;
          });
          if (filteredUsers.length) {
              // if login details are valid return user details and fake jwt token
              const user = filteredUsers[0];
              const responseJson = {
                  id: user.id,
                  username: user.username,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  token: 'fake-jwt-token',
              };
              resolve(({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) } as any));
          } else {
              // else return error
              reject('Email ou mot de passe incorrect.');
          }
          return;
        }

        // register user
        if ((url as any).endsWith('/users/register') && (opts as any).method === 'POST') {
          // get new user object from post body
          const newUser = JSON.parse((opts as any).body);
          // validation
          const duplicateUser = users.filter((user: any) => user.username === newUser.username).length;
          if (duplicateUser) {
              reject('L\'adresse email ' + newUser.username + ' est déjà utilisée.');
              return;
          }
          // save new user
          newUser.id = users.length ? Math.max(...users.map((user: any) => user.id)) + 1 : 1;
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          // respond 200 OK
          resolve(({ ok: true, text: () => Promise.resolve() } as any));
          return;
      }

        // pass through any requests not handled above
        realFetch(url, opts).then((response) => resolve(response));

        }, 500);
    });
  };
}
