<template>
  <v-app>
    <router-view :errores="errores" @intentarLoguear="login" />

  <v-btn color="pink" flat @click="snackbar=true">Actualizar</v-btn>

    <v-container>
    <v-snackbar v-model="snackbar" vertical bottom :timeout="timeout">
      A new version of this app is available.
      <v-btn color="pink" flat @click="recargarApp">Actualizar</v-btn>
    </v-snackbar>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import * as api  from '@/services/api';
import { Usuario } from '@/models/usuario';
import { EventBus } from '@/main';

@Component({
  name: 'App',
  components: {
  },
})
export default class App extends Vue {

  // Campos
  errores = { alias: '', password: '' };
  snackbar = false;
  timeout = 100000;

  // Métodos
  login(usuario: Usuario) {
    const resultado = api.login(usuario);
    this.errores = resultado.errores;

    if (resultado.autenticado) {
      this.$router.replace({ name : 'home' });
    }
  }
   
  logout() {
    console.log('recibiendo evento cerrarSesion!');
    localStorage.removeItem('usuario');
  }

  recargarApp() {
    this.snackbar = false;
    window.location.reload();
  }

  // lifecycle hook
  created() {
    console.log('hook created APP');
    EventBus.$on('cerrarSesion', () => {
      this.logout();
      this.$router.replace({ name : 'login' });
    });

    EventBus.$on('nuevaVersion', () => {
      console.log('nueva version jajajaja');
      this.snackbar = true;
      //window.location.reload();
    });
  }
  
  mounted() {
    console.log('hook mounted APP');
    document.addEventListener('swUpdated', () => this.snackbar=true);
  }

  destroy() {
    localStorage.removeItem('usuario');
  }
}
</script>