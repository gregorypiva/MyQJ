<template>
  <v-card :to="`/ticket/${ticket.dem_id_demande}`">
    <v-layout row fill-height>
      <v-flex xs2 sm1 ma-2>
        <v-card
          color="primary"
          dark
          elevation="1"
          min-height="100%"
          max-height="100%"
        >
          <v-card-text class="pt-2 pb-0 text-xs-center">
            {{day(ticket.dem_date)}}
          </v-card-text>
          <v-card-text class="pt-0 pb-2 text-xs-center">
            {{month(ticket.dem_date)}}
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs10 align-self-start>
      <v-card-title class="pt-2 pb-0">
        <b>Ticket n° {{ticket.dem_id_demande}}</b>
      </v-card-title>
      <v-card-text class="pt-2">
        {{motif(ticket.dem_id_motif)}}
      </v-card-text>
      </v-flex>
      <TicketMenu :ticket="ticket" />
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TicketMenu from '@/components/TicketMenu.vue';
import { util } from '@/services/util';

@Component({
  components: {
    TicketMenu,
  },
  props: {
    ticket: Object,
    motifs: Array,
  },
})
export default class TicketList extends Vue {
  day(value: Date) {
    const date = new Date(value);
    return date.getDate();
  }

  month(value: Date) {
    const date = new Date(value);
    const month = new Intl.DateTimeFormat('fr-FR', { month: 'long'}).format(date);
    return month.toUpperCase().substr(0, 3);
  }

  motif(idMotif: number) {
    if ((this as any).motifs.length < 1) {
      return;
    }
    return (this as any).motifs[idMotif - 1].mot_libelle;
  }
}
</script>
