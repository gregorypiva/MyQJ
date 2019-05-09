<template>
  <v-stepper v-model="etape">
    <v-stepper-header>
      <v-divider></v-divider>
      <v-stepper-step :complete="etape > 1" step="1">Name of step 1</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="etape > 2" step="2">Name of step 2</v-stepper-step>
      <v-divider></v-divider>
    </v-stepper-header>
  </v-stepper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  props: {
    etape: Number,
  },
})
export default class RegisterStep extends Vue {}
</script>
