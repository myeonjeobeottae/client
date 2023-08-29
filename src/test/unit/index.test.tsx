import { render, screen } from '@testing-library/react'
import LandingPage from '@/pages'
import userEvent from '@testing-library/user-event'

describe(`<LandingPage />`, () => {
	it('chat버튼을 누르면 chat 페이지로 이동한다.', () => {
		render(<LandingPage />)
		const chatButton = screen.getByRole('button', { name: 'chat' })
		userEvent.click(chatButton)

		expect(global.window.location.href).toContain('/chat')
	})
})
