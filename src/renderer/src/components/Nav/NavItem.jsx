import useExperiment from '../../hooks/useExperiment'
import { experiments } from '../../data/experiments'
import styles from './Nav.module.scss'

export const NavItem = ({ id, focus, onClick }) => {
	const { experiment, loading, error } = useExperiment(id)

	if (loading || error) return null

	return (
		<li className={focus ? styles.active : ''} onClick={() => onClick(id)}>
			<img
				className={styles.icon}
				src={experiments.find((e) => e.type == experiment.type).image}
				alt={experiments.find((e) => e.type == experiment.type).displayName + ' logo'}
			/>
		</li>
	)
}
