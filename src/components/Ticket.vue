<template>
    <v-card :to="`/ticket/${demande.dem_id_demande}`">
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
              {{day(demande.dem_date)}}
            </v-card-text>
            <v-card-text class="pt-0 pb-2 text-xs-center">
              {{month(demande.dem_date)}}
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs10 align-self-start>
        <v-card-title class="pt-2 pb-0">
          <b>Ticket n° {{demande.dem_id_demande}}</b>
        </v-card-title>
        <v-card-text class="pt-2">
          {{motif(demande.dem_id_motif)}}
        </v-card-text>
        </v-flex>
        <v-flex>
          <TicketMenu :demande="demande" />
        </v-flex>  
      </v-layout>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TicketMenu from '@/components/TicketMenu.vue';

@Component({
  components: {
    TicketMenu,
  },
  props: {
    demande: Object,
    motifs: Array,
  },
})
export default class Ticket extends Vue {
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
    return (this as any).motifs[idMotif - 1].mot_libelle;
  }
}
</script>
