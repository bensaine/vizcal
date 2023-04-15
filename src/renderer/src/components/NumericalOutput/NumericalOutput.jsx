import { Copy } from 'react-feather'
import styles from './NumericalOutput.module.scss'

export const NumericalOutput = ({ output }) => {
	return (
		<div className={styles.numericalOutput}>
			{output}
			<span className={styles.copy} onClick={() => navigator.clipboard.writeText(output)}>
				<Copy size={20} />
			</span>
		</div>
	)
}
