import { fireEvent, render } from '@testing-library/react'
import { Limit } from './Limit'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { act } from 'react-dom/test-utils'

describe('Limit', () => {
	it('Initial payload correctly sets sliders', () => {
		const setPayload = vi.fn()
		const limit = render(
			<Limit
				payload={{ equation: 'x^2', xPoint: 1, epsilon: 0.1, delta: 0.2 }}
				visible={true}
				setPayload={setPayload}
			/>
		)
		const values = [1, 0.1, 0.2]
		limit.container.querySelectorAll('.value').forEach((slider, key) => {
			expect(parseFloat(slider.innerHTML)).toBe(values[key])
		})
	})

	it('Clicking help button opens dialog', () => {
		const limit = render(
			<Limit
				payload={{ equation: 'x^2', xPoint: 1, epsilon: 0.1, delta: 0.1 }}
				visible={true}
				setPayload={vi.fn()}
			/>
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
			<Limit
				payload={{ equation: 'x^2', xPoint: 1, epsilon: 0.1, delta: 0.1 }}
				visible={true}
				setPayload={vi.fn()}
			/>
		)
		expect(limit.container.querySelector('.container')).toBeTruthy()

		limit = render(
			<Limit
				payload={{ equation: 'x^2', xPoint: 1, epsilon: 0.1, delta: 0.1 }}
				visible={false}
				setPayload={vi.fn()}
			/>
		)
		expect(limit.container.querySelector('.container')).toBeNull()
	})
})
