import styles from './ControlContainer.module.scss'

/**
 * ControlContainer component that uniformely styles every control.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the control container.
 * @param {string} props.label - The label for the control container.
 * @param {boolean} props.disabled - Specifies if the control container should be disabled.
 * @param {ReactNode} props.children - The content within the control container.
 * @returns {ReactElement} The rendered ControlContainer component.
 */

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
