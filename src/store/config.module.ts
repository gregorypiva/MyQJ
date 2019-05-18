import {Config} from '@/config';

// tslint:disable: no-shadowed-variable
const state: Config = {
  all: {},
};

const actions = {
  init({ commit }: any, config: any) {
    commit('init', config);
  },
};

const mutations = {
  init(state: any, config: Config) {
    state.all = config;
  },
};

export const config = {
  namespaced: true,
  state,
  actions,
  mutations,
};
