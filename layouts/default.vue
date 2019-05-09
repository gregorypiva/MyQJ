<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app></v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>MyQJ - Version 1.1.0 &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<style scoped>
  .full {
    background-color: #FAFAFA;
  }
  .mid {
    background: #0e384d;
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #01141D 1%,  #022434 250px, #FFF 250px);
  }
  .short {
    background: #0e384d; 
    background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
    background: linear-gradient(to bottom, #01141D 1%, #022434 76px, #FFF 76px);
  }
</style>

