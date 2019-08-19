import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'
import fetcher from 'utils/api/index.js'

class App extends LitElement {
	static get properties() {	return {
		active: { type: Boolean }
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
		this.getContacts()
	}

	/**
	 * funcs
	 */
	getContacts() {
		fetcher({ url: 'http://jsonplaceholder.typicode.com/users' })
		.then(response => {
			console.log(response)
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
			<div> Hello World </div>
		`
	}
}

customElements.define('instruct-app', App)