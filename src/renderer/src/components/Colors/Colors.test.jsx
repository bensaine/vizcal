import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Colors } from './Colors'
import { ExperimentContext } from '../Experiment'
import { act } from 'react-dom/test-utils'

/**
 * Unit tests for the Colors component.
 *
 * These tests verify that clicking the wrench correctly opens the color menu.
 *
 * @author Steven Thao
 */
describe('Colors', () => {
	it('Clicking wrench button opens the color menu', () => {
		const { queryByTestId } = render(
			<ExperimentContext.Provider value={{ experiment: { type: 'limit' }, colors: {} }}>
				<Colors />
			</ExperimentContext.Provider>
		)
		const button = queryByTestId('wrenchButton')
		let colors = queryByTestId('colors')
		expect(colors).toBeNull()
		act(() => {
			button.click()
		})
		colors = queryByTestId('colors')
		expect(colors).toBeTruthy()
	})
})
