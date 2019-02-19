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
    const backgroundPages = ['/login', '/register', '/recover'];
    return (backgroundPages.includes(this.$route.path) === true) ? 'background' : '';
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
</style>
