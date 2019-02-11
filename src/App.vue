<template>
  <v-app>
    <v-snackbar v-model="snackbarInstalar" top :timeout="timeout">
      ¿Desea instalar la app web?
      <v-btn color="pink" flat @click="instalarApp">Instalar</v-btn>
    </v-snackbar>

    <router-view :errores="errores" @intentarLoguear="login" />

    <v-snackbar v-model="snackbar" vertical bottom :timeout="timeout">
      Versión actual: {{ versionActual }} Se ha encontrado una nueva versión de la app
      <v-btn color="pink" flat @click="recargarApp">Actualizar</v-btn>
    </v-snackbar>

  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import * as api from '@/services/api';
import { Usuario } from '@/models/usuario';
import { EventBus } from '@/main';
import { ConfigApp } from '@/utils/configApp';

@Component({
  name: 'App',
  components: {
  },
})
export default class App extends Vue {

 // Campos
 public errores = { alias: '', password: '' };
 public snackbar = false;
 public snackbarInstalar = false;
 public timeout = 60000;

  // Métodos
 public login(usuario: Usuario) {
    const resultado = api.login(usuario);
    this.errores = resultado.errores;

    if (resultado.autenticado) {
      this.$router.replace({ name : 'home' });
    }
  }

 public logout() {
    console.log('recibiendo evento cerrarSesion!');
    localStorage.removeItem('usuario');
  }

 public recargarApp() {
    this.snackbar = false;
    window.location.reload();
  }

 public instalarApp() { return; }

  get versionActual() {
    return ConfigApp.Version;
  }

  // lifecycle hook
 public created() {
    console.log('hook created APP');
    EventBus.$on('cerrarSesion', () => {
      this.logout();
      this.$router.replace({ name : 'login' });
    });

    EventBus.$on('nuevaVersion', () => {
      console.log('versión actual APP:' + this.versionActual);
      this.snackbar = true;
    });

    let installPromt: any;
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('entra en el evento beforeinstallprompt APP');
      e.preventDefault();
      installPromt = e;
      this.snackbarInstalar = true;
    });

    this.instalarApp = () => {
      this.snackbarInstalar = false;
      installPromt.prompt();

      installPromt.userChoice.then((result: any) => {
        if (result.outcome === 'accepted') {
          console.log('Usuario aceptó');
        } else {
          console.log('Usuario denegó');
        }
        installPromt = null;
     });
   };
  }
 public mounted() {
    console.log('hook mounted APP');
  }

  public beforeDestroy() {
    localStorage.removeItem('usuario');
  }
}
</script>