import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'

class Filter extends LitElement {
	static get properties() {	return {
		active: { type: Boolean },
	}}

	static get styles() {
		return [css`${unsafeCSS(style)}`]
	}

	constructor() {
		super()

		this.active = false

		document.addEventListener('toggleFilter', this.toggle.bind(this))
	}

	connectedCallback() {
		super.connectedCallback()

		this.toggle = this.toggle.bind(this)
	}

	/**
	 * funcs
	 */
	toggle() {
		this.active = !this.active

		if (this.active) {
			this.setAttribute('active', '')
		} else {
			this.removeAttribute('active')
		}
	}

	handleClickOverlay() {
		this.toggle()
	}

	/**
	 * HTML
	 */
	render() {
		return html`
			<div class='root'>
				<wc-field name='search' label='Search' disableautocomplete></ wc-field>
			</div>
			${this.overlay()}
		`
	}

	overlay() {
		return html`<div class='overlay' @click=${this.handleClickOverlay}></div>`
	}
}

customElements.define('wc-filter', Filter)