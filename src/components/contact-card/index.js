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

		setTimeout(() => {
			this.shadowRoot.querySelector('.info').setAttribute('show', '')
		}, 3000)
	}

	/**
	 * funcs
	 */

	clickHandler() {
		const infoElement = this.shadowRoot.querySelector('.info')

		if (infoElement.hasAttribute('show')) {
			infoElement.removeAttribute('show')
		} else {
			infoElement.setAttribute('show', '')
		}
	}

	/**
	 * HTML
	 */
	render() {
		return html`
		${this.icons()}

			<div class='card card-1' @click=${this.clickHandler}>
				<div class='name' title='${this.data.username}'><i class="material-icons">account_circle</i> ${this.data.name}</div>
				<div class='info'>
					<div class='phone'><i class="material-icons">local_phone</i> ${this.data.phone}</div>
					<div class='username'><i class="material-icons">sentiment_satisfied</i> ${this.data.username}</div>
					<div class='website'><i class="material-icons">public</i> ${this.data.website}</div>
				</div>
				<div class='email'><i class="material-icons">mail</i> ${this.data.email}</div>
			</div>
		`
	}

	icons() {
		return html`<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
	}
}

customElements.define('wc-contact-card', ContactCard)