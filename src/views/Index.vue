<template>
  <v-app :class="getBackground">
    <v-content>
      <v-container grid-list-xs>
        <router-view></router-view>
        <menuBottom :ShowMenuBottom='getMenuBottom' />
      </v-container>
    </v-content>
    <v-footer class="pa-3" color="rgba(255, 255, 255, 0)">
      <v-spacer></v-spacer>
      <div>
        {{config.name}} - Version {{config.version}} &copy; {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import MenuBottom from '@/components/MenuBottom.vue'; // @ is an alias to /src

@Component({
  components: {
    MenuBottom,
  },
  computed: {
    ...mapState({
      config: (state: any) => state.config.all,
    }),
  },
})
export default class Index extends Vue {

  get getBackground(): void {
    return (this.$route.meta.background || 'short');
  }

  get getMenuBottom() {
    return this.$route.meta.menuBottom;
  }
}
</script>


<style scoped>
  .full {
    background: #0e384d;
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #01141D,  #022434);
  }

  .mid {
    background: #0e384d;
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #022434 1%,  #01141D 250px, #FFF 250px);
/* 
background: #43cea2;
background: -webkit-linear-gradient(to right, #185a9d, #43cea2);
background: linear-gradient(to bottom, #185a9d 1%, #43cea2 260px, #FFF 260px); */
  }

  .short {
    background: #0e384d;
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #022434 1%,  #01141D 76px, #FFF 76px);
  }
</style>



