/* tslint:disable:no-console */

import { register } from 'register-service-worker';
import { EventBus } from './main';
import { ConfigApp } from '@/utils/configApp';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB',
      );
    },
    registered(registration) {
      console.log('Service worker has been registered.');
    },
    cached() {
      // Aquí entra cuando se actualiza solo el service worker
      console.log('Content has been cached for offline use.');
    },
    updatefound(registration) {
      console.log('Nueva versión encontrada. Descargando...');
    },
    updated(registration) {
      // Aquí entra cuando se actualiza contenido de las vistas
      console.log('El nuevo contenido está disponible. Por favor refresca.');
      EventBus.$emit('nuevaVersion', ConfigApp.Version);
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
