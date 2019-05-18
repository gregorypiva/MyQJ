<template>
  <v-layout row wrap>
    <v-flex text-xs-center xs12 my-4>
      <h3 class="white--text font-weight-medium">Mon compte</h3>
    </v-flex>
    <v-flex xs12 class="mt-5">
      <v-card>
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="ml-3">Changer mon mot de passe</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="ml-3">Gérer mes notifications</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    
    <v-flex xs12 class="mt-5">
      <v-card>
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="ml-3">Contactez-nous</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="ml-4">FAQ</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="ml-4">Mentions légales</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>

  <v-flex xs12 class="mt-5">
      <v-card>
      <v-list class="pa-0">
      <v-list-tile to="/login">
        <v-list-tile-content>
          <v-list-tile-title class="text-xs-center darkRed--text">Se déconnecter</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>
