import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'

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
	}

	/**
	 * funcs
	 */

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