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
 public  autenticado = false;
 public  errores = { alias: '', password: '' };

  // Métodos
 public  login(usuario: Usuario) {
   const resultado = api.login(usuario);

   this.autenticado = resultado.autenticado;
   this.errores = resultado.errores;

   if (this.autenticado) {
      this.$router.replace({ name  :'home' });
    }
   
 public  logout() {
    console.log('recibiendo evento cerrarSesion!');
    this.autenticado = false;
  }

  // lifecycle hook
 public  created() {
    console.log('hook created App');
    EventBus.$on('cerrarSesion', () => this.logout());
   
 public  mounted() {
    if (!this.autenticado) {
      console.log('hook mounted App');
      this.$router.replace({ name  :'login' });
    }
  }
}
</script>