<template>
  <v-flex xs12>
    <v-card>
      <v-card-text>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex v-for="opcion in opciones" :key="`1${opcion.id}`" xs12 md6 lg3>
              <v-card dark color="indigo" @click="validarOpcion(opcion)">
                <v-card-text class="px-0">
                  {{ opcion.nombre }}
                  <v-icon right>navigate_next</v-icon>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Opcion } from '@/models/opcion';

@Component
export default class ListaOpciones extends Vue {
    @Prop(Array) public opciones!: any;

    public validarOpcion(opcion: Opcion) {
      this.$emit('validarOpcion', opcion);
    }
}
</script>
