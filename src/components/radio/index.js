import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'

class Radio extends LitElement {
	static get properties() {	return {
		id: { type: String },
		name: { type: String },
		label: { type: String },
		checked: { type: Boolean },
		click: { type: Object }
	}}

	static get styles() {
		return [css`${unsafeCSS(style)}`]
	}

	constructor() {
		super()

		this.id = ''
		this.name = ''
		this.label = ''
		this.checked = false
		this.click = null
	}

	connectedCallback() {
		super.connectedCallback()
	}

	/**
	 * funcs
	 */
	handleClick() {
		this.click(this)
	}

	/**
	 * HTML
	 */
	render() {
		return html`
			<div class='root'>
				${ this.checked
					? html`<input id=${this.id} type='radio' name=${this.name} checked>`
						: html`<input id=${this.id} type='radio' name=${this.name}>`
				}
				<label for=${this.id} @click=${this.handleClick}>
					${this.label ? this.label : ''}
				</label>
			</div>
		`
	}
}

customElements.define('wc-radio', Radio)