import styles from './WindowContainer.module.scss'

export const WindowContainer = ({ children }) => {
	return <main className={styles.windowContainer}>{children}</main>
}
