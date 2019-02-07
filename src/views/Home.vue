<template>
 <v-app dark>

    <v-navigation-drawer v-model="mostrarPanel" clipped absolute app>
      <MenuLateral />
    </v-navigation-drawer>

    <Cabecera :mostrarPanel="mostrarPanel" @mostrarOcultarPanel="setVisibilidadPanel" />

    <v-content>
      <Principal :valores="valoresActuales" />
    </v-content>

    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>

  </v-app>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cabecera from '@/components/Cabecera.vue';
import MenuLateral from '@/components/MenuLateral.vue';
import Principal from '@/components/Principal.vue';
import { Usuario } from '@/models/usuario';
import { EventBus } from '@/main';


@Component({ components: { Cabecera, MenuLateral, Principal } })
export default class Home extends Vue {
 public  mostrarPanel = true;
 public  valoresActuales = ['hola' , 'adios' , 'sioke' , 'dertiron' , 'jajaja' , 'eonoe'];

 public  created() {
    console.log('hook created HOME');
  }

 public  setVisibilidadPanel(panelVisible: boolean) {
      this.mostrarPanel = panelVisible;
      console.log('HOME: mostrarPanel: ' + this.mostrarPanel);
  }

 public  beforeDestroy() {
    // EventBus.$off('mostrarOcultarPanel');
  }
}
</script>
