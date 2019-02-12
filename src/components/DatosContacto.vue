<template>
<v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Contacto del RETÉN shurperro: 696969.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="indigo" @click="cerrarDatosContacto">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DatosContacto extends Vue {
    public dialog = true;

    public cerrarDatosContacto() {
        this.$emit('cerrarDatosContacto');
    }

    public created() {
        console.log('hock create Datos contacto');
    }
}
</script>