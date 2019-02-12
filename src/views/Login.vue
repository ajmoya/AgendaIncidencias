<template>
     <v-app>
        <Cabecera :mostrarPanel="false" :mostrarAreaUsuario="false" />

        <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md9>
            <v-card class="elevation-12">
              <v-toolbar dark color="indigo">
                <v-toolbar-title>Acceso Agenda v{{ versionActual }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn icon large slot="activator">
                    <v-icon large>event</v-icon>
                  </v-btn>
                  <span>Agenda</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                  <v-text-field prepend-icon="person" name="usuario" label="Usuario" v-model.trim="usuario.alias" type="text" :error-messages="errores.alias"></v-text-field>

                  <v-text-field prepend-icon="lock" name="password" label="Password" v-model.trim="usuario.password" id="password"
                          :error-messages="errores.password" hint="Al menos 6 caracteres"
                          :append-icon="mostrarPassword ? 'visibility' : 'visibility_off'"
                          :type="mostrarPassword ? 'text' : 'password'" @click:append="mostrarPassword = !mostrarPassword"></v-text-field>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login" dark color="indigo">Acceder<v-icon right>check_circle</v-icon></v-btn>
              </v-card-actions>
            </v-card>

            <v-dialog v-model="dialog" hide-overlay persistent width="300">
              <v-card color="indigo" dark>
                <v-card-text>
                  Por favor, espere mientras se carga la interfaz...
                  <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>

          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Usuario } from '@/models/usuario';
import { ConfigApp } from '@/utils/configApp';
import Cabecera from '@/components/Cabecera.vue';

@Component({ components: { Cabecera } })
export default class Login extends Vue {

  // Props
  @Prop(Object) public errores!: any;

  // Campos
  public mostrarPassword = false;
  public usuario: Usuario = { id: 0, alias: '', password: ''};
  public dialog = false;

  @Watch('errores')
  public onErroresChanged(val: boolean) {
    if (!val) {  return; }
    this.dialog = false;
  }

  // Métodos
  public login() {
    this.dialog = true;

    // Para hacer pruebas de este dialogo de carga, descomenta
    // setTimeout(() => (this.dialog = false), 4000)

    // emitimos un evento al padre, que estará suscrito a este evento
    this.$emit('intentarLoguear', this.usuario);
  }

  get versionActual() {
    return ConfigApp.Version;
  }

  // lifecycle hook
  public created() {
    console.log('hook created LOGIN');
  }

  public mounted() {
    console.log('hook mounted LOGIN');
  }
}
</script>
