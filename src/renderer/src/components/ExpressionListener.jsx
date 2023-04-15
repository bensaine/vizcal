import { useHelperExpression } from 'desmos-react'
import { useEffect } from 'react'

export const ExpressionListener = ({ latex, onExpressionChange }) => {
	const expression = useHelperExpression({ latex })

	useEffect(() => {
		onExpressionChange(expression)
	}, [expression])

	return null
}
