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
		disableAutoComplete: { type: Boolean }
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
	}

	connectedCallback() {
		super.connectedCallback()

		setTimeout(() => this.handleChange())
	}

	/**
	 * funcs
	 */
	handleInputValue(event) {
		if (event.inputType === 'insertText') {
			this.value += event.data
		} else if (event.inputType === 'deleteContentBackward') {
			this.value = this.value.slice(0, this.value.length - 1)
		}
	}

	handleChange() {
		const input = this.shadowRoot.querySelector('input')

		if (this.value) {
			input.setAttribute('hasvalue', '')
		} else {
			input.removeAttribute('hasvalue')
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
					@input=${this.handleInputValue}
					@change=${this.handleChange}
				/>
				<label for=${this.id ? this.id : this.name}>${this.label}</label>
			</div>
		`
	}
}

customElements.define('wc-field', Field)