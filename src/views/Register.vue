<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-layout row wrap style="margin-top: 10px">
      <v-flex xs12 text-xs-center mb-3>
        <h1 class="white--text font-weight-light" style="letter-spacing: 5px">
          {{config.name}}
        </h1>
      </v-flex>
      <v-flex xs12 text-xs-center mb-3 mt-3>
        <h3 class="white--text font-weight-light">Inscription</h3>
      </v-flex>
    </v-layout>
    <!-- Formulaire étape 1 -->
    <registerStepOne :user="user" v-if="etape === 1" />
    <!-- Formulaire étape 2 -->
    <registerStepTwo :user="user" v-if="etape === 2" />
    <v-layout row wrap justify-center align-content-center>
      <v-flex v-if="alert.message" text-xs-center red--text>
        {{alert.message}}
      </v-flex>
      <v-flex text-xs-center xs11 v-if="etape === 1">
        <v-btn
          block
          large
          class="elevation-1 mb-3"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="validate()"
        >
          continuer
        </v-btn>
      </v-flex>
      <v-flex text-xs-center xs7 v-if="etape === 2">
        <v-btn
          block
          large
          class="elevation-1 mb-3"
          color="secondary"
          :loading="loading"
          :disabled="loading"
          @click="validate()"
        >
          Inscription
        </v-btn>
      </v-flex>
      <v-flex text-xs-center xs5 v-if="etape === 2">
        <v-btn
          large
          class="elevation-1 mb-3"
          color="primary"
          outline
          @click="etape = 1"
        >
          Retour
        </v-btn>
      </v-flex>
      <v-flex v-if="etape === 1" xs12 text-xs-center class="caption darken3--text">
        J'ai déjà un compte ? <router-link to="/login" style="text-decoration: none" class="darken4--text font-weight-bold">Se connecter</router-link>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import registerStepOne from '@/components/RegisterStepOne.vue';
import registerStepTwo from '@/components/RegisterStepTwo.vue';
import {User} from '@/interface/User';

@Component({
  components: {
    registerStepOne,
    registerStepTwo,
  },
  computed: {
    ...mapState({
      config: (state) => (state as any).config.all,
      alert: (state) => (state as any).alert,
    }),
  },
  methods: {
    ...mapActions('account', ['register']),
  },
})

export default class Register extends Vue {
  private user: User = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    day: '',
    month: '',
    year: '',
    sexe: '',
    size: '',
    poids: '',
    adress: '',
    cp: '',
    city: '',
    country: '',
    phone: '',
  };

  private etape = 1;
  private showPassword = false;
  private loader = 'loading';
  private loading = false;
  private valid = true;

  private async validate() {
    if ((this as any).$refs.form.validate()) {
      if (this.etape === 1) {
        this.etape++;
      } else {
        this.loading = true;
        try {
          const register = await (this as any).register((this as any).user);
        } catch (e) {
          this.loading = false;
        }
      }
    }
  }
}
</script>
