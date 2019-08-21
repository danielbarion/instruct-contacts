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

		this.radioGroupParams = [
			{ id: 'all', name:'params', label: 'All', checked: true },
			{ id: 'email', name: 'params', label: 'Email', checked: false },
			{ id: 'phone', name: 'params', label: 'Phone', checked: false },
			{ id: 'address', name: 'params', label: 'Address', checked: false }
		]

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

	handleClickRadioGroupParams(radio) {
		this.radioGroupParams.forEach(item => item.checked = item.id == radio.id)
		this.requestUpdate()
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
					${
						this.radioGroupParams.map(radio => html`
							<div class='radio'>
								<wc-radio
									id=${radio.id}
									name=${radio.name}
									label=${radio.label}
									?checked=${radio.checked}
									.click=${this.handleClickRadioGroupParams.bind(this)}
								>
								</ wc-radio>
							</div>
						`)
					}
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