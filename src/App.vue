<template>
  <!-- <v-app>    -->
    <router-view :errores="errores" @intentarLoguear="login" />
  <!-- </v-app> -->
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

  // lifecycle hook
  created() {
    console.log('hook created APP');
    EventBus.$on('cerrarSesion', () => {
      this.logout();
      this.$router.replace({ name : 'login' });
    });
  }
  
  mounted() {
      console.log('hook mounted APP');
  }

  destroy() {
    localStorage.removeItem('usuario');
  }
}
</script>