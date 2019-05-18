<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      max-width="100%"
      persistent
    >
      <v-card>
        <v-card-title class="headline">
          Voulez-vous vraiment annuler votre demande ?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="dialogChanged()"
          >
            Non
          </v-btn>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="deleteDemande(ticket.dem_id_demande)"
          >
            Oui
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { util } from '@/services/util';
import { mapState, mapActions } from 'vuex';

@Component({
  props: {
    ticket: Object,
    dialog: Boolean,
  },
  computed: {
    ...mapState({
      account: (state) => (state as any).account,
    }),
  },
  methods: {
    ...mapActions('alert', ['error']),
    dialogChanged() {
      this.$emit('confirmation', !(this as any).dialog);
    },
  },
})
export default class TicketDeleteConfirm extends Vue {

  async deleteDemande(idDemande: number) {

    const requestOptions = util.requestOptions('POST',
    {
      idDemande,
      authorization: 'Bearer ' + (this as any).account.user.accessToken,
    });
    try {
      let response = await fetch(`/api/ticket/delete`, requestOptions);
      response = await util.handleResponse(response);
      this.$router.push(`/reload`);
    } catch (e) {
      (this as any).error(e);
    }
  }
}
</script>
