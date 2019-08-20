import { LitElement, html, css, unsafeCSS } from 'lit-element'
import style from './style.styl'
import fetcher from 'utils/api/index.js'
import debounce from 'utils/debounce'

class App extends LitElement {
	static get properties() {	return {
		active: { type: Boolean },
		contacts: {	type: Array, reflected: true	}
	}}

	static get styles() {
		return [css`${unsafeCSS(style)}`]
	}

	constructor() {
		super()

		this.active = false
		this.contacts = []
		this.untouchedContacts = []

		/**
		 * The Filter is working fine without debounce but it's
		 * a good practice add a debounce function to prevent
		 * unnecessary resource consumption
		 */
		this.debouncedFilter = debounce(this.filter, 500)
	}

	connectedCallback() {
		super.connectedCallback()
		this.initializeEvents()
		this.getContacts()
	}

	disconnectedCallback() {
		document.removeEventListener('filterContacts')
		super.disconnectedCallback()
	}

	/**
	 * funcs
	 */
	initializeEvents() {
		document.addEventListener('filterContacts', this.handleFilter)
	}

	getContacts() {
		fetcher({ url: 'https://jsonplaceholder.typicode.com/users' })
		.then(response => {
			console.log(response)
			this.contacts = response
			this.untouchedContacts = JSON.parse(JSON.stringify(response))
		})
	}

	handleFilter(event) {
		console.log('filter: ', event)
	}

	filter(value) {
		if (value) {
			let filteredContacts = []

			filteredContacts = this.recursiveFilter(this.untouchedContacts, value)

			console.log({ filteredContacts })
			this.contacts = filteredContacts
		} else {
			this.contacts = JSON.parse(JSON.stringify(this.untouchedContacts))
		}
	}

	recursiveFilter(data, value) {
		const keys = data.reduce((acc, item) => {
			const keys = Object.keys(item)
			if (keys.length > 0) {
				keys.forEach(key => {
					if (acc.indexOf(key) === -1) {
						acc.push(key)
					}
				})
			}

			return acc
		}, [])

		return data.reduce((acc, item) => {
			keys.forEach(key => {
				if (typeof item[key] == 'string') {
					if (item[key] == value || item[key].includes(value)) {
						acc.push(item)
					}
				} else if (typeof item[key] == 'array') {
					this.recursiveFilter(item[key], value)
				}
			})

			return acc.filter((data, index, self) => self.indexOf(data) >= index)
		}, [])
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
			<wc-top-bar></wc-top-bar>
			<wc-filter .onFilter=${this.debouncedFilter.bind(this)}></wc-filter>
			<div class='card-list'>
			${this.contacts.map(item =>
				html`<wc-contact-card data=${JSON.stringify(item)}></wc-contact-card>`)
			}
			</div>
		`
	}
}

customElements.define('instruct-app', App)