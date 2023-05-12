import { render } from '@testing-library/react'
import { Riemann } from './Riemann'
import { describe, expect, it, vi } from 'vitest'
import { act } from 'react-dom/test-utils'

/**
 * Unit tests for the Riemann component.
 *
 * This test suite includes a test to verify the functionality of the payload.
 * A test verifies that the help menu is functional.
 * A test verifies that the component is properly hidden when the visible prop is set to false.
 *
 * @author Mervin Tounou
 */
describe('Riemann', () => {
	it('Initial payload correctly sets sliders', () => {
		const setPayload = vi.fn()
		const riemann = render(
			<Riemann
				payload={{
					equation: 'x^2',
					range: [-10, 10],
					direction: 'left',
					subdivisions: 500
				}}
				visible={true}
				setPayload={setPayload}
			/>
		)
		const values = [-10, 10, 500]
		riemann.container.querySelectorAll('.value').forEach((slider, key) => {
			expect(parseFloat(slider.innerHTML)).toBe(values[key])
		})
	})

	it('Clicking help button opens dialog', () => {
		const setPayload = vi.fn()
		const riemann = render(
			<Riemann
				payload={{
					equation: 'x^2',
					range: [-10, 10],
					direction: 'left',
					subdivisions: 500
				}}
				visible={true}
				setPayload={setPayload}
			/>
		)
		const dialog = riemann.container.querySelector('.dialog').parentElement
		expect(getComputedStyle(dialog).display).toBe('none')
		act(() => {
			riemann.container.querySelector('.helpButton').click()
		})
		expect(getComputedStyle(dialog).display).toBe('flex')
	})

	it('Setting visible to false properly masks experiment', () => {
		const setPayload = vi.fn()
		let riemann = render(
			<Riemann
				payload={{
					equation: 'x^2',
					range: [-10, 10],
					direction: 'left',
					subdivisions: 500
				}}
				visible={true}
				setPayload={setPayload}
			/>
		)
		expect(riemann.container.querySelector('.container')).toBeTruthy()

		riemann = render(
			<Riemann
				payload={{
					equation: 'x^2',
					range: [-10, 10],
					direction: 'left',
					subdivisions: 500
				}}
				visible={false}
				setPayload={setPayload}
			/>
		)
		expect(riemann.container.querySelector('.container')).toBeNull()
	})
})
