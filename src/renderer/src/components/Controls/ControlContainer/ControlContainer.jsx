import styles from './ControlContainer.module.scss'

export const ControlContainer = ({ id, label, disabled, children }) => {
	return (
		<span className={styles.inputContainer + ' ' + (disabled ? styles.disabled : '')}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			{children}
		</span>
	)
}
