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
        <v-list-tile v-if="ticket.dem_statut === 'A'" @click="dialog = true">
          <v-list-tile-title>Annuler ma demande</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <TicketDeleteConfirm :ticket="ticket" :dialog="dialog" @confirmation="deleteConfirm()" />
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { util } from '@/services/util';
import { mapState, mapActions } from 'vuex';
import TicketDeleteConfirm from '@/components/TicketDeleteConfirm.vue';

@Component({
  components: {
    TicketDeleteConfirm,
  },
  props: {
    ticket: Object,
  },
  methods: {
    deleteConfirm() {
      (this as any).dialog = false;
    },
  },
})
export default class TicketMenu extends Vue {
  dialog: boolean = false;
}
</script>
