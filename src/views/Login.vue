<template>
     <v-app>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar>
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
                <v-btn @click="login">Acceder<v-icon right>check_circle</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Usuario } from '@/models/usuario';
import { ConfigApp } from '@/utils/configApp';

@Component
export default class Login extends Vue {

  // Props
  @Prop(Object) errores!: any;

  // Campos
  mostrarPassword = false;
  usuario: Usuario = { id: 0, alias  :'', password: ''};

  // Métodos
  login() {
    // emitimos un evento al padre, que estará suscrito a este evento
    this.$emit('intentarLoguear', this.usuario);
  }

  get versionActual() {
    return ConfigApp.Version;
  }

  // lifecycle hook
  created() {
    console.log('hook created LOGIN');
  }

  mounted() {
    console.log('hook mounted LOGIN');
  }
}
</script>
