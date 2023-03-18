import { Transition } from '@unseenco/taxi'
import store from '../util/store.js'

export default class BaseTransition extends Transition {
  onLeave({ done, from }) {
    this.from = from
    store.smoothScroll && store.smoothScroll.stop()

    this.getElems()

    store.transitionComplete = false

    this.showLoader().then(() => {
      store.transitionComplete = true
      window.dispatchEvent(new CustomEvent('transitionComplete'))
      done()
    })
  }

  onEnter({ done, to }) {
    this.to = to
    this.done = done

    this.getElems()

    if (store.transitionComplete) this.transitionComplete()
    else window.addEventListener('transitionComplete', this.transitionComplete.bind(this), { once: true })
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  resetScroll() {
    if (store.scrollEngine === 'lenis') {
      store.smoothScroll.scrollTo(0, { immediate: true })
      store.smoothScroll.start()
      store.smoothScroll.scroll = 0
      store.smoothScroll.targetScroll = 0
    } else {
      window.scrollTo(0, 0)
    }
  }

  transitionComplete() {
    this.hideLoader(this.from, this.to).then(() => {
      this.resetScroll()
      this.done()
    })
  }

  out({ done }) {
    store.smoothScroll && store.smoothScroll.stop()

    this.getElems()

    store.transitionComplete = false

    this.showLoader().then(() => {
      store.transitionComplete = true
      window.dispatchEvent(new CustomEvent('transitionComplete'))
    })

    done()
  }

  hideLoader() {}

  showLoader() {}

  getElems() {}
}
