import styles from './Experiment.module.scss'
import { useRef } from 'react'
import { Expression, GraphingCalculator, useHelperExpression } from 'desmos-react'
import '../../assets/desmos.css'

export const Experiment = ({ optionsSlot, graphSlot, helpSlot }) => {
	return (
		<div className={styles.container}>
			<div className={styles.options}>{optionsSlot()}</div>
			<div className={styles.output}>
				<GraphingCalculator
					attributes={{ className: styles.calculator }}
					fontSize={12}
					zoomFit={false}
					projectorMode
					// expressions={false}
					backgroundColor={'red'}
					// invertedColors={true}
					// keypad={false}
					// toolbar={false}
					settingsMenu={false}
					zoomButtons={false}
					border={false}
				>
					{graphSlot()}
				</GraphingCalculator>
			</div>
		</div>
	)
}
