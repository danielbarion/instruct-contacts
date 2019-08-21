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

		this.filterKeys = []

		/**
		 * The Filter is working fine without debounce but it's
		 * a good practice add a debounce function to prevent
		 * unnecessary resource consumption (like memory leak)
		 */
		this.debouncedFilter = debounce(this.handleFilter, 500)
	}

	connectedCallback() {
		super.connectedCallback()
		this.getContacts()
	}

	/**
	 * funcs
	 */

	getContacts() {
		fetcher({ url: 'https://jsonplaceholder.typicode.com/users' })
		.then(response => {
			this.contacts = response
			// Remove memory reference when save initial data into a var
			this.untouchedContacts = JSON.parse(JSON.stringify(response))

			this.getFilterKeys(response)
		})
	}

	handleFilter(value, param) {
		if (value) {
			let filteredContacts = []
			filteredContacts = this.recursiveFilter(this.untouchedContacts, value, param)

			this.contacts = filteredContacts
	 	} else {
			this.contacts = JSON.parse(JSON.stringify(this.untouchedContacts))
		}
	}

	/**
	 * If the data input is an array, the output will be an array
	 * If the data input is an object, the output will be a boolean
	 * @param {Array | Object} data
	 * @param {String} value
	 * @param {String} param
	 */
	recursiveFilter(data, value, param) {
		if (value && data.length && data.length > 0) {
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
					if (param === 'all' || key === param) {
						if (typeof item[key] == 'string') {
							if (item[key] == value || item[key].includes(value)) {
								acc.push(item)
							}
						} else if (typeof item[key] == 'object') {
							if (this.recursiveFilter(item[key], value, param)) {
								acc.push(item)
							}
						}
					}
				})

				return acc.filter((data, index, self) => self.indexOf(data) >= index)
			}, [])
		} else if (value && !data.length) {
			const keys = Object.keys(data)

			return keys.reduce((acc, key) => {
				if (typeof data[key] == 'string') {
					if (data[key] == value || data[key].includes(value)) {
						acc = true
					}
				}

				return acc
			}, false)
		}

		return []
	}

	/**
	 * This function return just the first level of object keys.
	 * Q: Why not recursive ?
	 * A: To prevent confusion between same keys like 'name'
	 * attr in a different level.
	 * @param {*} data
	 */
	getFilterKeys(data) {
		if (data.length && data.length > 0) {
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

			this.filterKeys = keys.filter((data, index, self) => self.indexOf(data) >= index)
		}
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
			<wc-filter .onFilter=${this.debouncedFilter.bind(this)} filterKeys=${JSON.stringify(this.filterKeys)}></wc-filter>
			<div class='card-list'>
			${this.contacts.map(item =>
				html`<wc-contact-card data=${JSON.stringify(item)}></wc-contact-card>`)
			}
			</div>
		`
	}
}

customElements.define('instruct-app', App)