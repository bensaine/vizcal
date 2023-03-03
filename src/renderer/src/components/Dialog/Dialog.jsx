import { X } from 'react-feather'
import styles from './Dialog.module.scss'

export const Dialog = ({ title, children, open, onClose }) => {
	return (
		<div className={styles.container} style={{ display: open ? 'flex' : 'none' }}>
			<div className={styles.dialog}>
				<div className={styles.header}>
					<h1 className={styles.title}>{title}</h1>
					<span className={styles.closeBtn} onClick={onClose}>
						<X />
					</span>
				</div>
				<div className={styles.content}>{children}</div>
			</div>
			<div className={styles.backdrop} onClick={onClose}></div>
		</div>
	)
}
