import React, { useContext, useEffect, useState } from 'react'
import styles from './Colors.module.scss'
import { X } from 'react-feather'
import { Palette } from './Palette'

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
export const ColorItems = ({ id, title, color, setColor }) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={styles.colorItem}>
			<span className={styles.optionButtonTitle}>{title}</span>
			<div
				className={styles.color}
				style={{ backgroundColor: color }}
				onClick={() => setOpen(true)}
			></div>

			{/* popup palette selector */}
			{open && <Palette setColor={(color) => setColor(id, color)} setOpen={setOpen} />}
		</div>
	)
}
