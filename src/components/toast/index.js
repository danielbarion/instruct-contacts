import { LitElement, html, css, unsafeCSS, customElement } from 'lit-element'
import style from './style.styl'

class Toast extends LitElement {
	static get properties() {	return {
		text: { type: String },
		active: { type: Boolean },
		positionX: { type: String },
		positionY: { type: String },
		timeout: { type: Number }
	}}

	static get styles() {
		return [css`${unsafeCSS(style)}`]
	}

	constructor() {
		super()

		this.text = ''
		this.active = false
		this.positionX = 'right'
		this.positionY = 'bottom'
		this.timeout = 0

	}

	connectedCallback() {
		super.connectedCallback()

		this.toggle = this.toggle.bind(this)

		this.classList.add(`toast-${this.positionX}`)
		this.classList.add(`toast-${this.positionY}`)

		this.initializeTimeout()
	}

	/**
	 * funcs
	 */
	toggle(show) {
		if (show) {
			this.setAttribute('active', '')
		} else {
			this.removeAttribute('active')
		}
	}

	initializeTimeout() {
		if (this.timeout !== 0) {
			setTimeout(() => {
				this.toggle(!this.active)
			}, this.timeout)
		}
	}

	/**
	 * HTML
	 */
	render() {
		return html`
			<div class='root'>
				${this.textElement()}
			</div>
		`
	}

	textElement() {
		return html`<div class='text-slot'>${this.text}</div>`
	}

	actionElement() {
		return html`<div class='action-slot'></div>`
	}
}

customElements.define('wc-toast', Toast)