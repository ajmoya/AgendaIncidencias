module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/agendaIncidencias/'
      : '/',
    // pwa: {
    //   // configure the workbox plugin
    //   workboxPluginMode: 'InjectManifest',
    //   workboxOptions: {
    //       // swSrc is required in InjectManifest mode.
    //       swSrc: 'src/service-worker.js',
    //       // ...other Workbox options...
    //   }
    // }
  }