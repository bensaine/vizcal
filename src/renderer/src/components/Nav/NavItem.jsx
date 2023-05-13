import useExperiment from '../../hooks/useExperiment'
import { experiments } from '../../data/experiments'
import styles from './Nav.module.scss'
import { X } from 'react-feather'

/**
 * `NavItem` is a React functional component that displays a navigation item
 * with an optional focus, onClick handler, and a method to close the experiment.
 *
 * @author Benjamin Saine
 * @component NavItem
 * @param {Object} props - The properties that define the `NavItem` component.
 * @param {string} props.id - The unique identifier of the experiment.
 * @param {boolean} props.focus - Determines whether the navigation item is focused or not.
 * @param {Function} props.onClick - A handler function for the click event.
 * @param {Function} props.closeExperiment - A method to close the experiment.
 *
 * @returns {ReactElement|null} A list item element for the navigation menu or null if the experiment is loading or there is an error.
 */
export const NavItem = ({ id, focus, onClick, closeExperiment }) => {
	// Get the experiment data based on the id
	const { experiment, loading, error } = useExperiment(id)

	if (loading || error) return null

	return (
		<li className={focus ? styles.active : ''}>
			<span className={styles.closeBtn} onClick={() => closeExperiment(id)}>
				<X className={styles.closeIcon} />
			</span>
			<img
				className={styles.icon}
				onClick={() => onClick(id)}
				src={experiments.find((e) => e.type == experiment.type).image}
				alt={experiments.find((e) => e.type == experiment.type).displayName + ' logo'}
			/>
		</li>
	)
}
