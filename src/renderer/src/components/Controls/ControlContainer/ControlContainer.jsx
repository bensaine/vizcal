import styles from './ControlContainer.module.scss'

export const ControlContainer = ({ id, label, children }) => {
	return (
		<span className={styles.inputContainer}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			{children}
		</span>
	)
}
