import { X } from 'react-feather'
import styles from './Dialog.module.scss'

/**
 * A dialog component that can be opened or closed by changing the value of the `open` prop.
 * It displays a title, content and a close button. It also includes a backdrop that can be clicked
 * to close the dialog.
 *
 * @author Benjamin Saine
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the dialog.
 * @param {ReactElement} props.children - The content to be displayed in the dialog.
 * @param {boolean} props.open - Whether the dialog is open or closed.
 * @param {function} props.onClose - The function to be called when the dialog is closed.
 *
 * @example
 * <Dialog open={dialogOpen} title={'Dialog'} onClose={() => setDialogOpen(false)}>
 * <p>This is the content of my dialog.</p>
 * </Dialog>
 *
 * @returns {ReactElement} The dialog component.
 */
export const Dialog = ({ title, children, open, onClose }) => {
	return (
		<div className={styles.container} style={{ display: open ? 'flex' : 'none' }}>
			<dialog className={styles.dialog}>
				<div className={styles.header}>
					<h1 className={styles.title}>{title}</h1>
					<span className={styles.closeBtn} onClick={onClose}>
						<X />
					</span>
				</div>
				<div className={styles.content}>{children}</div>
			</dialog>
			<div className={styles.backdrop} onClick={onClose}></div>
		</div>
	)
}
