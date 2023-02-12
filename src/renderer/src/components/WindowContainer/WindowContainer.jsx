import styles from './WindowContainer.module.scss'

export const WindowContainer = ({ children }) => {
	return <div className={styles.windowContainer}>{children}</div>
}
