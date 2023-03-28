import styles from './ExperimentBase.module.scss'
import { useState } from 'react'
import '../../../jquery.js'
import '../../../desmos.js'
import { Dialog } from '../Dialog/Dialog'
import { HelpCircle, ArrowLeftCircle, ArrowRightCircle } from 'react-feather'
import '../../assets/desmos.css'
import { GraphingCalculator } from 'desmos-react'

export const ExperimentBase = ({ optionsSlot, graphSlot, helpSlot = () => {} }) => {
	const [helpOpen, setHelpOpen] = useState(false)
	const [isCollapsed, setIsCollapsed] = useState(false)

	return (
		<div className={styles.container}>
			<div className={styles.options + (isCollapsed ? ' ' + styles.collapsed : '')}>
				<span className={styles.helpButton} onClick={() => setHelpOpen(true)}>
					<HelpCircle />
				</span>
				{optionsSlot()}
			</div>
			<div className={styles.output}>
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
			</div>
			<Dialog open={helpOpen} title={'Help'} onClose={() => setHelpOpen(false)}>
				{helpSlot()}
			</Dialog>
		</div>
	)
}
