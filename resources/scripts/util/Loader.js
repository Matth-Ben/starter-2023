import gsap from 'gsap'
import store from './store.js'

export default class Loader {
  constructor() {
    this.getElems()
  }

  getElems() {
    store.panel = document.querySelector('.panel')
    store.subpanel = document.querySelector('.subpanel')
  }

  play() {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          store.menu && !store.detect.isMobile && store.menu.init()

          resolve()
        }
      })

      // eslint-disable-next-line prefer-reflect
      // tl
      //   .to(store.subpanel, {
      //     delay: 0.6,
      //     yPercent: 100,
      //     duration: 0.6,
      //     ease: 'power3.out'
      //   })
      //   .to(store.panel, {
      //     yPercent: 100,
      //     duration: 0.6,
      //     ease: 'power3.out'
      //   })
      //   .call(() => {
      //     window.dispatchEvent(new CustomEvent('loaderComplete'))
      //     store.isFirstLoaded = true
      //   }, [], 0)
    })
  }
}
