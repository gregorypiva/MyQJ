<template>
  <Index />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Index from './views/Index.vue';
import { mapActions } from 'vuex';
import { util } from '@/services/util';

@Component({
  components: {
    Index,
  },
  methods: {
    ...mapActions({
      initConfig: 'config/init',
      clearAlert: 'alert/clear',
    }),
  },
})
export default class App extends Vue {

  private async created(): Promise<void> {
    try {
      const requestOptions = util.requestOptions('GET');
      let response = await fetch(`/api/config`, requestOptions);
      response = await util.handleResponse(response);
      (this as any).initConfig(response);
    } catch (e) {
      (this as any).initConfig({});
    }
  }

  @Watch('$route')
  private onChildChanged(val: string, oldVal: string) {
    (this as any).clearAlert();
  }
}
</script>