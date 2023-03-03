import { useLayoutEffect, useRef } from 'react'
import '../assets/mathquill.css'

export const StaticMath = ({ mathquillDidMount, children, ...otherProps }) => {
	const wrapperElement = useRef(null)
	const mathField = useRef(null)

	useLayoutEffect(() => {
		if (!wrapperElement) return

		mathField.current = window.MathQuill.StaticMath(wrapperElement.current)
		if (mathquillDidMount) mathquillDidMount(mathField.current)
	}, [wrapperElement, children])

	return (
		<span {...otherProps} ref={wrapperElement}>
			{children}
		</span>
	)
}
