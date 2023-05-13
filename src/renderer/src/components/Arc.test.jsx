import { render } from '@testing-library/react'
import { Arc } from './Arc'
import { describe, expect, it, vi } from 'vitest'
import { act } from 'react-dom/test-utils'
import { ExperimentContext } from './Experiment'

/**
 * Unit tests for the Arc length component.
 *
 * This test suite includes a test to verify the functionality of the payload.
 * A test verifies the help menu is functional.
 * A test verifies the component is properly hidden when the visible prop is set to false.
 *
 * @author Steven Thao
 */
describe('Arc', () => {
	it('Initial payload correctly sets sliders', () => {
		const setPayload = vi.fn()
		const arc = render(
			<ExperimentContext.Provider value={{ colors: {} }}>
				<Arc
					payload={{ equation: 'x^2', range: [0, 10], numberOfSubdivisions: 1 }}
					visible={true}
					setPayload={setPayload}
				/>
			</ExperimentContext.Provider>
		)
		const values = [1, 0, 10]
		arc.container.querySelectorAll('.value').forEach((slider, key) => {
			expect(parseFloat(slider.innerHTML)).toBe(values[key])
		})
	})

	it('Clicking help button opens dialog', () => {
		const arc = render(
			<ExperimentContext.Provider value={{ colors: {} }}>
				<Arc
					payload={{ equation: 'x^2', range: [0, 5], numberOfSubdivisions: 15 }}
					visible={true}
					setPayload={vi.fn()}
				/>
			</ExperimentContext.Provider>
		)
		const dialog = arc.container.querySelector('.dialog').parentElement
		expect(getComputedStyle(dialog).display).toBe('none')
		act(() => {
			arc.container.querySelector('.helpButton').click()
		})
		expect(getComputedStyle(dialog).display).toBe('flex')
	})

	it('Setting visible to false properly masks experiment', () => {
		let arc = render(
			<ExperimentContext.Provider value={{ colors: {} }}>
				<Arc
					payload={{ equation: 'x^2', range: [0, 5], numberOfSubdivisions: 15 }}
					visible={true}
					setPayload={vi.fn()}
				/>
			</ExperimentContext.Provider>
		)
		expect(arc.container.querySelector('.container')).toBeTruthy()

		arc = render(
			<Arc
				payload={{ equation: 'x^2', range: 1, numberOfSubdivisions: 15 }}
				visible={false}
				setPayload={vi.fn()}
			/>
		)
		expect(arc.container.querySelector('.container')).toBeNull()
	})
})
