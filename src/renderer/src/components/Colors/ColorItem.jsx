import React, { useContext, useEffect, useState } from 'react'
import styles from './Colors.module.scss'
import { Context } from './ContextProvider.jsx'
import { X } from 'react-feather'

/**
 * Responsible to render the different option buttons as well as the list of color options.
 *
 * @author Steven Thao
 * @component
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the button
 * @param {string} props.experiment - The experiment type
 * @returns {JSX.Element} - Returns the UI components for color selection
 */
export const ColorItems = ({ title, experiment }) => {
	const [open, setOpen] = useState(false)
	const ctx = useContext(Context)
	const COLORS = ['#ffffff', '#c74440', '#ffc0cb', '#388c46', '#6042a6', '#fa7e19', '#000000']

	/**
	 * Changes the color of the selected graph line.
	 * @param {string} color - The selected color
	 */
	function handleColorChange(color) {
		switch (title) {
			case 'Function':
				switch (experiment) {
					case 'Limit':
						ctx.limit.setFunctionColorLimit(color)
						break
					case 'Derivative':
						ctx.derivative.setFunctionColorDerivative(color)
						break
					case 'Riemann':
						ctx.riemann.setFunctionColorRiemann(color)
						break
					case 'Arc':
						ctx.arc.setFunctionColorArc(color)
						break
					default:
						break
				}
				break
			case 'Delta Lines':
				ctx.limit.setDeltaColor(color)
				break
			case 'Epsilon Lines':
				ctx.limit.setEpsilonColor(color)
				break
			case 'Run & Rise':
				ctx.derivative.setRunRiseColor(color)
				break
			case 'Rectangles Positive':
				ctx.riemann.setRiemannColorPos(color)
				break
			case 'Rectangles Negative':
				ctx.riemann.setRiemannColorNeg(color)
				break
			case 'Arc Lines':
				ctx.arc.setArcColor(color)
				break
			default:
				break
		}

		if (title === 'Delta Lines') {
			ctx.setDeltaColor(color)
		}
	}

	return (
		<div className={styles.colorItem}>
			<span className={styles.optionButtonTitle}>{title}</span>
			<div
				className={styles.color}
				style={{ backgroundColor: 'white' }}
				onClick={() => setOpen(true)}
			></div>

			{/* popup palette selector */}
			{open && (
				<div className={styles.palette}>
					{COLORS.map((color) => (
						<div
							key={color}
							className={styles.color}
							style={{ backgroundColor: color }}
							onClick={() => {
								handleColorChange(color)
								setOpen(false)
							}}
						></div>
					))}
				</div>
			)}
		</div>
	)
}
