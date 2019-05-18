import { router } from '@/router';
import { userService } from '@/services';

// tslint:disable: no-shadowed-variable
const user = JSON.parse((localStorage as any).getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user, authorization: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + user.accessToken,
    }}
    : { status: {}, user: null, authorization: null };

const actions = {
  login({ dispatch, commit }: any, { username, password }: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await userService.login(username, password);
        commit('loginSuccess', user);
        router.push('/');
      } catch (error) {
        commit('loginFailure', error);
        reject(dispatch('alert/error', error, { root: true }));
      }
    });
  },
  logout({ commit }: any) {
    userService.logout();
    commit('logout');
  },
  register({ dispatch, commit }: any, user: any) {
    return new Promise(async (resolve, reject) => {
      try {
        await userService.register(user);
        router.push('/');
      } catch (error) {
        commit('registerFailure', error);
        reject(dispatch('alert/error', error, { root: true }));
      }
    });
  },
};

const mutations = {
  loginSuccess(state: any, user: any) {
    state.status = { loggedIn: true };
    state.user = user;
    state.authorization = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + user.accessToken,
    };
  },
  loginFailure(state: any) {
    state.status = {};
    state.user = null;
    state.authorization = null;
  },
  logout(state: any) {
    state.status = {};
    state.user = null;
    state.authorization = null;
  },
  registerFailure(state: any, error: any) {
    state.status = {};
  },
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations,
};
