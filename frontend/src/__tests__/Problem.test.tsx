import { render, screen, fireEvent } from '@testing-library/react'
import Problem from '../components/Problem'

describe('Problem', () => {
  it('renders an equation and accepts input (with simple operators)', async () => {
    render(<Problem level={1} allowedOperators={["+", "-"]} />)
    const input = screen.getByRole('textbox', { name: /answer/i })
    expect(input).toBeInTheDocument()
    const opEl = screen.getByText(/\+|-/)
    // operator should be + or - when using simple operators
    expect(opEl).toBeTruthy()
    fireEvent.change(input, { target: { value: '5' } })
    expect((input as HTMLInputElement).value).toBe('5')
  })
})
