import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'
import fetcher from 'utils/api/index.js'

class App extends LitElement {
	static get properties() {	return {
		active: { type: Boolean },
		contacts: {	type: Array	}
	}}

	static get styles() {
		return [css`${unsafeCSS(style)}`]
	}

	constructor() {
		super()

		this.active = false
		this.contacts = []
	}

	connectedCallback() {
		super.connectedCallback()
		this.getContacts()
	}

	/**
	 * funcs
	 */
	getContacts() {
		fetcher({ url: 'http://jsonplaceholder.typicode.com/users' })
		.then(response => {
			console.log(response)
			this.contacts = response
		})

	}

	/**
	 * HTML
	 */
	render() {
		return html`
			${this.appRoot()}
		`
	}

	appRoot() {
		return html`
			<div>${JSON.stringify(this.contacts)}</div>
		`
	}
}

customElements.define('instruct-app', App)