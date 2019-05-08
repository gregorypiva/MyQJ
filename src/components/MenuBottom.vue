<template>
  <v-bottom-nav
    :active.sync="bottomNav"
    :value="ShowMenuBottom"
    fixed
    height="55"
    class="elevation-0"
    style="border-top: 1px solid #E0E0E0"
    color="#F5F5F5"
  > <!-- ou #616161 -->
    <v-btn
      flat
      value="RDV"
      color="primary"
      to="/"
    >
      <span class="caption">Rendez-vous</span>
      <v-icon small>event</v-icon>
    </v-btn>
<!-- 
    <v-btn
      flat
      value="search"
      color="primaryDark"
    >
      <span class="caption">Rechercher</span>
      <v-icon small>search</v-icon>
    </v-btn> -->

    <v-btn
      flat
      value="newticket"
      color="primary"
      to="/new"
    >
      <span class="caption">Nouveau Ticket</span>
      <v-icon small>add_circle</v-icon>
    </v-btn>

    <v-btn 
      flat
      value="account"
      color="primary"
      to="/account"
    >
      <span class="caption">Mon Compte</span>
      <v-icon small>settings</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  props: {
    ShowMenuBottom: Boolean,
  },
})
export default class MenuBottom extends Vue {
  private bottomNav = '';
}
</script>

</script>
