import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders title and controls', () => {
    render(<App />)
    expect(screen.getByText(/KidsMath/i)).toBeInTheDocument()
    expect(screen.getByText(/Score:/i)).toBeInTheDocument()
    // Simple mode should default to +/- operators
    const plusCheckbox = screen.getByRole('checkbox', { name: '+' })
    const minusCheckbox = screen.getByRole('checkbox', { name: '-' })
    const multCheckbox = screen.getByRole('checkbox', { name: '×' })
    expect(plusCheckbox).toBeChecked()
    expect(minusCheckbox).toBeChecked()
    expect(multCheckbox).not.toBeChecked()

    // Try selecting Medium — mult should get enabled
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: '2' } })
    // After selecting higher difficulty, mult becomes available (app logic toggles to +,-,*)
    expect(multCheckbox).toBeChecked()
  })
})
