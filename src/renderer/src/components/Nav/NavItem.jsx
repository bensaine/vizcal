import useExperiment from '../../hooks/useExperiment'
import styles from './Nav.module.scss'

export const NavItem = ({ id, focus, onClick }) => {
	const { experiment, loading, error } = useExperiment(id)

	if (loading || error) return null

	return (
		<li className={focus ? styles.active : ''} onClick={() => onClick(id)}>
			{experiment.type}
		</li>
	)
}
