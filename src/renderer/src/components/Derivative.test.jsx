import { render } from '@testing-library/react'
import { Derivative } from './Derivative'
import { describe, expect, it, vi } from 'vitest'
import { act } from 'react-dom/test-utils'

/**
 * Unit tests for the Derivative component.
 *
 * This test suite includes a test to verify the functionality of the payload.
 * A test verifies the help menu is functional.
 * A test verifies the component is properly hidden when the visible prop is set to false.
 *
 * @author Wassim Yahia
 */
describe('Derivative', () => {
	it('Initial payload correctly sets sliders', () => {
		const setPayload = vi.fn()
		const derivative = render(
			<Derivative
				payload={{ equation: 'x^2', xPoint: 1, runRiseVal: 0.1, derivOrder: 'First' }}
				visible={true}
				setPayload={setPayload}
			/>
		)
		const values = [1, 0.1]
		derivative.container.querySelectorAll('.value').forEach((slider, key) => {
			expect(parseFloat(slider.innerHTML)).toBe(values[key])
		})
	})

	it('Clicking help button opens dialog', () => {
		const derivative = render(
			<Derivative
				payload={{ equation: 'x^2', xPoint: 1, runRiseVal: 0.1, derivOrder: 'First' }}
				visible={true}
				setPayload={vi.fn()}
			/>
		)
		const dialog = derivative.container.querySelector('.dialog').parentElement
		expect(getComputedStyle(dialog).display).toBe('none')
		act(() => {
			derivative.container.querySelector('.helpButton').click()
		})
		expect(getComputedStyle(dialog).display).toBe('flex')
	})

	it('Setting visible to false properly masks experiment', () => {
		let derivative = render(
			<Derivative
				payload={{ equation: 'x^2', xPoint: 1, runRiseVal: 0.1, derivOrder: 'First' }}
				visible={true}
				setPayload={vi.fn()}
			/>
		)
		expect(derivative.container.querySelector('.container')).toBeTruthy()

		derivative = render(
			<Derivative
				payload={{ equation: 'x^2', xPoint: 1, runRiseVal: 0.1, derivOrder: 'First' }}
				visible={false}
				setPayload={vi.fn()}
			/>
		)
		expect(derivative.container.querySelector('.container')).toBeNull()
	})
})
