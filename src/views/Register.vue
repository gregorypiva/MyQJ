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
        <v-layout justify-center align-content-center>
          <v-flex text-xs-center mt-3 class="white--text">
            Inscription
          </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-xs v-if="etape == 1">
        <v-layout justify-center align-content-center>
          <v-flex xs12>
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
          <v-flex xs12>
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
          <v-flex xs12>
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
          <v-flex xs12>
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
              @click="validate()"
            ><span class="white--text">Suivant</span></v-btn>
          </v-flex>
        </v-layout>
        <v-layout justify-center align-content-center>
          <v-flex xs12 text-xs-center class="caption darken3--text">
            J'ai déjà un compte ? <router-link to="/login" style="text-decoration: none" class="darken4--text font-weight-bold">Se connecter</router-link>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-xs v-if="etape == 2">
        <v-layout justify-center align-content-center>
          <v-flex xs12>
            <v-select
              :items="['Homme', 'Femme']"
              label="Sexe"
              :rules="[rules.required]"
              solo
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout justify-center align-content-center>
          <v-flex xs6>
            <v-select
              :items="Array.from(Array(180).keys()).map(i => (i + 40) + ' cm')"
              label="Taille"
              :rules="[rules.required]"
              solo
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="Array.from(Array(180).keys()).map(i => (i + 10) + ' kg')"
              label="Poids"
              :rules="[rules.required]"
              solo
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>Date de naissance</v-flex>
        </v-layout>
        <v-layout justify-center align-content-center>
          <v-flex xs3>
            <v-select
              :items="Array.from(Array(31).keys()).map(i => i + 1)"
              label="Jour"
              solo
              :rules="[rules.required]"
            ></v-select>
          </v-flex>
          <v-flex xs5>
            <v-select
              :items="['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']"
              label="Mois"
              solo
              :rules="[rules.required]"
            ></v-select>
          </v-flex>
          <v-flex xs4>
            <v-select
              :items="Array.from(Array(101).keys()).map(i => (new Date().getFullYear()-100) + i)"
              label="Année"
              solo
              :rules="[rules.required]"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout>
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
        </v-layout>
        <v-layout>
          <v-flex xs5>
            <v-text-field
              label="CP"
              name="city"
              clearable
              :rules="[rules.required]"
              solo
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              label="Ville"
              name="city"
              clearable
              :rules="[rules.required]"
              solo
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-text-field
              label="Pays"
              name="pays"
              clearable
              :rules="[rules.required]"
              solo
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
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
              @click="validate()"
            ><span class="white--text">Inscription</span></v-btn>
            <v-btn
              block
              large
              class="elevation-1 mb-3"
              @click="etape = 1"
            ><span>Retour</span></v-btn>
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
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  };
  private etape = 1;
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
