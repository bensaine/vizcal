import React, { useContext, useEffect, useState } from 'react'
import { ColorItems } from './ColorItem'
import styles from './Colors.module.scss'
import { Tool, X } from 'react-feather'
import { ExperimentContext } from '../Experiment'
import { experiments } from '../../data/experiments'

/**
 * A component that renders a color menu button and allows users to select a color from a list of options.
 *
 * @author Steven Thao
 * @component
 * @returns {JSX.Element} - A JSX element that renders a color menu button and a list of color options.
 */
export const Colors = () => {
	const [open, setOpen] = useState(false)
	const { experiment, colors, setColors } = useContext(ExperimentContext)
	const [titles, setTitles] = useState({})

	useEffect(() => {
		if (!experiment) return
		const colors = experiments.find((e) => e.type === experiment.type).colors
		const titles = Object.entries(colors).reduce((obj, [id, val]) => {
			obj[id] = val.title
			return obj
		}, {})
		setTitles(titles)
	}, [experiment])

	const setColor = (id, color) => {
		colors[id] = color
		setColors(colors)
	}

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
					<span className={styles.closeButton} onClick={() => setOpen(false)}>
						<X size={16} />
					</span>
					<span className={styles.colorSelectorTitle}>Color Customization</span>
					<div className={styles.optionsContainer}>
						{Object.entries(colors).map(([id, color]) => (
							<ColorItems
								key={id}
								id={id}
								title={titles[id]}
								color={color}
								setColor={setColor}
							></ColorItems>
						))}
					</div>
				</>
			)}
		</div>
	)
}
