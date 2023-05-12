import { useEffect, useRef } from 'react'
import '../../assets/mathquill.css'
import '../../../jquery.js'
import '../../../mathquill.js'
import { ControlContainer } from './ControlContainer/ControlContainer'

/**
 * MathInput component. A text input box that serves as a formula editor through the use of MathQuill and LaTex
 *
 * @author Benjamin Saine
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the input element.
 * @param {string} props.label - The label for the input element.
 * @param {string} props.latex - The initial LaTeX value of the input.
 * @param {function} props.onChange - The callback function called when the input value changes.
 * @param {Object} props.config - Additional configuration options for MathQuill.
 * @param {function} props.mathquillDidMount - The callback function called when MathQuill is mounted.
 * @param {Object} props.otherProps - Additional props to be spread onto the underlying HTML element.
 * @returns {ReactElement} The rendered MathInput component.
 */
export const MathInput = ({
	id,
	label,
	latex,
	onChange,
	config,
	mathquillDidMount,
	...otherProps
}) => {
	// MathQuill fire 2 edit events on startup.
	const ignoreEditEvents = useRef(2)
	const mathField = useRef(null)
	const wrapperElement = useRef(null)

	// This is required to prevent state closure over the onChange function
	const onChangeRef = useRef(onChange)
	useEffect(() => {
		onChangeRef.current = onChange
	}, [onChange])

	// Setup MathQuill on the wrapperElement
	useEffect(() => {
		if (!wrapperElement.current) return

		let combinedConfig = {
			restrictMismatchedBrackets: true,
			handlers: {}
		}

		if (config) {
			combinedConfig = {
				...combinedConfig,
				...config
			}
		}

		const configEditHandler = combinedConfig.handlers.edit
		combinedConfig.handlers.edit = (mathField) => {
			if (configEditHandler) configEditHandler()

			if (ignoreEditEvents.current > 0) {
				ignoreEditEvents.current -= 1
			} else {
				if (onChangeRef.current) onChangeRef.current(mathField)
			}
		}

		// eslint-disable-next-line no-undef
		mathField.current = MathQuill.MathField(wrapperElement.current, combinedConfig)
		mathField.current.latex(latex || '')

		if (mathquillDidMount) mathquillDidMount(mathField.current)
	}, [wrapperElement])

	useEffect(() => {
		if (mathField.current && mathField.current.latex() !== latex) {
			mathField.current.latex(latex)
		}
	}, [latex])

	return (
		<ControlContainer id={id} label={label}>
			<span {...otherProps} ref={wrapperElement} />
		</ControlContainer>
	)
}
