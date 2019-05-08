<template>
  <div class="Home">
    <v-container fluid>
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
                {{tickets.waiting.length}} tickets à venir
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn
                flat
                class="rdv-btn"
                active-class="primary--text rdv-btn-active"
              >
                {{tickets.valide.length}} tickets passés
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
      <div v-else-if="toggle === 0">
        <v-layout>
          <v-flex
            xs12
            class="mt-5 caption darken3--text"
            text-xs-center
            v-if="tickets.waiting.length < 1"
          >
            Vous n'avez aucun rendez-vous prévu.
          </v-flex>
          <v-flex mt-3 xs12 v-else>
            <v-flex
              v-for="(element, index) in tickets.waiting"
              :key="index"
              xs12 mt-2
            >
              <v-card>
                <v-layout row align-center fill-height>
                  <v-flex xs2 sm1 ma-2>
                    <v-card
                      color="primary"
                      dark
                      elevation="1"
                      min-height="100%"
                      max-height="100%"
                    >
                      <v-card-text class="pt-2 pb-0 text-xs-center">
                        {{day(element.dem_date)}}
                      </v-card-text>
                      <v-card-text class="pt-0 pb-2 text-xs-center">
                        {{month(element.dem_date)}}
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs6>
                  <v-card-title class="pt-2 pb-0">
                    <b>Ticket n° {{element.dem_id_demande}}</b>
                  </v-card-title>
                  <v-card-text class="pt-2">
                    {{motif(element.dem_id_motif)}}
                  </v-card-text>
                  </v-flex>
                  <v-flex xs3 align-end justify-end>
                    <v-btn small outline color="primary"
                    @click="$router.push(`/ticket/${element.dem_id_demande}`)"
                    >Voir</v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
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
            v-if="tickets.valide.length < 1"
          >
            Vous n'avez aucun rendez-vous.
          </v-flex>
          <v-flex mt-3 xs12 v-else>
            <v-flex
              v-for="(element, index) in tickets.valide"
              :key="index"
              xs12 mt-2
            >
              <v-card>
                <v-layout row align-center fill-height>
                  <v-flex xs2 sm1 ma-2>
                    <v-card
                      color="primary"
                      dark
                      elevation="1"
                      min-height="100%"
                      max-height="100%"
                    >
                      <v-card-text class="pt-2 pb-0 text-xs-center">
                        {{day(element.dem_date)}}
                      </v-card-text>
                      <v-card-text class="pt-0 pb-2 text-xs-center">
                        {{month(element.dem_date)}}
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs6>
                  <v-card-title class="pt-2 pb-0">
                    <b>Ticket n° {{element.dem_id_demande}}</b>
                  </v-card-title>
                  <v-card-text class="pt-2">
                    {{motif(element.dem_id_motif)}}
                  </v-card-text>
                  </v-flex>
                  <v-flex xs3 align-end justify-end>
                    <v-btn small outline color="primary"
                    @click="$router.push(`/ticket/${element.dem_id_demande}`)"
                    >Voir</v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
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
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { util } from '../_helpers';

@Component({
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
  private toggle = 0;
  private motifs: any;
  private tickets = {
    waiting: [],
    valide: [],
  };

  public async getMotifs() {
    const requestOptions = util.requestOptions({}, 'GET', (this as any).account.authorization);
    let motifs = await fetch(`/api/motif/getAll`, requestOptions);
    motifs = await util.handleResponse(motifs);
    return motifs;
  }

  public async getTickets() {
      const requestOptions = util.requestOptions({}, 'GET', (this as any).account.authorization);
      let tickets: any = await fetch(`/api/ticket/getAll`, requestOptions);
      tickets = await util.handleResponse(tickets);
      return {waiting: tickets.waiting, valide: tickets.valide};
  }

  private day(value: Date) {
    const date = new Date(value);
    return date.getDate();
  }

  private month(value: Date) {
    const date = new Date(value);
    const month = new Intl.DateTimeFormat('fr-FR', { month: 'long'}).format(date);
    return month.toUpperCase().substr(0, 3);
  }

  private motif(idMotif: number) {
    return this.motifs[idMotif - 1].mot_libelle;
  }

  private async mounted() {
    try {
      this.motifs = await this.getMotifs();
      this.tickets = await this.getTickets();
    } catch (e) {
      (this as any).alertError(`Impossible de charger les éléments,
        Veuillez réessayer.`);
    }
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
