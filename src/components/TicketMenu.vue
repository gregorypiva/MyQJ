<template>
  <div class="text-xs-center">
    <v-menu nudge-bottom="40" left>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click.prevent>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile :to="`/ticket/${demande.dem_id_demande}`">
          <v-list-tile-title>Voir le ticket</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="deleteDemande(demande.dem_id_demande)">
          <v-list-tile-title>Annuler ma demande</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TicketMenu from '@/components/TicketMenu.vue';
import { util } from '../_helpers';
import { mapState, mapActions } from 'vuex';

@Component({
  components: {
    TicketMenu,
  },
  props: {
    demande: Object,
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
export default class Ticket extends Vue {

  private async deleteDemande(idDemande: number) {

    const requestOptions = util.requestOptions({
      idDemande,
      authorization: 'Bearer ' + (this as any).account.user.accessToken,
    }, 'POST');
    try {
      let response = await fetch(`/api/ticket/delete`, requestOptions);
      response = await this.handleResponse(response);
      this.$router.push(`/ticket/${idDemande}`);
    } catch (e) {
      (this as any).error(e);
    }
  }

  private async handleResponse(response: any) {
    try {
      // let error = (data && data.message) || response.statusText;
      const text = await response.text();
      if (!response.ok) {
        if (response.status === 404) {
          return Promise.reject('Impossible d\'annuler votre demande.');
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
