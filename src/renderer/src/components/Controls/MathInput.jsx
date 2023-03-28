import { useEffect, useRef } from 'react'
import '../../assets/mathquill.css'
import '../../../jquery.js'
import '../../../mathquill.js'
import { ControlContainer } from './ControlContainer/ControlContainer'

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