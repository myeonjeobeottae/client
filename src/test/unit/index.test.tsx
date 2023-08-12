import { render, screen } from '@testing-library/react'
import Home from '@/pages'

describe(`<Home />`, () => {
	it('Create Next App', () => {
		const { container } = render(<Home />)

		const home = screen.getByText('Home')

		expect(home).toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})
})
