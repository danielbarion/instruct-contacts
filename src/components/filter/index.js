import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'

class Filter extends LitElement {
	static get properties() {	return {
		active: { type: Boolean },
		onFilter: { type: Object },
		filterKeys: { type: Array }
	}}

	static get styles() {
		return [css`${unsafeCSS(style)}`]
	}

	constructor() {
		super()

		this.active = false
		this.onFilter = null
		this.filterKeys = []

		this.filterValue = ''
		this.fixedKeys = [
			{ id: 'all', name: 'params', label: 'All', checked: true }
		]
		this.radioGroupParams = []

		this.handleSearch = this.handleSearch.bind(this)
	}

	connectedCallback() {
		super.connectedCallback()

		this.initializeEvents()
		this.radioGroupParamsGenerate()

		this.toggle = this.toggle.bind(this)
	}

	attributeChangedCallback(name, oldValue, newValue) {
		super.attributeChangedCallback(name, oldValue, newValue)

		if (this.filterKeys.length > 0 && name == 'filterkeys' && oldValue !== newValue) {
			this.radioGroupParamsGenerate()
		}
	}

	disconnectedCallback() {
		document.removeEventListener('toggleFilter', this.toggle)
		document.removeEventListener('keydown', this.keyDown)

		super.disconnectedCallback()
	}

	/**
	 * funcs
	 */
	initializeEvents() {
		document.addEventListener('toggleFilter', this.toggle.bind(this))
		document.addEventListener('keydown', this.keyDown.bind(this))
	}

	keyDown(event) {
		const key = event.which

		switch (key) {
			// https://css-tricks.com/snippets/javascript/javascript-keycodes/

			case 13:
				/**
				 * key pressed: Enter
				 * close filter
				 */
				if (this.active) {
					this.toggle()
				}

				break

			default:
				break
		}
	}

	radioGroupParamsGenerate() {
		const dinamicKeys = this.filterKeys.reduce((acc, item) => {
			const key = {
				id: item,
				name: 'params',
				label: item.charAt(0).toUpperCase() + item.slice(1),
				checked: false
			}

			acc.push(key)

			return acc
		}, [])

		this.radioGroupParams = Object.assign([], dinamicKeys, this.fixedKeys)
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

		if (this.onFilter && this.filterValue) {
			const [selectedParam] = this.radioGroupParams.filter(item => item.checked)

			this.onFilter(this.filterValue, selectedParam.id)
		}

		this.requestUpdate()
	}

	handleSearch(event) {
		const path = event.path || (event.composedPath && event.composedPath())

		const [input] = path
		const { value } = input

		this.filterValue = value

		if (this.onFilter) {
			const [selectedParam] = this.radioGroupParams.filter(item => item.checked)

			this.onFilter(value, selectedParam.id)
		}
	}

	/**
	 * HTML
	 */
	render() {
		return html`
			${this.icons()}
			${this.main()}
			${this.overlay()}
		`
	}

	main() {
		return html`
			<div class='root'>
				${this.search()}
				${this.content()}
				${this.closeIcon()}
			</div>
		`
	}

	search() {
		return html`
			<div class='search'>
				<wc-field name='search' label='Search' disableautocomplete .oninput=${this.handleSearch}></ wc-field>
			</div>
		`
	}

	content() {
		return html`
			<div class='content'>
				${this.radioGroupParams.map(radio => html`
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
				`)}
			</div>
		`
	}

	closeIcon() {
		return html`
			<div class='close'>
				<i class="material-icons" @click=${this.toggle}>arrow_forward_ios</i>
			</div>
		`
	}

	overlay() {
		return html`<div class='overlay' @click=${this.handleClickOverlay}></div>`
	}

	icons() {
		return html`<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>`
	}
}

customElements.define('wc-filter', Filter)