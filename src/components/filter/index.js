import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'

class Filter extends LitElement {
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

		this.active = false
	}

	connectedCallback() {
		super.connectedCallback()

		this.toggle = this.toggle.bind(this)
	}

	/**
	 * funcs
	 */
	toggle(show) {
		console.log({show})
		if (show) {
			this.setAttribute('active', '')
			this.initializeTimeout()
		} else {
			this.removeAttribute('active')
		}
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
		return html`<div class='overlay'></div>`
	}
}

customElements.define('wc-filter', Filter)