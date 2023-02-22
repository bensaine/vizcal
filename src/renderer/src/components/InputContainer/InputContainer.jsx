import styles from './InputContainer.module.scss'

export const InputContainer = ({ id, label, children }) => {
	return (
		<span className={styles.inputContainer}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			{children}
		</span>
	)
}
