<template>
  <v-flex xs12>
    <v-card>
      <v-card-text >TITULO</v-card-text>
    </v-card>
</v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { EventBus } from '@/main';

@Component({ components: { } })
export default class Titulo extends Vue {

  // Props
  @Prop(Boolean) public mostrarIcono!: boolean;
}
</script>