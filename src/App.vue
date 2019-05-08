<template>
  <v-app :class="getBackground">
    <v-content>
      <router-view></router-view>
      <menuBottom :ShowMenuBottom='getMenuBottom' />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import MenuBottom from '@/components/MenuBottom.vue'; // @ is an alias to /src

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

  get getBackground() {
    return 'background-' + (this.$route.meta.background || 'short');
  }

  get getMenuBottom() {
    return this.$route.meta.menuBottom;
  }

  @Watch('$route')
  private onChildChanged(val: string, oldVal: string) {
    (this as any).clearAlert();
  }
}
</script>

<style scoped>
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
