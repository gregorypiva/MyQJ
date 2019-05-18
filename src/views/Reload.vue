<template>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Reload extends Vue {
  created() {
    this.$router.push('/');
  }
}
</script>
