import { useContext, useEffect, useState } from 'react'
import { ColorItems } from './ColorItem'
import styles from './Colors.module.scss'
import { Tool, X } from 'react-feather'
import { ExperimentContext } from '../Experiment'
import { experiments } from '../../data/experiments'

/**
 * Colors is a React component for a color picker.
 * It uses the ExperimentContext to get the current experiment and its associated colors.
 * It provides an interface to select and modify these colors.
 *
 * @author Steven Thao
 * @component
 * @example
 * You would typically render this component within an ExperimentContext.Provider to ensure it has access to the necessary context.
 * <Colors />
 *
 * @returns {React.Element} The rendered component
 */
export const Colors = () => {
	const [open, setOpen] = useState(false)
	const { experiment, colors, setColors } = useContext(ExperimentContext)
	const [titles, setTitles] = useState({})

	// Set the titles of the color options once the experiment is loaded
	useEffect(() => {
		if (!experiment) return
		const colors = experiments.find((e) => e.type === experiment.type).colors
		const titles = Object.entries(colors).reduce((obj, [id, val]) => {
			obj[id] = val.title
			return obj
		}, {})
		setTitles(titles)
	}, [experiment])

	// Propagate color changes to the ExperimentContext
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
