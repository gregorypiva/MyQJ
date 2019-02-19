<template>
  <v-bottom-nav
    :active.sync="bottomNav"
    :value="true"
    fixed
    height="45"
    class="elevation-0"
    style="border-top: 1px solid #E0E0E0"
    color="#F5F5F5"
  > <!-- ou #616161 -->
    <v-btn
      flat
      value="RDV"
      color="primaryDark"
    >
      <span class="caption">Rendez-vous</span>
      <v-icon small>event</v-icon>
    </v-btn>

    <v-btn
      flat
      value="search"
      color="primaryDark"
    >
      <span class="caption">Rechercher</span>
      <v-icon small>search</v-icon>
    </v-btn>

    <v-btn
      flat
      value="favorites"
      color="primaryDark"
    >
      <span class="caption">Favoris</span>
      <v-icon small>favorite</v-icon>
    </v-btn>

    <v-btn 
      flat
      value="account"
      color="primaryDark"
    >
      <span class="caption">Mon Compte</span>
      <v-icon small>settings</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
  export default {
    data() {
      return {
        bottomNav: 'RDV',
      };
    },
  };
</script>
