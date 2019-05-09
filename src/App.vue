<template>
  <v-app :class="getBackground">
    <v-content>
      <router-view></router-view>
      <menuBottom :ShowMenuBottom='getMenuBottom' />
    </v-content>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>{{config.name}} - Version {{config.version}} &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import MenuBottom from '@/components/MenuBottom.vue'; // @ is an alias to /src
import { util } from './_helpers';

@Component({
  components: {
    MenuBottom,
  },
  computed: {
    ...mapState({
      alert: (state) => (state as any).alert,
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear',
    }),
  },
})
export default class Home extends Vue {
  private ShowMenuBottom = false;
  private config = {};

  get getBackground() {
    return (this.$route.meta.background || 'short');
  }

  get getMenuBottom() {
    return this.$route.meta.menuBottom;
  }

  private async mounted() {
    const requestOptions = util.requestOptions({}, 'GET');
    try {
      const response = await fetch(`/api/config`, requestOptions);
      this.config = await util.handleResponse(response);
    } catch (e) {
      this.config = {};
    }
  }

  @Watch('$route')
  private onChildChanged(val: string, oldVal: string) {
    (this as any).clearAlert();
  }
}
</script>

<style scoped>
  .full {
    background: #0e384d;
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #01141D,  #022434);
/* background: #4b6cb7;
background: -webkit-linear-gradient(to top, #182848, #4b6cb7);
background: linear-gradient(to top, #b0c8f7, #4b6cb7);
background: #4b6cb7;
background: -webkit-linear-gradient(to top, #182848, #4b6cb7);
background: linear-gradient(to top, #182848, #4b6cb7); */
  }

  .mid {
    background: #0e384d;
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #022434 1%,  #01141D 250px, #FFF 250px);
  }

  .short {
    background: #0e384d;
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #022434 1%,  #01141D 76px, #FFF 76px);
  }

  .background-full {
    background-color: #FAFAFA;
  }
  .background-mid {
    background: #0e384d;
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #01141D 1%,  #022434 250px, #FFF 250px);
  }
  .background-short {
    background: #0e384d; 
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #01141D 1%, #022434 76px, #FFF 76px);
  }
</style>
