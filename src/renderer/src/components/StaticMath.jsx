import { useLayoutEffect, useRef } from 'react'
import '../assets/mathquill.css'
import '../../jquery.js'
import '../../mathquill.js'

export const StaticMath = ({ mathquillDidMount, children, ...otherProps }) => {
	const wrapperElement = useRef(null)
	const mathField = useRef(null)

	useLayoutEffect(() => {
		if (!wrapperElement) return

		// eslint-disable-next-line no-undef
		mathField.current = MathQuill.StaticMath(wrapperElement.current)
		if (mathquillDidMount) mathquillDidMount(mathField.current)
	}, [wrapperElement, children])

	return (
		<span {...otherProps} ref={wrapperElement}>
			{children}
		</span>
	)
}
