import { render } from '@testing-library/react'
import { Limit } from './Limit'
import { describe, expect, it, vi } from 'vitest'
import { act } from 'react-dom/test-utils'
import { ExperimentContext } from './Experiment'

/**
 * Unit tests for the Limit component.
 *
 * This test suite includes a test to verify the functionality of the payload.
 * A test verifies the help menu is functional.
 * A test verifies the component is properly hidden when the visible prop is set to false.
 *
 * @author Benjamin Saine
 */
describe('Limit', () => {
	it('Initial payload correctly sets sliders', () => {
		const setPayload = vi.fn()
		const limit = render(
			<ExperimentContext.Provider value={{ colors: {} }}>
				<Limit
					payload={{ equation: 'x^2', xPoint: 1, epsilon: 0.1, delta: 0.2 }}
					visible={true}
					setPayload={setPayload}
				/>
			</ExperimentContext.Provider>
		)
		const values = [1, 0.1, 0.2]
		limit.container.querySelectorAll('.value').forEach((slider, key) => {
			expect(parseFloat(slider.innerHTML)).toBe(values[key])
		})
	})

	it('Clicking help button opens dialog', () => {
		const limit = render(
			<ExperimentContext.Provider value={{ colors: {} }}>
				<Limit
					payload={{ equation: 'x^2', xPoint: 1, epsilon: 0.1, delta: 0.1 }}
					visible={true}
					setPayload={vi.fn()}
				/>
			</ExperimentContext.Provider>
		)
		const dialog = limit.container.querySelector('.dialog').parentElement
		expect(getComputedStyle(dialog).display).toBe('none')
		act(() => {
			limit.container.querySelector('.helpButton').click()
		})
		expect(getComputedStyle(dialog).display).toBe('flex')
	})

	it('Setting visible to false properly masks experiment', () => {
		let limit = render(
			<ExperimentContext.Provider value={{ colors: {} }}>
				<Limit
					payload={{ equation: 'x^2', xPoint: 1, epsilon: 0.1, delta: 0.1 }}
					visible={true}
					setPayload={vi.fn()}
				/>
			</ExperimentContext.Provider>
		)
		expect(limit.container.querySelector('.container')).toBeTruthy()

		limit = render(
			<ExperimentContext.Provider value={{ colors: {} }}>
				<Limit
					payload={{ equation: 'x^2', xPoint: 1, epsilon: 0.1, delta: 0.1 }}
					visible={false}
					setPayload={vi.fn()}
				/>
			</ExperimentContext.Provider>
		)
		expect(limit.container.querySelector('.container')).toBeNull()
	})
})
