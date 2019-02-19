<template>
  <div class="Home">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex text-xs-center xs12>
          <h3 class="white--text font-weight-medium">Mes Rendez-vous</h3>
        </v-flex>
        <v-flex xs12 text-xs-center class="mt-3">
          <v-btn-toggle 
            class="elevation-2" 
            v-model="toggle"
          >
              <v-btn
                flat
                class="rdv-btn"
                active-class="primary--text rdv-btn-active"
              >
                0 Rendez-vous prévus
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn
                flat
                class="rdv-btn"
                active-class="primary--text rdv-btn-active"
              >
                0 Rendez-vous passés
              </v-btn>
            </v-btn-toggle>
        </v-flex>
        <v-flex
          v-if="toggle === 0"
          xs12
          class="mt-5 caption darken3--text"
          text-xs-center
        >
          Vous n'avez aucun rendez-vous prévu.
        
          <v-btn
            outline
            color="primary"
            class="rdv-btn"
            to="/search"
          >
            Prendre rendez-vous en ligne
          </v-btn>
        </v-flex>
        <v-flex
          v-else
          xs12
          class="mt-5 caption darken3--text"
          text-xs-center
        >
          Vous n'avez aucun rendez-vous.
        </v-flex>
      </v-layout>
    </v-container>
    <menuBottom/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomePage from '@/components/HomePage.vue'; // @ is an alias to /src
import MenuBottom from '@/components/MenuBottom.vue'; // @ is an alias to /src

@Component({
  components: {
    MenuBottom,
  },
})
export default class Home extends Vue {
  private date = new Date().toISOString().substr(0, 10);
  private modal = false;
  private rating = 3;
  private toggle = 0;
}
</script>

<style scoped>
  .home {
    background-color: #b3d4fc;
  }
  .gradiant-button {
  border-radius: 0;
  }
  .card--flex-toolbar {
    margin-top: -48px;
  }
  .toolbar-bg {
  background: #7474BF; 
  background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
  background: linear-gradient(to bottom, #348AC7 1%, #7474BF 100%);
  }
  .date-plus {
    color: #757575;
    text-decoration: none;
  }
  .rdv-btn {
    text-transform: none;
  }
  .rdv-btn-active {
    opacity: 1;
  }

</style>
