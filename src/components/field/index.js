import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'

class Field extends LitElement {
	static get properties() {	return {
		id: { type: String },
		name: { type: String },
		label: { type: String },
		type: { type: String },
		value: { type: String },
		active: { type: Boolean },
		disableAutoComplete: { type: Boolean },
		onInput: { type: Object }
	}}

	static get styles() {
		return [css`${unsafeCSS(style)}`]
	}

	constructor() {
		super()

		this.id = ''
		this.name = ''
		this.label = ''
		this.type = 'text'
		this.value = ''
		this.active = false
		this.disableAutoComplete = false
		this.onInput = null
	}

	connectedCallback() {
		super.connectedCallback()

		setTimeout(() => this.handleChange())
	}

	/**
	 * funcs
	 */
	handleChange() {
		const input = this.shadowRoot.querySelector('input')

		if (input.value) {
			input.setAttribute('hasvalue', '')
		} else {
			input.removeAttribute('hasvalue')
		}

		this.value = input.value
	}

	handleInput() {
		if (this.onInput) {
			this.onInput()
		}
	}

	/**
	 * HTML
	 */
	render() {
		return html`
			<div class='root'>
				<input
					id=${this.id ? this.id : this.name}
					name=${this.name}
					type=${this.type}
					value=${this.value}
					autocomplete=${this.disableAutoComplete ? 'off' : ''}
					@change=${this.handleChange}
					@input=${this.handleInput}
				/>
				<label for=${this.id ? this.id : this.name}>${this.label}</label>
			</div>
		`
	}
}

customElements.define('wc-field', Field)