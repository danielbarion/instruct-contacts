import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'

class ContactCard extends LitElement {
	static get properties() {	return {
		data: { type: Object },
	}}

	static get styles() {
		return [css`${unsafeCSS(style)}`]
	}

	constructor() {
		super()

		this.data = {}
	}

	connectedCallback() {
		super.connectedCallback()

		console.log(this.data)
	}

	/**
	 * funcs
	 */

	/**
	 * HTML
	 */
	render() {
		return html`
			<div class='card card-1'>
				${this.data.name}
			</div>
		`
	}
}

customElements.define('wc-contact-card', ContactCard)