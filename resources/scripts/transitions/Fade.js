import gsap from 'gsap'
import BaseTransition from './baseTransition.js'
import store from '../util/store.js'

export default class Fade extends BaseTransition {
  constructor(e) {
    super(e)
  }

  hideLoader() {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onStart: () => {
          this.scrollToTop()
        },
        onComplete: () => {
          this.resetScroll()
          resolve()
        }
      })

      tl.to(store.panel, {
        yPercent: -100,
        duration: 1,
        ease: 'expo.out'
      }, 0.2)

      tl.to(store.subpanel, {
        yPercent: -100,
        duration: 1.8,
        ease: 'expo.out',
      }, 0)
    })
  }

  showLoader() {
    return new Promise((resolve) => {
      gsap.fromTo(store.panel, {yPercent: 100}, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        onComplete: () => {
          resolve()
        }
      })

      gsap.fromTo(store.subpanel, {yPercent: 100}, {
        delay: 0.2,
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        onComplete: () => {
          resolve()
        }
      })
    })
  }
}
