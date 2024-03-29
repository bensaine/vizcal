import { Copy } from 'react-feather'
import styles from './NumericalOutput.module.scss'

/**
 * Component for the output element
 *
 * Generates a numerical output along with a copy button to copy the output to the clipboard.
 * This component is included in each experiment.
 *
 * @author Steven Thao
 * @component NumericalOutput
 * @param {Object} props - The component props.
 * @param {number} props.output - The numerical output to display.
 * @returns {ReactElement} The NumericalOutput component.
 */
export const NumericalOutput = ({ output }) => {
	return (
		<div className={styles.numericalOutput}>
			{!isNaN(output) ? output : 'No output'}
			<span className={styles.copy} onClick={() => navigator.clipboard.writeText(output)}>
				<Copy size={20} />
			</span>
		</div>
	)
}
