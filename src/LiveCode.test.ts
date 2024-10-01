import {LiveCode} from './LiveCode.js'

declare global {
	const expect: any
}

describe('<live-code>', () => {
	it('is a custom element', () => {
		const editor = document.createElement('live-code')
		expect(editor instanceof LiveCode).toBe(true)
	})

	// ... TODO ...
})
