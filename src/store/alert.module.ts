const state = {
  type: null,
  message: null,
};

// tslint:disable: no-shadowed-variable
const actions = {
  success({ commit }: any, message: any) {
      commit('success', message);
  },
  error({ commit }: any, message: any) {
      commit('error', message);
  },
  clear({ commit }: any, message: any) {
      commit('success', message);
  },
};

const mutations = {
  success(state: any, message: any) {
      state.type = 'success';
      state.message = message;
  },
  error(state: any, message: any) {
      state.type = 'error';
      state.message = message;
  },
  clear(state: any) {
      state.type = null;
      state.message = null;
  },
};

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations,
};
