import { Renderer } from '@unseenco/taxi'
import blockList from '../blocks/blockList.js'
import store from '../util/store.js'

export default class Page extends Renderer {
  initialLoad() {
    this.onEnter()
    this.onEnterCompleted()
  }

  onEnter() {
    this.view = this.content
    this.startBlocksEnterCompleted = this.startBlocksEnterCompleted.bind(this)

    store.observer && store.observer.on()
    store.isFirstLoaded && this.preload()

    this.blockList = blockList
    this.blocks = []
    if (this.blockList && this.blockList.length) this.initBlocks()
  }

  preload() {
    const links = this.view.querySelectorAll('a')

    for (let i = 0; i < links.length; i++) {
      !store.router.cache.has(links[i].href) && store.router.preload(links[i].href)
    }
  }

  initBlocks() {
    store.detect.isMobile && (this.blockList = this.blockList.filter((e) => e.mobile !== false))

    let totalBlocks = 0

    for (let i = 0; i < this.blockList.length; i++) {
      const foundBlocks = this.view.querySelectorAll('.' + this.blockList[i].name)

      totalBlocks += foundBlocks.length
    }

    store.loader.play()

    for (let i = 0; i < this.blockList.length; i++) {
      const foundBlocks = this.view.querySelectorAll('.' + this.blockList[i].name)
      const block = {
        name: this.blockList[i].name,
        instances: []
      }

      for (let j = 0; j < foundBlocks.length; j++) {
        const instance = {
          el: foundBlocks[j],
          class: new this.blockList[i].Class(foundBlocks[j])
        }
      
        block.instances.push(instance)
      }

      this.blocks.push(block)
    }
  }

  onEnterCompleted() { 
    store.modules.parallax && store.modules.parallax.on()

    if (store.scrollEngine === 'lenis' || !store.scrollEngine) store.observer.on()

    if (store.isFirstLoaded) this.startBlocksEnterCompleted()
    else window.addEventListener('loaderComplete', this.startBlocksEnterCompleted)
  }

  startBlocksEnterCompleted() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].instances.length; j++) {
        const { el, once } = this.blocks[i].instances[j].class

        this.blocks[i].instances[j].class.onEnterCompleted()

        store.observer.observe({
          el,
          repeat: true,
          once,
          cb: (e) => {
            this.blocks[i].instances[j].class.isInView = e
            this.blocks[i].instances[j].class.inView(e)
          }
        })
      }
    }
  }

  onLeave() {
    if (store.scrollEngine === 'lenis' || !store.scrollEngine) store.observer.off()

    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].instances.length; j++) {
        if (!this.blocks[i].instances[j].class.destroyLast) this.blocks[i].instances[j].class.destroy()
      }
    }
  }

  onLeaveCompleted() {
    store.observer && store.observer.off()

    // Destroy blocks with `destroyLast` property set to `true`
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].instances.length; j++) {
        if (this.blocks[i].instances[j].class.destroyLast) this.blocks[i].instances[j].class.destroy()
      }
    }
  }

  resize() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].instances.length; j++) {
        this.blocks[i].instances[j].class.resize()
      }
    }
  }

  scroll(e) {
    store.modules.parallax && store.modules.parallax.scroll(e)

    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].instances.length; j++) {
        this.blocks[i].instances[j].class.scroll(e)
      }
    }
  }

  loop() {
    if (this.blocks) {
      for (let i = 0; i < this.blocks.length; i++) {
        for (let j = 0; j < this.blocks[i].instances.length; j++) {
          this.blocks[i].instances[j].class.isInView && this.blocks[i].instances[j].class.update()
        }
      }
    }
  }
}
