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
            <v-card-text class="px-0"><b>Ticket n° {{ticket.dem_numticket}}</b></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs8 text-xs-center class="mt-3">
          <v-flex xs12 v-if="alert.message">
            <v-alert
              :value="true"
              color="error"
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
        <v-flex xs8 v-if="ticket.dem_statut === 'A'">
          <v-btn
            color="error"
            outline
            block
            @click="dialog = true"
          >Annuler ma demande</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <TicketDeleteConfirm :ticket="ticket" :dialog="dialog" @confirmation="deleteConfirm()" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { util } from '@/services/util';
import {Ticket} from '@/interface/Ticket';
import TicketDeleteConfirm from '@/components/TicketDeleteConfirm.vue';

@Component({
  components: {
    TicketDeleteConfirm,
  },
  computed: {
    ...mapState({
      alert: (state) => (state as any).alert,
      account: (state) => (state as any).account,
    }),
  },
  methods: {
    ...mapActions('alert', ['error']),
    deleteConfirm() {
      (this as any).dialog = false;
    },
  },
})
export default class Home extends Vue {
  ticket: any = {code: 0};
  loading = true;
  dialog: boolean = false;

  async mounted() {
    // On vérifie que l'url contient bien un paramètre de type number
    if (isNaN(Number(this.$route.params.code)) || Number(this.$route.params.code) === 0) {
      this.$router.push(`/`);
      return;
    }
    this.ticket.code = Number(this.$route.params.code);

    try {
      // Récupération du ticket
      const ticket = new Ticket();
      await ticket.setTicket((this as any).account.authorization, this.ticket.code);
      this.ticket = ticket.getTicket;

      // Génération du code barre
      this.ticket.url = 'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl='
        + this.ticket.dem_id_demande
        + '&choe=UTF-8';

      // On converti en date
      this.ticket.dem_date = new Date(this.ticket.dem_date);

      // Si le ticket n'a pas le statut A, considéré comme expiré
      if (this.ticket.dem_statut !== 'A') {
        (this as any).error('Votre ticket a expiré');
      }

      // On récupère l'heure prévu de présentation
      this.ticket.time = (this.ticket.dem_date.getHours() < 10 ? '0' : '')
        + this.ticket.dem_date.getHours()
        + ':'
        + (this.ticket.dem_date.getMinutes() < 10 ? '0' : '')
        + this.ticket.dem_date.getMinutes();

      // Arrêt du loader
      this.loading = false;

    } catch (e) {
      this.$router.push(`/`);
    }
  }
}
</script>
