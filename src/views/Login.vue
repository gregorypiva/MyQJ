<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container style="margin-top: 60px" grid-list-xs>
      <v-layout>
        <v-flex text-xs-center mb-5>
            <h1 class="white--text font-weight-light" style="letter-spacing: 5px">
              MYQJ
            </h1>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex text-xs-center mb-3 mt-3 class="white--text">
          Connexion
        </v-flex>
      </v-layout>
      <v-layout justify-center align-content-center>
        <v-flex xs10>
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
        </v-layout>
        <v-layout justify-center align-content-center>
        <v-flex xs10>
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
            color="#7A2711"
            :dark="!loading"
            @click="validate"
            :loading="loading"
            :disabled="loading"
          ><span>Connexion</span></v-btn>
        </v-flex>
      </v-layout>
      <v-layout justify-center align-content-center>
        <v-flex xs12 text-xs-center class="caption darken3--text" mb-2>
          <router-link to="/recover" style="text-decoration: none" class="darken4--text font-weight-bold">Mot de passe oublié ?</router-link>
        </v-flex>
      </v-layout>
      <v-layout justify-center align-content-center>
        <v-flex xs12 text-xs-center class="caption darken3--text">
          Je n'ai pas de compte ? <router-link to="/register" style="text-decoration: none" class="darken4--text font-weight-bold">S'enregistrer</router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('account', ['status']),
    ...mapState({
      alert: (state) => (state as any).alert,
    }),
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    ...mapActions({ clearAlert: 'alert/clear' }),
  },
  created() {
      // reset login status
      (this as any).logout();
  },
})
export default class Login extends Vue {
  private username = 'gregory@gmail.com';
  private password = 'test';
  private loading = false;
  private valid = true;
  private rules = {
    required: (value: any) => !!value || 'Cette information est nécessaire.',
  };

  private validate(e: any) {
    if ((this as any).$refs.form.validate()) {
      const { username, password } = this;
      if (username && password) {
        this.loading = true;
        (this as any).login({ username, password }).catch((error: any) => {
          this.loading = false;
        });
      }
    }
  }
}
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
