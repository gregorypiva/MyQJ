<template>
  <v-toolbar flat>
    <v-toolbar-title>MyQJ</v-toolbar-title>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  props: {
    color: String,
  },
})
export default class LoginPage extends Vue {}
</script>
