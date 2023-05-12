import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test case
afterEach(cleanup)

// Define mocking for Desmos and MathQuill
window.Desmos = {
	GraphingCalculator: () => {
		return {
			setExpression: vi.fn(),
			destroy: vi.fn(),
			removeExpression: vi.fn(),
			updateSettings: vi.fn(),
			HelperExpression: () => {
				return {
					observe: vi.fn(),
					unobserve: vi.fn(),
					numericValue: 0
				}
			}
		}
	}
}
window.URL.createObjectURL = vi.fn()
window.HTMLCanvasElement.prototype.getContext = vi.fn()

class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}
window.ResizeObserver = ResizeObserver

window.MathQuill = {
	MathField: () => {
		return { latex: vi.fn() }
	}
}
