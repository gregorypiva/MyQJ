import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import fr from 'vuetify/src/locale/fr';

Vue.use(Vuetify, {
  theme: {
    primary: '#0E384D',
    primaryDark: '#01141D',
    primaryLight: '#436F84',
    secondary: '#7A2711',
    secondaryLight: '#A44A32',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    darken1: '#757575',
    darken3: '#424242',
    darken4: '#212121',
    backgroundlight: '#FAFAFA',
    darkRed: '#B22222',
  },
  iconfont: 'md',
  lang: {
    locales: { fr },
    current: 'fr',
  },
});
