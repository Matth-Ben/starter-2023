import 'whatwg-fetch'
import 'intersection-observer'

import LazyLoad from 'vanilla-lazyload'
import { throttle, debounce } from 'throttle-debounce'

// Utils
import Loader from './util/Loader.js'
import Menu from './util/Menu.js'
import Anchor from './util/Anchor.js'
import store from './util/store.js'
import Observer from './util/Observer.js'
import Title from './util/Title.js'
import Lenis from '@studio-freight/lenis'

// Renderer
import Page from './routes/Page.js'

// Transitions
import * as Taxi from '@unseenco/taxi'
import Fade from './transitions/Fade.js'

export default class App {
  constructor() {
    this.resize = this.resize.bind(this)
    this.scroll = this.scroll.bind(this)
    this.update = this.update.bind(this)

    this.raf = null

    this.resizeDebounced = debounce(100, this.resize)
    this.resizeThrottled = throttle(150, this.resize)

    if (!store.scrollEngine) {
      this.scrollDebounced = debounce(100, this.scroll)
      this.scrollThrottled = throttle(50, this.scroll)
    }

    store.w = {
      w: window.innerWidth,
      h: window.innerHeight,
      pR: Math.min(window.devicePixelRatio, 2)
    }

    this.h1Elements = [];
    this.h1Array = [...document.querySelectorAll('.random-letter')];

    this.start()
  }

  start() {
    if (store.scrollEngine === 'lenis') this.initLenis()
    else this.initObserver()

    store.loader = new Loader()
    this.menu = new Menu()
    this.anchor = new Anchor()
    this.lazyLoad = new LazyLoad()

    this.initTaxi().then(() => {
      this.events()
      this.update()

      if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

      window.scrollTo(0, 0)
    })
  }

  initObserver() {
    store.observer = new Observer()
  }
  
  initLenis() {
    store.smoothScroll = new Lenis({
      lerp: 0.08,
      smooth: true,
      direction: 'vertical'
    })

    document.documentElement.classList.add('lenis')
    this.initObserver()
  }

  initTaxi() {
    return new Promise((resolve) => {
      store.router = new Taxi.Core({
        renderers: { default: Page },
        transitions: { default: Fade },
        links: 'a:not([target]):not([href^=\\#]):not([href^="mailto:"]):not([href^="tel:"]):not([data-taxi-ignore]):not([href*="wp-admin"]):not(.ab-item):not([href*="wp-login.php?action=logout"])'
      })

      this.preload()
      this.setCurrentRenderer().then(resolve)
    })
  }

  preload() {
    const links = document.body.querySelectorAll('a:not([target]):not([href^=\\#]):not([href^="mailto:"]):not([href^="tel:"]):not([data-taxi-ignore]):not([href*="wp-admin"]):not(.ab-item):not([href*="wp-login.php?action=logout"])')

    for (let i = 0; i < links.length; i++) {
      !store.router.cache.has(links[i].href) && store.router.preload(links[i].href)
    }
  }

  setCurrentRenderer() {
    return new Promise((resolve) => {
      this.currentRenderer = store.router.currentCacheEntry.renderer
      resolve(this.currentRenderer)
    })
  }

  resize() {
    store.w = {
      w: window.innerWidth,
      h: window.innerHeight,
      pR: Math.min(window.devicePixelRatio, 2)
    }

    this.currentRenderer.resize()
    this.menu && this.menu.resize()
  }

  scroll(e) {
    store.scrollEngine === 'lenis' && (store.smoothScroll.direction = this.oldScroll <= e ? 1 : -1)
    this.currentRenderer.scroll(e)
    this.menu && this.menu.scroll()
    this.oldScroll = e
  }

	update() {
    store.scrollEngine === 'lenis' && store.smoothScroll.raf()
    this.currentRenderer.loop()
		requestAnimationFrame(this.update)
	}
 
  events() {
    window.addEventListener('resize', this.resizeThrottled)
    window.addEventListener('resize', this.resizeDebounced)
    window.addEventListener('orientationchange', this.resize)

    if (store.scrollEngine === 'lenis') {
      store.smoothScroll.on('scroll', ({ scroll }) => {
        this.scroll(scroll)
      })
    } else {
      window.addEventListener('scroll', this.scrollThrottled)
      window.addEventListener('scroll', this.scrollDebounced)
    }

    store.router.on('NAVIGATE_IN', ({ to }) => {
      this.currentRenderer = to.renderer
      document.title = to.page.title
      this.lazyLoad.update()
      this.menu.onPageChange(store.router.currentLocation.href)
    })

    store.router.on('NAVIGATE_END', ({ to }) => {
      if (typeof ga !== 'undefined') {
        ga('set', 'location', to.page.URL);
        ga('set', 'page', store.router.targetLocation.pathname)
        ga('set', 'title', to.page.title)
        ga('send', 'pageview')
      }

      this.menu.onPageChange(location.href)
    })

          this.h1Array.forEach((header,idx) => {
              this.h1Elements[idx] = new Title(idx, header)
          })
      
          let options = {
              rootMargin: '0px',
              threshold: 0.0
          }
            
          let callback = (entries) => {
              entries.forEach((entry) => {
                  if(entry.isIntersecting){
                      this.h1Elements[+entry.target.className].intersecting = true;
                      this.h1Elements[+entry.target.className].animate()
                      
                  }else{
                      this.h1Elements[+entry.target.className].reset()
                  }
              });
          };
      
          let observer = new IntersectionObserver(callback, options);
  
          this.h1Elements.forEach(instance => {
              observer.observe(instance.element)
              instance.element.style.opacity = 1
          });
  }
}
