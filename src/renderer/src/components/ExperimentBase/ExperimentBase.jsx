import styles from './ExperimentBase.module.scss'
import { useEffect, useState } from 'react'
import '../../../jquery.js'
import '../../../desmos.js'
import { Dialog } from '../Dialog/Dialog'
import { HelpCircle } from 'react-feather'
import '../../assets/desmos.css'
import { GraphingCalculator } from 'desmos-react'

export const ExperimentBase = ({ optionsSlot, graphSlot, helpSlot = () => {} }) => {
	const [helpOpen, setHelpOpen] = useState(false)

	return (
		<div className={styles.container}>
			<div className={styles.options}>
				<span className={styles.helpButton} onClick={() => setHelpOpen(true)}>
					<HelpCircle />
				</span>
				{optionsSlot()}
			</div>
			<div className={styles.output}>
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
