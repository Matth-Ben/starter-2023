import store from './store.js'

export default class Mousemove {
  constructor({ el, cb, mobile = false }) {
    this.cb = cb
    this.mobile = mobile

    // eslint-disable-next-line
    this.el = typeof el === 'string' ? document.querySelector(el) : (el === undefined ? document : el)
    this.run = this.run.bind(this)
  }

  on() {
    this.listener('add')
  }

  off() {
    this.listener('remove')
  }

  listener(a) {
    if (this.mobile && store.detect.isMobile) this.el[a + 'EventListener']('touchmove', this.run)
    else this.el[a + 'EventListener']('mousemove', this.run)
  }

  run(e) {
    const x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX
    const y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY

    this.cb(x, y, e)
  }
}
