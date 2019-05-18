<template>
  <div class="Home">
    <v-layout row wrap>
      <v-flex text-xs-center xs12>
        <h3 class="white--text font-weight-medium">Mes Tickets</h3>
      </v-flex>
      <v-flex xs12 text-xs-center class="mt-3">
        <v-btn-toggle 
          class="elevation-2" 
          v-model="toggle"
          mandatory
        >
          <v-btn
            flat
            class="rdv-btn"
            active-class="primary--text rdv-btn-active"
          >
            {{nbTicketWaiting}} tickets à venir
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn
            flat
            class="rdv-btn"
            active-class="primary--text rdv-btn-active"
          >
            {{nbTicketValide}} tickets passés
          </v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>
    <v-layout v-if="alert.message">
      <v-flex
        xs12
        class="mt-5 caption red--text"
        text-xs-center
      >
        {{alert.message}}
      </v-flex>
    </v-layout>
    <v-layout v-else-if="loading">
      <v-flex xs12 class="mt-5" text-xs-center>
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          width="1"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <div v-else-if="toggle === 0">
      <v-layout>
        <v-flex
          xs12
          class="mt-5 caption darken3--text"
          text-xs-center
          v-if="nbTicketWaiting < 1"
        >
          Vous n'avez aucun rendez-vous prévu.
        </v-flex>
        <v-flex mt-3 xs12 v-else>
          <v-flex
            v-for="(element, index) in ticketWaiting"
            :key="index"
            xs12 mt-2
          >
            <TicketList :ticket="element" :motifs="motifs" />
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 text-xs-center mt-3>
          <v-btn
            outline
            color="primary"
            class="rdv-btn"
            to="/new"
          >
            Générer un ticket
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
    <div v-else>
      <v-layout>
        <v-flex
          xs12
          class="mt-5 caption darken3--text"
          text-xs-center
          v-if="nbTicketValide < 1"
        >
          Vous n'avez aucun rendez-vous.
        </v-flex>
        <v-flex mt-3 xs12 v-else>
          <v-flex
            v-for="(element, index) in ticketValide"
            :key="index"
            xs12 mt-2
          >
            <TicketList :ticket="element" :motifs="motifs" />
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 text-xs-center mt-3>
          <v-btn
            outline
            color="primary"
            class="rdv-btn"
            to="/new"
          >
            Générer un ticket
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import {Ticket} from '@/interface/Ticket';
import TicketList from '@/components/TicketList.vue'; // @ is an alias to /src

@Component({
  components: {
    TicketList,
  },
  computed: {
    ...mapState({
      alert: (state) => (state as any).alert,
      account: (state) => (state as any).account,
    }),
  },
  methods: {
    ...mapActions({ alertError: 'alert/error' }),
  },
})
export default class Home extends Vue {
  toggle = 0;
  motifs: any = [];
  tickets: any = [];
  loading = true;

  private async mounted() {
    try {
      // Récupération des tickets
      const tickets = new Ticket();
      await tickets.setList((this as any).account.authorization);
      this.tickets = tickets.getList;

    // Récupération des motifs
      await tickets.setMotifs((this as any).account.authorization);
      this.motifs = tickets.getMotifs;

      // Arrêt du loader
      this.loading = false;
    } catch (e) {
      (this as any).alertError(e);
    }
  }

  get nbTicketWaiting() {
    return this.tickets.filter((v: any) => v.dem_statut === 'A').length;
  }

  get ticketWaiting() {
    return this.tickets.filter((v: any) => v.dem_statut === 'A');
  }

  get nbTicketValide() {
    return this.tickets.filter((v: any) => v.dem_statut === 'E').length;
  }

  get ticketValide() {
    return this.tickets.filter((v: any) => v.dem_statut === 'E');
  }

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
