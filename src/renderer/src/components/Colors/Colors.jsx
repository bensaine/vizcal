import React, { useState } from 'react'
import { ColorItems } from './ColorItem'
import styles from './Colors.module.scss'
import { Tool, X } from 'react-feather'

/**
 * A component that renders a color menu button and allows users to select a color from a list of options.
 *
 * @author Steven Thao
 * @component
 * @param {object} props - The props that are passed to the component.
 * @param {Array<string>} props.colorArray - The array that contains the possible choices of color change.
 * @param {string} props.experiment - The experiment for which the color is being selected.
 * @returns {JSX.Element} - A JSX element that renders a color menu button and a list of color options.
 */
export const Colors = ({ colorArray, experiment }) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={styles.outerColorContainer}>
			{!open && (
				<span
					className={open ? styles.colorMenuButtonActive : styles.colorMenuButton}
					onClick={() => setOpen((prev) => !prev)}
				>
					<Tool />
				</span>
			)}
			{open && (
				<>
					<div className={styles.optionsContainer}>
						{colorArray.map((names) => (
							<ColorItems
								key={names}
								title={names}
								experiment={experiment}
							></ColorItems>
						))}
					</div>
				</>
			)}
		</div>
	)
}
