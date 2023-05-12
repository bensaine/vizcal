import { fireEvent, render } from '@testing-library/react'
import { Derivative } from './Derivative'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { act } from 'react-dom/test-utils'

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
		console.log(getComputedStyle(dialog).display)
		expect(getComputedStyle(dialog).display).toBe('none')
		act(() => {
			derivative.container.querySelector('.helpButton').click()
		})
		console.log(getComputedStyle(dialog).display)
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