import useExperiment from '../../hooks/useExperiment'
import { experiments } from '../../data/experiments'
import styles from './Nav.module.scss'
import { X } from 'react-feather'

export const NavItem = ({ id, focus, onClick, closeExperiment }) => {
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
