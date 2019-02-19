<template>
  <v-form>
    <v-container style="margin-top: 60px" grid-list-xs>
      <v-layout>
        <v-flex text-xs-center mb-5>
            <h1 class="white--text font-weight-light" style="letter-spacing: 5px">
              MyQJ
            </h1>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex text-xs-center mb-3 mt-3 class="white--text">
          Récupération de mot de passe
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
            dark
            class="elevation-1 mb-3"
            color="#7474BF"
            @click="handleSubmit"
          >Connexion</v-btn>
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
})
export default class LoginRecover extends Vue {
  private username = '';
  private submitted = false;
  private show = false;
  private rules = {
    required: (value: any) => !!value || 'Cette information est nécessaire.',
  };

  private handleSubmit(e: any) {
    this.submitted = true;
    const { username } = this;
    // if (username) {
    // }
  }
}
</script>
