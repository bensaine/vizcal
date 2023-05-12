import styles from './WindowContainer.module.scss'

/**
 * A container component for holding multiple windows.
 *
 * This component represents the container allowing the user to navigate between different windows.
 * The "Home" and "Settings" components are located in the WindowContainer.
 * Experiments are also located in the WindowContainer.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the container.
 * @return {JSX.Element} The WindowContainer component.
 */
export const WindowContainer = ({ children }) => {
	return <main className={styles.windowContainer}>{children}</main>
}
