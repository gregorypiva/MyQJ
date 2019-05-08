<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-container grid-list-xs>
        <v-layout>
          <v-flex text-xs-center mt-1>
              <h1 class="white--text font-weight-light" style="letter-spacing: 5px">
                MyQJ
              </h1>
          </v-flex>
        </v-layout>
        <v-layout justify-center align-content-center style="margin-top: 10px">
          <v-flex text-xs-center mb-3 mt-3 class="white--text">
            Inscription
          </v-flex>
        </v-layout>
        <v-layout justify-center align-content-center>
          <v-flex xs10>
            <v-text-field
              v-model="user.lastName"
              label="Nom"
              name="lastName"
              clearable
              :rules="[rules.required]"
              solo
              required
            ></v-text-field>
        </v-flex>
        </v-layout>
        <v-layout justify-center align-content-center>
          <v-flex xs10>
            <v-text-field
              v-model="user.firstName"
              label="Prénom"
              name="firstName"
              clearable
              :rules="[rules.required]"
              solo
              required
            ></v-text-field>
        </v-flex>
        </v-layout>
        <v-layout justify-center align-content-center>
          <v-flex xs10>
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
        </v-layout>
        <v-layout justify-center align-content-center>
          <v-flex xs10>
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
        <v-layout>
          <v-flex v-if="alert.message" text-xs-center red--text>
            {{alert.message}}
          </v-flex>
        </v-layout>
        <v-layout justify-center align-content-center>
          <v-flex text-xs-center xs10>
            <v-btn
              block
              large
              class="elevation-1 mb-3"
              color="secondary"
              :loading="loading"
              :disabled="loading"
              @click="validate"
            ><span class="white--text">INSCRIPTION</span></v-btn>
          </v-flex>
        </v-layout>
        <v-layout justify-center align-content-center>
          <v-flex xs12 text-xs-center class="caption darken3--text">
            J'ai déjà un compte ? <router-link to="/login" style="text-decoration: none" class="darken4--text font-weight-bold">Se connecter</router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState({
      alert: (state) => (state as any).alert,
    }),
  },
  methods: {
    ...mapActions('account', ['register']),
  },
})
// tslint:disable: max-line-length
export default class Register extends Vue {
  private user = {
    firstName: 'test',
    lastName: 'test',
    username: 'gregory@gmail.com',
    password: 'testtesttest',
  };
  private showPassword = false;
  private loader = 'loading';
  private loading = false;
  private valid = true;
  private rules = {
    required: (value: any) => !!value || 'Cette information est nécessaire.',
    min: (v: string) => v.length >= 8 || 'Min 8 characters',
    email: (value: string) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Invalid e-mail.';
    },
  };

  private async validate() {
    if ((this as any).$refs.form.validate()) {
      this.loading = true;
      try {
        const register = await (this as any).register((this as any).user);
      } catch (e) {
        this.loading = false;
      }
    }
  }
}
</script>
