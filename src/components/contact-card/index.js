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
	switchCard(event) {
		const [finalElement] = event.path

		if (finalElement && finalElement.classList.contains('map')) {
			return
		}

		const infoElement = this.shadowRoot.querySelector('.info')

		if (infoElement.hasAttribute('show')) {
			infoElement.removeAttribute('show')
		} else {
			infoElement.setAttribute('show', '')
		}
	}

	openInMaps(address) {
		window.open(`https://maps.google.com/maps?q=${address.geo.lat},${address.geo.lng}`)
	}

	/**
	 * HTML
	 */
	render() {
		return html`
		${this.icons()}

			<div class='card card-1' @click=${this.switchCard}>
				<div class='name' title='${this.data.username}'>
					<i class='material-icons'>account_circle</i>
					<span>${this.data.name}</span>
				</div>
				<div class='info'>
					<div class='phone'>
						<i class='material-icons'>local_phone</i>
						<span>${this.data.phone}</span>
					</div>
					<div class='username'>
						<i class='material-icons'>sentiment_satisfied</i>
						<span>${this.data.username}</span>
					</div>
					<div class='website'>
						<i class='material-icons'>public</i>
						<span>${this.data.website}</span>
					</div>
					<div class='adress'>
						<i class='material-icons map' @click=${this.openInMaps.bind(this, this.data.address)}>location_on</i>
						<span>Address: ${this.data.address.street}, ${this.data.address.city}</span>
					</div>
					<div class='suite'>
						<i class='material-icons'></i>
						<span>Suite: ${this.data.address.suite} | Zip: ${this.data.address.zipcode}</span>
					</div>
				</div>
				<div class='email'>
					<i class='material-icons'>mail</i>
					<span>${this.data.email}</span>
				</div>
			</div>
		`
	}

	icons() {
		return html`<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>`
	}
}

customElements.define('wc-contact-card', ContactCard)