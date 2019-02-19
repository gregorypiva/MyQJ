<template>
  <div class="home">
    <MenuBottom/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomePage from '@/components/HomePage.vue'; // @ is an alias to /src
import MenuBottom from '@/components/MenuBottom.vue'; // @ is an alias to /src

@Component({
  components: {
    MenuBottom,
  },
})
export default class Home extends Vue {}
</script>


