import { fireEvent, render } from '@testing-library/react'
import { Settings } from './Settings'
import { describe, it, vi, expect } from 'vitest'

/**
 * Unit tests for the Settings component.
 *
 * These tests verify that selecting light mode calls the setTheme prop.
 *
 * @author Benjamin Saine, Mervin Tounou
 */
describe('Settings', () => {
	/**
	 * @author Benjamin Saine
	 */
	it('Selecting light mode calls setTheme prop', () => {
		const setTheme = vi.fn()
		const { getByText } = render(<Settings setTheme={setTheme} />)
		const themeSetting = getByText('Theme').nextSibling
		fireEvent.change(themeSetting, { target: { value: 'Dark' } })
		expect(setTheme).toHaveBeenCalledWith('Dark')
	})
	
	/**
	 * @author Mervin Tounou
	 */
	it('Selecting Courrier New calls setFont prop', () => {
		const setFont = vi.fn()
		const { getByText } = render(<Settings setFont={setFont} />)
		const fontSetting = getByText('Font').nextSibling
		fireEvent.change(fontSetting, { target: { value: 'Helvetica Neue' } })
		expect(setFont).toHaveBeenCalledWith('Helvetica Neue')
	})
})
