import styles from './Experiment.module.scss'
import { useRef, useState } from 'react'
import { Expression, GraphingCalculator, useHelperExpression } from 'desmos-react'
import { Dialog } from '../Dialog/Dialog'
import { HelpCircle } from 'react-feather'
import '../../assets/desmos.css'

export const Experiment = ({ optionsSlot, graphSlot, helpSlot = () => {} }) => {
	const [helpOpen, setHelpOpen] = useState(false)

	return (
		<div className={styles.container}>
			<div className={styles.options}>
				<span className={styles.helpButton} onClick={() => setHelpOpen(true)}><HelpCircle/></span>
				{optionsSlot()}</div>
			<div className={styles.output}>
				<GraphingCalculator
					attributes={{ className: styles.calculator }}
					fontSize={12}
					zoomFit={false}
					projectorMode
					expressions={false}
					backgroundColor={'red'}
					// invertedColors={true}
					keypad={false}
					toolbar={false}
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
