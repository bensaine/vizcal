import { render } from '@testing-library/react'
import { ExperimentBase } from './ExperimentBase'
import { describe, it, vi, expect } from 'vitest'
import { act } from 'react-dom/test-utils'

describe('ExperimentBase', () => {
	it('Clicking on collapse button collapses options menu', () => {
		const experimentBase = render(
			<ExperimentBase
				optionsSlot={vi.fn()}
				graphSlot={vi.fn()}
				helpSlot={vi.fn()}
				output={vi.fn()}
			/>
		)

		const options = experimentBase.container.querySelector('.options')
		expect(getComputedStyle(options).marginLeft).toBeFalsy()
		act(() => {
			experimentBase.container.querySelector('.collapseButton').click()
		})
		expect(getComputedStyle(options).marginLeft).toBe('-32rem')
	})
})
