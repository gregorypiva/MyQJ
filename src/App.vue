<template>
  <v-app :class="getBackground">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
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
  private background = '';

  get getBackground() {
    const backgroundMidPages = ['/login', '/register', '/recover'];
    const backgroundShortPages = ['/'];
    if (backgroundMidPages.includes(this.$route.path) === true) {
      return 'background';
    } else if (backgroundShortPages.includes(this.$route.path) === true) {
      return 'background-short';
    }
  }

  @Watch('$route')
  private onChildChanged(val: string, oldVal: string) {
    (this as any).clearAlert();
  }
}
</script>

<style scoped>
  .background {
  background: #7474BF; 
  background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
  background: linear-gradient(to bottom, #348AC7 1%, #7474BF 250px, #FFF 250px);
  }
  .background-full {
    background-color: #FAFAFA;
  }
  .background-short {
    background: #7474BF; 
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #348AC7 1%, #7474BF 76px, #FFF 76px);
  }
</style>
