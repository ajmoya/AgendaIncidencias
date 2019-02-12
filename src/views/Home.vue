<template>
 <v-app>

    <v-navigation-drawer v-model="mostrarPanel" clipped absolute app>
      <MenuLateral />
    </v-navigation-drawer>

    <cabecera :mostrarPanel="mostrarPanel" :mostrarAreaUsuario="true" @mostrarOcultarPanel="setVisibilidadPanel" />

    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center row wrap>
          <titulo :mostrarIcono="true" />
          <component :is="componentesHijos[componenteActual]" :opciones="opcionesActuales"
              @cerrarDatosContacto="cerrarComponenteDatosContacto" @validarOpcion="validarComponenteOpcion"></component>
        </v-layout>
      </v-container>
   </v-content> 

    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>

  </v-app>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cabecera from '@/components/Cabecera.vue';
import Titulo from '@/components/Titulo.vue';
import MenuLateral from '@/components/MenuLateral.vue';
import ListaOpciones from '@/components/ListaOpciones.vue';
import DatosContacto from '@/components/DatosContacto.vue';
import { Usuario } from '@/models/usuario';
import { Opcion } from '@/models/opcion';
import { EventBus } from '@/main';


@Component({ components: { Cabecera, Titulo, MenuLateral, ListaOpciones, DatosContacto } })
export default class Home extends Vue {
 public mostrarPanel = false;

 public opcion: Opcion = { id: 0, nivel: 0, nombre: 'Inicio', hoja: false, padre: -1 };

 public opciones: Opcion[] = [
    { id: 0, nivel: 0, nombre: 'Inicio', hoja: false, padre: -1 },

    { id: 1, nivel: 1, nombre: 'toni', hoja: false, padre: 0 },
    { id: 2, nivel: 1, nombre: 'adios', hoja: true, padre: 0 },
    { id: 3, nivel: 1, nombre: 'sioke', hoja: true, padre: 0 },
    { id: 4, nivel: 1, nombre: 'dertiron', hoja: true, padre: 0 },
    { id: 5, nivel: 1, nombre: 'jajaja', hoja: false, padre: 0 },
    { id: 6, nivel: 1, nombre: 'eonoe', hoja: false, padre: 0 },

    { id: 7, nivel: 2, nombre: 'iyo', hoja: true, padre: 1 },
    { id: 8, nivel: 2, nombre: 'suprimoh', hoja: true, padre: 1 },
    { id: 9, nivel: 2, nombre: 'sucolega', hoja: true, padre: 1 },
    { id: 10, nivel: 2, nombre: 'ysuhermano', hoja: true, padre: 1 },

    { id: 11, nivel: 2, nombre: 'puf', hoja: true, padre: 5 },
    { id: 12, nivel: 2, nombre: 'jejeje', hoja: true, padre: 6  },
  ];

  public componentesHijos = ['lista-opciones', 'resultado', 'datos-contacto'];
  public componenteActual = 0;


  public created() {
    console.log('hook created HOME');
  }

  public cerrarComponenteDatosContacto() {
    this.componenteActual = 1;
  }

  public validarComponenteOpcion(opcion: Opcion) {
    // Si no tiene hijos mostrar el componente de resultado (tabla)
    if (opcion.hoja) {
      console.log('vamos a mostrar el componente hijo Resultado.vue');
      this.componenteActual = 1;
    } else {
      console.log('opcion elegida => ' + opcion.nombre);
      this.opcion = opcion;
    }
  }

  public setVisibilidadPanel(panelVisible: boolean) {
      this.mostrarPanel = panelVisible;
      console.log('HOME: mostrarPanel: ' + this.mostrarPanel);
  }

  get opcionesActuales() {
    return this.opciones.filter((x: Opcion) => x.padre === this.opcion.id);
  }
}
</script>
