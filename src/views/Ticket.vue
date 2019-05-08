<template>
  <div class="New">
    <v-container fluid class="pa-0 ma-0 mb-5">
      <v-layout row wrap>
        <v-flex text-xs-center xs12 my-4>
          <h3 class="white--text font-weight-medium">Smart Ticket</h3>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center v-if="loading">
        <v-flex xs12 class="mt-5" text-xs-center>
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            width="1"
          ></v-progress-circular>
        </v-flex>
        <v-flex xs12 class="mt-5" text-xs-center>
          Chargement du ticket.
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center v-else>
        <v-flex xs8 class="mt-3">
          <v-subheader>Votre Smart Ticket</v-subheader>
        </v-flex>
        <v-flex xs8 text-xs-center>
          <v-card dark color="primaryLight">
            <v-card-text class="px-0"><b>Ticket n° {{ticket.dem_id_demande}}</b></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs8 text-xs-center class="mt-3">
          <v-flex xs12 v-if="alert.message">
            <v-alert
              :value="true"
              color="error"
              outline
            >
              <b>{{alert.message}}</b>
            </v-alert>
          </v-flex>
          <v-flex xs12 v-else>
            Heure de présentation estimée<br/> aujourd'hui à <b>
            {{ticket.time}}</b>
          </v-flex>
        </v-flex>
        <v-flex xs8 text-xs-center class="mt-3">
          Pour venir <b>{{ticket.mot_libelle}}</b>
        </v-flex>
        <v-flex xs8 class="pa-0 ma-0" text-xs-center>
          <img :src="ticket.url"
            :alt="ticket.dem_id_demande"
          >
        </v-flex>
      </v-layout>
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
    ...mapActions('alert', ['error']),
  },
})
export default class Home extends Vue {
  private ticket = {code: 0};
  private loading = true;

  private async mounted() {
    if (isNaN(Number(this.$route.params.code)) || Number(this.$route.params.code) === 0) {
      this.$router.push(`/`);
    }
    this.ticket.code = Number(this.$route.params.code);

    // code: this.ticket.code
    const requestOptions = util.requestOptions({}, 'GET', (this as any).account.authorization);

    try {
      let response = await fetch(`/api/ticket/get?id=${this.ticket.code}`, requestOptions);
      response = await this.handleResponse(response);
      if ((response as any).length !== 1) { this.$router.push(`/`); }
      this.ticket = (response as any)[0];
      (this.ticket as any).url = 'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl='
        + (this.ticket as any).dem_id_demande
        + '&choe=UTF-8';
      const date = new Date((this.ticket as any).dem_date);
      const today = new Date();
      if (date.toDateString() !== today.toDateString()) {
        (this as any).error('Votre ticket a expiré');
      }
      (this.ticket as any).time = date.getHours()
        + ':'
        + (date.getMinutes() !== 0 ? date.getMinutes() : date.getMinutes())
        + '0';
      this.loading = false;
    } catch (e) {
      this.$router.push(`/`);
    }
  }

  private async handleResponse(response: any) {
    try {
      // let error = (data && data.message) || response.statusText;
      const text = await response.text();
      if (!response.ok) {
        if (response.status === 404) {
          return Promise.reject('Erreur lors de la validation, veuillez réessayer');
        }
        return Promise.reject(text);
      }
      const data = text && JSON.parse(text);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject('Erreur de connexion');
    }
  }
}
</script>
