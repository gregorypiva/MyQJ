<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12>
      <v-select
        :items="sexeItems"
        :items-text="text"
        :items-value="value"
        v-model="user.sexe"
        label="Sexe"
        name="sexe"
        :rules="[rules.required]"
        solo
      ></v-select>
    </v-flex>
    <v-flex xs6>
      <v-select
        :items="sizeItems"
        :items-text="text"
        :items-value="value"
        v-model="user.size"
        label="Taille"
        name="size"
        :rules="[rules.requiredShort]"
        solo
      ></v-select>
    </v-flex>
    <v-flex xs6>
      <v-select
        :items="poidsItems"
        :items-text="text"
        :items-value="value"
        v-model="user.poids"
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
        v-model="user.day"
        label="Jour"
        name="day"
        solo
        :rules="[rules.requiredShort]"
      ></v-select>
    </v-flex>
    <v-flex xs4>
      <v-select
        :items="monthItems"
        :items-text="text"
        :item-value="value"
        v-model="user.month"
        label="Mois"
        name="month"
        solo
        :rules="[rules.requiredShort]"
      ></v-select>
    </v-flex>
    <v-flex xs4>
      <v-select
        :items="Array.from(Array(101).keys()).map(i => (new Date().getFullYear()-100) + i)"
        v-model="user.year"
        label="Année"
        name="year"
        solo
        :rules="[rules.requiredShort]"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        v-model="user.adress"
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
        v-model="user.cp"
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
        v-model="user.city"
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
        v-model="user.country"
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
        v-model="user.phone"
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

  sexeItems = [
    { text: 'Homme', value: 'H' },
    { text: 'Femme', value: 'F' },
  ];

  sizeIitems = [
    { text: 'Homme', value: 'H' },
  ];

  monthItems = [
    { text: 'Janvier', value: '01' },
    { text: 'Février', value: '02' },
    { text: 'Mars', value: '03' },
    { text: 'Avril', value: '04' },
    { text: 'Mai', value: '05' },
    { text: 'Juin', value: '06' },
    { text: 'Juillet', value: '07' },
    { text: 'Août', value: '08' },
    { text: 'Septembre', value: '09' },
    { text: 'Octobre', value: '10' },
    { text: 'Novembre', value: '11' },
    { text: 'Décembre', value: '12' },
  ];

  get sizeItem() {
    const items = [];
    for (let i = 40; i < 220; i++) {
      items.push({ text: i + ' cm', value: i });
    }
    return items;
  }

  get poidsItem() {
    const items = [];
    for (let i = 10; i < 200; i++) {
      items.push({ text: i + ' kg', value: i });
    }
    return items;
  }
}
</script>
