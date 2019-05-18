<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-layout row wrap style="margin-top: 60px" align-center justify-center>
      <v-flex xs12 text-xs-center mb-5>
        <h1 class="white--text font-weight-light" style="letter-spacing: 5px">
          {{config.name}}
        </h1>
      </v-flex>
      <v-flex xs12 text-xs-center mb-3 mt-3>
        <h3 class="white--text font-weight-light">Connexion</h3>
      </v-flex>
      <v-flex xs11>
        <v-text-field
          v-model="username"
          label="Adresse email"
          name="username"
          clearable
          :rules="[rules.required]"
          solo
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs11>
        <v-text-field
          v-model="password"
          name="password"
          label="Mot de passe"
          clearable
          type="password"
          :rules="[rules.required]"
          solo
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 v-if="alert.message" class="text-xs-center caption font-weight-medium red--text">
        {{alert.message}}
      </v-flex>
      <v-flex xs11>
        <v-btn
          block
          large
          class="elevation-1 my-3"
          color="#7A2711"
          :dark="!loading"
          @click="validate"
          :loading="loading"
          :disabled="loading"
        ><span>Connexion</span></v-btn>
      </v-flex>
      <v-flex xs12 text-xs-center class="caption darken3--text" mb-2>
        <router-link to="/recover" style="text-decoration: none" class="darken4--text font-weight-bold">Mot de passe oublié ?</router-link>
      </v-flex>
      <v-flex xs12 text-xs-center class="caption darken3--text">
        Je n'ai pas de compte ? <router-link to="/register" style="text-decoration: none" class="darken4--text font-weight-bold">S'enregistrer</router-link>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import {Rules} from '@/services';

@Component({
  components: {},
  computed: {
    ...mapState({
      alert: (state) => (state as any).alert,
      config: (state) => (state as any).config.all,
    }),
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
  },
})
export default class Login extends Vue {

  rules = Rules;

  username: string = '';
  password: string = '';

  valid: boolean = true;
  loading: boolean = false;

  created() {
      // reset login status
      (this as any).logout();
  }

  validate(): void {
    if ((this as any).$refs.form.validate()) {
      const { username, password } = this;
      if (username && password) {
        this.loading = true;
        (this as any)
          .login({ username, password })
          .catch((error: any) => {
            this.loading = false;
        });
      }
    }
  }
}
</script>

