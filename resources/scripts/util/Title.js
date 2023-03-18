import gsap from 'gsap'

export default class Title {
    constructor(id, element) {
        this.letters = "abcdefghijklmnopqrstuvwxyz#%&^+=-"

        this.id = id;
        this.idx = 0;
        this.frame = 0;
        this.element = element;
        this.element.className = `${id}`;
        this.originalString = element.innerText;
        this.innerHtml = '';
        this.intersecting = false;

        this.createSpans()
    }

    createSpans() {
        for(let i = 0; i < this.originalString.length; i++){
            this.innerHtml += `<span class="word">${this.originalString[i]}</span>`;
        }
        this.element.innerHTML = this.innerHtml;
        this.spans = [...this.element.querySelectorAll('span')]
    }

    animate() {
        if(this.idx !== this.originalString.length && this.intersecting){
            this.spans[this.idx].style.opacity = 1;
            this.spans[this.idx].style.transform = `translateX(0)`
            if(this.frame % 3 === 0 && this.spans[this.idx].innerText !== ' '){
                this.spans[this.idx].innerText = this.letters[Math.floor(Math.random() * this.letters.length)]
            }
            if(this.frame % 15 == 0 && this.frame !== 0) {
                this.spans[this.idx].innerText = this.originalString[this.idx]
                this.idx++
            }
            this.frame++;
            requestAnimationFrame(this.animate.bind(this))
        }
    }

    reset() {
        this.idx = 0;
        this.frame = 0;
        this.intersecting = false;
        [...this.element.querySelectorAll('span')].forEach(span => {
            span.style.opacity = 0;
            span.style.transform = `translateX(-10px)`
        })
    }
}
