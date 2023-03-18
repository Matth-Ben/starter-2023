import Block from './Block.js'
import gsap from 'gsap'

export default class Awards extends Block {
    getElems() {
        this.el = document.querySelector('.awards')
        this.$items = this.el.querySelectorAll('.awards__item')
        this.$svg = this.el.querySelectorAll('.awards__svg')
        this.$content = this.el.querySelectorAll('.awards__content')
    }

    init() {
        this.$svg.forEach((el, i) => {
            this.width = el.offsetWidth
            
            gsap.set(this.$content[i], {
                x: -this.width + "px"
            })
            gsap.set(el, {
                xPercent: -100,
                opacity: 0
            })
            gsap.to(el.querySelector('svg'), {
                xPercent: 100
            })
        });
    }

    events() {
        this.$items.forEach((el, i) => {
            el.addEventListener("mouseenter", () => {
                this.onEnter(i)
            })

            el.addEventListener("mouseleave", () => {
                this.onLeave(i)
            })
        });
    }

    onEnter(i) {
        gsap.to(this.$content[i], {
            x: 0
        })

        gsap.to(this.$svg[i], {
            xPercent: 0,
            opacity: 1
        })

        gsap.to(this.$svg[i].querySelector('svg'), {
            xPercent: 0
        })
    }

    onLeave(i) {
        this.width = this.$svg[i].offsetWidth
        gsap.to(this.$content[i], {
            x: -this.width
        })

        gsap.to(this.$svg[i], {
            xPercent: -100,
            opacity: 0
        })

        gsap.to(this.$svg[i].querySelector('svg'), {
            xPercent: 100
        })
    }

    resize() {
        this.init()
    }
}
