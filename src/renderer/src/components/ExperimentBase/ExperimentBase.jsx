import styles from './ExperimentBase.module.scss'
import { useState } from 'react'
import '../../../jquery.js'
import '../../../desmos.js'
import { Dialog } from '../Dialog/Dialog'
import { HelpCircle, ArrowLeftCircle, ArrowRightCircle } from 'react-feather'
import '../../assets/desmos.css'
import { GraphingCalculator } from 'desmos-react'
import { NumericalOutput } from '../NumericalOutput/NumericalOutput'
import { Colors } from '../Colors/Colors'

/**
 * This is a base component for experiments. It provides a collapsible options section on the left,
 * a Desmos graphing calculator section on the right, and a dialog for additional help.
 *
 * @author Benjamin Saine, Wassim Yahia
 * @component
 * @param {Object} props - Component properties.
 * @param {function} props.optionsSlot - A function that returns JSX for populating the options section.
 * @param {function} props.graphSlot - A function that returns JSX for populating the graphing calculator section.
 * @param {function} props.helpSlot - A function that returns JSX for populating the help dialog.
 * @param {number} props.output - A numerical output to be displayed in the options footer.
 *
 * @example
 * <ExperimentBase
 *   optionsSlot={() => <div>Option Content</div>}
 *   graphSlot={() => <div>Graph Content</div>}
 *   helpSlot={() => <div>Help Content</div>}
 *   output={123}
 * />
 *
 * @returns {ReactElement} The rendered ExperimentBase component.
 */
export const ExperimentBase = ({ optionsSlot, graphSlot, helpSlot, output }) => {
	const [helpOpen, setHelpOpen] = useState(false)
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [color] = useState('black')

	return (
		<div className={styles.container}>
			<section className={styles.options + (isCollapsed ? ' ' + styles.collapsed : '')}>
				<span className={styles.helpButton} onClick={() => setHelpOpen(true)}>
					<HelpCircle />
				</span>
				<div className={styles.optionsBody}>{optionsSlot()}</div>
				<div className={styles.optionsFooter}>
					<NumericalOutput output={output} />
				</div>
			</section>
			<section className={styles.output}>
				<span
					className={styles.collapseButton}
					onClick={() => setIsCollapsed(!isCollapsed)}
				>
					{isCollapsed ? <ArrowRightCircle /> : <ArrowLeftCircle />}
				</span>
				<GraphingCalculator
					attributes={{ className: styles.calculator }}
					fontSize={12}
					zoomFit={false}
					projectorMode
					expressions={false}
					keypad={false}
					settingsMenu={false}
					zoomButtons={false}
					border={false}
					invertedColors={localStorage.getItem('theme') === 'Light'}
				>
					{graphSlot(color)}
				</GraphingCalculator>
				<Colors />
			</section>
			<Dialog open={helpOpen} title={'Help'} onClose={() => setHelpOpen(false)}>
				{helpSlot()}
			</Dialog>
		</div>
	)
}
