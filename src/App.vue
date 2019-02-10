<template>
  <v-app>
    <router-view :errores="errores" @intentarLoguear="login" />

  <v-btn color="pink" flat @click="snackbar=true">Actualizar</v-btn>

    <v-container>
    <v-snackbar v-model="snackbar" vertical bottom :timeout="timeout">
      Se ha actualizado a una nueva versión la app!
      <v-btn color="pink" flat @click="snackbar=false">Aceptar</v-btn>
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
  timeout = 15000;

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
  }

  // lifecycle hook
  created() {
    console.log('hook created APP');
    EventBus.$on('cerrarSesion', () => {
      this.logout();
      this.$router.replace({ name : 'login' });
    });

    EventBus.$on('nuevaVersion', () => {
      console.log('nueva version APP');
      this.snackbar = true;
    });

    let installPromt: any;
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      installPromt = e;
     // this.snackbar = true;
    });

    // this.recargarApp = () => {
    //   this.snackbar = false;
    //   installPromt.prompt();

    //   installPromt.userChoice.then((result: any) => {
    //     if (result.outcome === 'accepted') {
    //       console.log('Usuario aceptó');
    //     } else {
    //       console.log('Usuario denegó');
    //     }
    //     installPromt = null;
    //   })
    // };
  }
  
  mounted() {
    console.log('hook mounted APP');
    //document.addEventListener('swUpdated', () => this.snackbar=true);
  }

  beforeDestroy() {
    localStorage.removeItem('usuario');
  }
}
</script>