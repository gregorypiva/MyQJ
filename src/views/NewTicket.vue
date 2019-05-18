<template>
  <div class="New">
    <v-container fluid class="pa-0 ma-0 mb-5">
      <v-layout row wrap>
        <v-flex text-xs-center xs12 my-4>
          <h3 class="white--text font-weight-medium">Smart Ticket</h3>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs8 class="mt-3">
          <v-subheader>Que voulez-vous faire ?</v-subheader>
          <v-card>
            <v-list class="pa-0">
              <v-list-tile
                class="py-2"
                v-for="(item, i) in motifs"
                :key="i"
                @click="setMotif(item.mot_id_motif)"
                :class="item.mot_id_motif === ticket.motif ? 'secondaryLight' : ''"
              >
                <v-list-tile-content>
                  <v-list-tile-title class="ml-3">{{item.mot_libelle}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </v-list>
          </v-card>
        </v-flex>

        <v-flex xs8 class="mt-3">
          <v-subheader>A quel moment ?</v-subheader>
          <v-card>
            <v-card-text class="pb-0">
              <v-radio-group v-model="ticket.type" row>
                <v-radio
                  class="mb-4"
                  label="Au plus tôt"
                  value="fast"
                  @click="ticket.time='08:00'; ticket.type='fast'"
                  color="secondaryLight"
                ></v-radio>
                <v-radio value="timeto" color="secondaryLight">
                  <template v-slot:label>
                    <v-select
                      :items="items"
                      label="à partir de"
                      class="ml-1"
                      v-model="ticket.time"
                    ></v-select>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 v-if="alert.message" text-xs-center red--text class="mt-3">
          {{alert.message}}
        </v-flex>
      </v-layout>
      <v-layout justify-center align-content-center>
        <v-flex text-xs-center xs8 mt-3 mb-5>
          <v-btn
            block
            large
            class="elevation-1 mb-3"
            color="#7A2711"
            dark
            @click="newTicket"
          ><span>Voir mon Smart Ticket</span></v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { util } from '@/services/util';

@Component({
  computed: {
    ...mapState({
      alert: (state) => (state as any).alert,
      account: (state) => (state as any).account,
    }),
  },
  methods: {
    ...mapActions('alert', ['error', 'clear']),
  },
})
export default class NewTicket extends Vue {

  private motifs: object = [];

  private items = [
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
  ];

  private ticket = {
    type: 'fast',
    motif: null,
    time: '08:00',
  };

  private setMotif(value: number) {
    (this.ticket as any).motif = value;
  }

  private async mounted() {
    const requestOptions = util.requestOptions('GET', {}, (this as any).account.authorization);
    let motifs = await fetch(`/api/motif/getAll`, requestOptions);
    motifs = await util.handleResponse(motifs);
    this.motifs = motifs;
  }

  private async newTicket() {
    if (this.ticket.motif && this.ticket.type && this.ticket.time) {
      (this as any).clear();
      const requestOptions = util.requestOptions('POST',
      {
        demande: {
          motif: this.ticket.motif,
          type: this.ticket.type,
          time: this.ticket.time,
        },
        authorization: 'Bearer ' + (this as any).account.user.accessToken,
      });
      try {
        let response = await fetch(`/api/ticket/generate`, requestOptions);
        response = await util.handleResponse(response);
        this.$router.push(`/ticket/${(response as any).insertId}`);
      } catch (e) {
        (this as any).error(e);
      }
    }
  }
}
</script>
