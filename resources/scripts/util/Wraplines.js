import Splitting from 'splitting'

export default class WrapLines {
  constructor({ el, className = 'line', option}) {
    this.el = el
    this.html = el.innerHTML
    this.className = className
    this.option = option
    this.lines = []

    Splitting.add({
      by: 'lines-char',
      key: 'lineWord',
      depends: ['chars', 'lines']
    })

    this.wrap()
    
    this.$el = document.querySelectorAll('.splitting')
  }

  wrap() {
    if (this.option === 'content') {
      this.lines = {
        linesWords: []
      }

      const els = this.el.querySelectorAll('h3, p, ul')

      for (let i = 0; i < els.length; i++) {
        const by = els[i].tagName === 'UL' ? 'items' : 'lines'
        const l = new Splitting({
          target: els[i],
          by
        })[0]

        this.lines.linesWords.push(...l[by])
      }
    } else if (this.option === 'wrap') {
      this.wrapLines()
    } else {
      this.lines = new Splitting({
        target: this.el,
        by: 'lines-char'
      })[0]

      this.lines.linesChars = []

      for (let i = 0; i < this.lines.lines.length; i++) {
        this.lines.linesChars[i] = []

        for (let j = 0; j < this.lines.lines[i].length; j++) {
          this.lines.linesChars[i].push(...this.lines.lines[i][j].querySelectorAll('.char'))
        }
      }
    }
  }

  wrapLines() {
    // eslint-disable-next-line object-property-newline
    const lines = new Splitting({ target: this.el, by: 'lines' })[0].lines

    let html = ''

    for (let i = 0; i < lines.length; i++) {
      const lineEl = document.createElement('div')
      const line = document.createElement('div')

      lineEl.classList.add('l-wrap')
      line.classList.add(this.className)
      line.style.setProperty('--w-line-index', i)
      line.style.setProperty('--w-total-index', lines.length)

      for (let j = 0; j < lines[i].length; j++) {
        const word = lines[i][j]
        const whitespace = word.nextSibling

        line.appendChild(word)
        whitespace && line.appendChild(whitespace)
      }

      lineEl.appendChild(line)
      html += lineEl.outerHTML
    }

    this.el.innerHTML = html
    this.lines = this.el.querySelectorAll(`.${this.className}`)
  }
}
