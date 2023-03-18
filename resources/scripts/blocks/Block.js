export default class Block {
  constructor(el, destroyLast) {
    this.el = el;
    this.destroyLast = destroyLast;

    this.bindMethods()
    this.getElems()
    this.init()
    this.events()
  }

  onEnterCompleted() {}

  bindMethods() {}

  bM(f) {
    for (let i = 0; i < f.length; i++) this[f[i]] = this[f[i]].bind(this)
  }

  getElems() {}

  init() {}

  events() {}

  destroy() {}

  resize() {}

  scroll() {}

  inView() {}

  update() {}
}
