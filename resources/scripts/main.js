import App from './App.js'
import store from './util/store.js'

import('./util/Grid.js').then(({ default: Grid }) => {
    store.modules.grid = new Grid()
})

// if (!store.detect.isMobile) {
//   import('./util/Parallax').then(({ default: Parallax }) => {
//     store.modules.parallax = new Parallax()
//   })
// }

window.addEventListener('load', () => {
  // eslint-disable-next-line no-new
  new App()
})
