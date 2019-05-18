<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12>
      <v-select
        :items="['Homme', 'Femme']"
        label="Sexe"
        name="sexe"
        :rules="[rules.required]"
        solo
      ></v-select>
    </v-flex>
    <v-flex xs6>
      <v-select
        :items="Array.from(Array(180).keys()).map(i => (i + 40) + ' cm')"
        label="Taille"
        name="size"
        :rules="[rules.requiredShort]"
        solo
      ></v-select>
    </v-flex>
    <v-flex xs6>
      <v-select
        :items="Array.from(Array(180).keys()).map(i => (i + 10) + ' kg')"
        label="Poids"
        name="poids"
        :rules="[rules.requiredShort]"
        solo
      ></v-select>
    </v-flex>
    <v-flex xs11>Date de naissance</v-flex>
    <v-flex xs4>
      <v-select
        :items="Array.from(Array(31).keys()).map(i => i + 1)"
        label="Jour"
        name="day"
        solo
        :rules="[rules.requiredShort]"
      ></v-select>
    </v-flex>
    <v-flex xs4>
      <v-select
        :items="['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']"
        label="Mois"
        name="month"
        solo
        :rules="[rules.requiredShort]"
      ></v-select>
    </v-flex>
    <v-flex xs4>
      <v-select
        :items="Array.from(Array(101).keys()).map(i => (new Date().getFullYear()-100) + i)"
        label="Année"
        name="year"
        solo
        :rules="[rules.requiredShort]"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        label="Adresse"
        name="adress"
        clearable
        :rules="[rules.required]"
        solo
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs5>
      <v-text-field
        label="CP"
        name="cp"
        clearable
        :rules="[rules.requiredShort]"
        solo
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs7>
      <v-text-field
        label="Ville"
        name="city"
        clearable
        :rules="[rules.requiredShort]"
        solo
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        label="Pays"
        name="country"
        clearable
        :rules="[rules.required]"
        solo
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        label="Téléphone"
        name="phone"
        clearable
        :rules="[rules.required]"
        solo
        required
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import {Rules} from '@/services';

@Component({
  props: {
    user: Object,
  },
})
export default class RegisterStepTwo extends Vue {
  rules = Rules;
}
</script>
