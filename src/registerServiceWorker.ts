/* tslint:disable:no-console */

import { register } from 'register-service-worker';
import { EventBus } from './main';

// const UpdatedEvent = new CustomEvent('swUpdated', { detail: null });

// const notifyUserAboutUpdate = (worker: any) => {
//   console.log('Nuevo contenido !!!');
//   EventBus.$emit('nuevaVersion');
//   worker.postMessage( {action: 'skipWaiting'} );
// };

// if (process.env.NODE_ENV === 'production') {
//   register(`${process.env.BASE_URL}service-worker.js`, {
//     ready() {
//       console.log(
//         'App is being served from cache by a service worker.\n' +
//         'For more details, visit https://goo.gl/AFskqB',
//       );
//     },
//     registered(registration) {
//       console.log('Service worker has been registered.');
//     },
//     cached() {
//       console.log('Content has been cached for offline use.');
//     },
//     updatefound(registration) {
//       console.log('New content is downloading.');
//       // EventBus.$emit('nuevaVersion');
//     },
//     updated(registration) {
//       console.log('New content is available; please refresh.');
//       notifyUserAboutUpdate(registration.waiting);
//       // EventBus.$emit('nuevaVersion');
//       // document.dispatchEvent(UpdatedEvent);
//     },
//     offline() {
//       console.log('No internet connection found. App is running in offline mode.');
//     },
//     error(error) {
//       console.error('Error during service worker registration:', error);
//     },
//   });

//   let refrescando: boolean;
//   navigator.serviceWorker.addEventListener('controllerchange', () => {
//     if (refrescando) { return; }
//     window.location.reload();
//     refrescando = false;
//   });
// }
