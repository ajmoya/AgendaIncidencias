<template>
    <v-toolbar :clipped-left="true" app absolute dark color="indigo">
      <!-- <v-toolbar-side-icon @click.stop="mostrarOcultarPanel">
        <v-icon>{{ getIcono }}</v-icon>
      </v-toolbar-side-icon> -->
      <v-toolbar-title class="headline text-uppercase">
        <span>SAI-</span>
        <span class="font-weight-light">WEB</span>
        <span> {{ getVersion }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom v-if="mostrarAreaUsuario">
        <v-btn icon large slot="activator" @click="cerrarSesion">
          <v-icon large>exit_to_app</v-icon>
        </v-btn>
        <span>Salir</span>
      </v-tooltip>
    </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { EventBus } from '@/main';
import { ConfigApp } from '@/utils/configApp';


@Component({ components: { } })
export default class Cabecera extends Vue {

  // Props
  @Prop(Boolean) public mostrarPanel!: boolean;
  @Prop(Boolean) public mostrarAreaUsuario!: boolean;

  // Funciones
  public mostrarOcultarPanel() {
    // EventBus.$emit('mostrarOcultarPanel', !this.mostrarPanel);
    console.log('emitiendo evento mostrarOcultarPanel');
    this.$emit('mostrarOcultarPanel', !this.mostrarPanel);
  }

  public cerrarSesion() {
    console.log('emitiendo evento cerrarSesion');
    EventBus.$emit('cerrarSesion');
  }

  // Computadas
  get getVersion() {
    return ConfigApp.Version;
  }

  get getIcono() {
    return this.mostrarPanel ? 'fast_rewind' : 'fast_forward';
  }
}
</script>