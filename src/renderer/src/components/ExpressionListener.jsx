import { useHelperExpression } from 'desmos-react'
import { useEffect } from 'react'

/**
 * This component listens for changes to a Desmos expression and triggers a callback when the expression changes.
 * The component does not render anything in the DOM.
 *
 * @author Steven Thao
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.latex - The latex expression to listen for changes on.
 * @param {function} props.onExpressionChange - The callback function to be invoked when the expression changes. This function will receive the updated expression as a parameter.
 *
 * @example
 *
 * <ExpressionListener
 *   latex={'x'}
 *   onExpressionChange={(newExpression) => console.log(newExpression)}
 * />
 *
 * @returns {null} This component does not render anything, it only has side effects (triggering the callback).
 */
export const ExpressionListener = ({ latex, onExpressionChange }) => {
	const expression = useHelperExpression({ latex })

	useEffect(() => {
		onExpressionChange(expression)
	}, [expression])

	return null
}
