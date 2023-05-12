import styles from './ExperimentBase.module.scss'
import { useState } from 'react'
import '../../../jquery.js'
import '../../../desmos.js'
import { Dialog } from '../Dialog/Dialog'
import { HelpCircle, ArrowLeftCircle, ArrowRightCircle } from 'react-feather'
import '../../assets/desmos.css'
import { GraphingCalculator } from 'desmos-react'
import { NumericalOutput } from '../NumericalOutput/NumericalOutput'

export const ExperimentBase = ({ optionsSlot, graphSlot, helpSlot, output }) => {
	const [helpOpen, setHelpOpen] = useState(false)
	const [isCollapsed, setIsCollapsed] = useState(false)

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
					{graphSlot()}
				</GraphingCalculator>
			</section>
			<Dialog open={helpOpen} title={'Help'} onClose={() => setHelpOpen(false)}>
				{helpSlot()}
			</Dialog>
		</div>
	)
}
