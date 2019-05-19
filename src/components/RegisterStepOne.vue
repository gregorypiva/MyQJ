<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs11>
      <v-text-field
        v-model="user.lastname"
        label="Nom"
        name="lastName"
        clearable
        :rules="[rules.required]"
        solo
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs11>
      <v-text-field
        v-model="user.firstname"
        label="Prénom"
        name="firstName"
        clearable
        :rules="[rules.required]"
        solo
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs11>
      <v-text-field
        v-model="user.username"
        label="Adresse email"
        name="username"
        clearable
        :rules="[rules.required, rules.email]"
        solo
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs11>
      <v-text-field
        v-model="user.password"
        name="password"
        label="Mot de passe"
        clearable
        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text' : 'password'"
        :rules="[rules.required, rules.min]"
        solo
        required
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Rules} from '@/services';

@Component({
  props: {
    user: Object,
  },
})
export default class RegisterStepOne extends Vue {

  showPassword = false;
  rules = Rules;

}
</script>
