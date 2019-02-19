import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import fr from 'vuetify/src/locale/fr';

Vue.use(Vuetify, {
  theme: {
    primary: '7474BF',
    secondary: '#348AC7',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    darken3: '#424242',
    darken4: '#212121',
  },
  iconfont: 'md',
  lang: {
    locales: { fr },
    current: 'fr',
  },
});
