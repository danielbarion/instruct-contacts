import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'

class Filter extends LitElement {
	static get properties() {	return {
		active: { type: Boolean },
		onFilter: { type: Object },
	}}

	static get styles() {
		return [css`${unsafeCSS(style)}`]
	}

	constructor() {
		super()

		this.active = false
		this.onFilter = null

		this.handleSearch = this.handleSearch.bind(this)
	}

	connectedCallback() {
		super.connectedCallback()

		this.initializeEvents()
		this.toggle = this.toggle.bind(this)

		this.toggle() // just for tests
	}

	disconnectedCallback() {
		document.removeEventListener('toggleFilter', this.toggle)

		super.disconnectedCallback()
	}

	/**
	 * funcs
	 */
	initializeEvents() {
		document.addEventListener('toggleFilter', this.toggle.bind(this))
	}

	toggle() {
		this.active = !this.active

		if (this.active) {
			this.setAttribute('active', '')
		} else {
			this.removeAttribute('active')
		}
	}

	handleClickOverlay() {
		this.toggle()
	}

	handleSearch(event) {
		const [input] = event.path
		const { value } = input

		if (this.onFilter) {
			this.onFilter(value)
		}
	}

	/**
	 * HTML
	 */
	render() {
		return html`
			<div class='root'>
				<div class='search'>
					<wc-field name='search' label='Search' disableautocomplete .oninput=${this.handleSearch}></ wc-field>
				</div>
				<div class='content'>
					<div class='radio'>
						<wc-radio id='all' name='param' label='All'></ wc-radio>
					</div>
					<div class='radio'>
						<wc-radio id='email' name='param' label='Email'></ wc-radio>
					</div>
					<div class='radio'>
						<wc-radio id='phone' name='param' label='Phone'></ wc-radio>
					</div>
					<div class='radio'>
						<wc-radio id='address' name='param' label='Address'></ wc-radio>
					</div>
				</div>
			</div>
			${this.overlay()}
		`
	}

	overlay() {
		return html`<div class='overlay' @click=${this.handleClickOverlay}></div>`
	}
}

customElements.define('wc-filter', Filter)