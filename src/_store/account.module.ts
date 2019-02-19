import { router } from '@/router';
import { userService } from '../_services';

// tslint:disable: no-shadowed-variable
const user = JSON.parse((localStorage as any).getItem('user'));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const actions = {
  login({ dispatch, commit }: any, { username, password }: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await userService.login(username, password);
        commit('loginSuccess', user);
        router.push('/');
      } catch (error) {
        commit('loginFailure', error);
        dispatch('alert/error', error, { root: true });
        reject();
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
        user = await userService.login(user.username, user.password);
        commit('registerSuccess', user);
        router.push('/');
      } catch (error) {
        commit('registerFailure', error);
        dispatch('alert/error', error, { root: true });
        reject();
      }
    });
  },
};

const mutations = {
  loginSuccess(state: any, user: any) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state: any) {
    state.status = {};
    state.user = null;
  },
  logout(state: any) {
    state.status = {};
    state.user = null;
  },
  registerSuccess(state: any, user: any) {
    state.status = { loggedIn: true };
    state.user = user;
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
