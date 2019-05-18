<template>
  <v-flex class="text-xs-center">
    <v-menu nudge-bottom="40" left>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click.prevent>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile :to="`/ticket/${ticket.dem_id_demande}`">
          <v-list-tile-title>Voir le ticket</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="ticket.dem_statut === 'A'" @click="deleteDemande(ticket.dem_id_demande)">
          <v-list-tile-title>Annuler ma demande</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { util } from '@/services/util';
import { mapState, mapActions } from 'vuex';

@Component({
  props: {
    ticket: Object,
  },
  computed: {
    ...mapState({
      account: (state) => (state as any).account,
    }),
  },
  methods: {
    ...mapActions('alert', ['error']),
  },
})
export default class TicketMenu extends Vue {

  async deleteDemande(idDemande: number) {

    const requestOptions = util.requestOptions('POST',
    {
      idDemande,
      authorization: 'Bearer ' + (this as any).account.user.accessToken,
    });
    try {
      let response = await fetch(`/api/ticket/delete`, requestOptions);
      response = await util.handleResponse(response);
      this.$router.push(`/ticket/0`);
    } catch (e) {
      (this as any).error(e);
    }
  }
}
</script>
