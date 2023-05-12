import { fireEvent, render } from '@testing-library/react'
import { Settings } from './Settings'
import { describe, it, vi, expect } from 'vitest'

describe('Settings', () => {
	it('Selecting light mode calls setTheme prop', () => {
		const setTheme = vi.fn()
		const { getByText } = render(<Settings setTheme={setTheme} />)
		const themeSetting = getByText('Theme').nextSibling
		fireEvent.change(themeSetting, { target: { value: 'Dark' } })
		expect(setTheme).toHaveBeenCalledWith('Dark')
	})
})
