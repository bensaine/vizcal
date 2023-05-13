import { render } from '@testing-library/react'
import { ExperimentBase } from './ExperimentBase'
import { describe, it, vi, expect } from 'vitest'
import { act } from 'react-dom/test-utils'
import { ExperimentContext } from '../Experiment'

/**
 * Unit tests for the ExperimentBase component.
 *
 * This test suite includes a test to verify the functionality of the collapse button in the ExperimentBase component.
 * The test renders the ExperimentBase component and checks the initial state of the options menu.
 * It then simulates a click on the collapse button and checks that the options menu is collapsed as expected.
 *
 * @author Wassim Yahia
 */
describe('ExperimentBase', () => {
	it('Clicking on collapse button collapses options menu', () => {
		const experimentBase = render(
			<ExperimentContext.Provider value={{ experiment: { type: 'limit' } }}>
				<ExperimentBase
					optionsSlot={vi.fn()}
					graphSlot={vi.fn()}
					helpSlot={vi.fn()}
					output={vi.fn()}
				/>
			</ExperimentContext.Provider>
		)

		const options = experimentBase.container.querySelector('.options')
		expect(getComputedStyle(options).marginLeft).toBeFalsy()
		act(() => {
			experimentBase.container.querySelector('.collapseButton').click()
		})
		expect(getComputedStyle(options).marginLeft).toBe('-32rem')
	})
})
