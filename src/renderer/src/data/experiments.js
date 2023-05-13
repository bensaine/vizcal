import { Arc } from '../components/Arc'
import { Derivative } from '../components/Derivative'
import { Limit } from '../components/Limit'
import { Riemann } from '../components/Riemann'
import eps from '../assets/images/icons/eps.svg'
import slope from '../assets/images/icons/slope.svg'
import riemann from '../assets/images/icons/riemann.svg'
import arc from '../assets/images/icons/arc.svg'

/**
 * Experiments
 * Defines the experiments that are available to the user.
 *
 * @author Benjamin Saine
 * @typedef {Object} Experiment
 *
 */
export const experiments = [
	{
		type: 'limit',
		displayName: 'Limit',
		category: 'Limits',
		image: eps,
		component: Limit,
		colors: {
			function: {
				title: 'Function',
				default: '#ffffff'
			},
			delta: {
				title: 'Delta Lines',
				default: '#ffffff'
			},
			epsilon: {
				title: 'Epsilon Lines',
				default: '#ffffff'
			}
		}
	},
	{
		type: 'slope',
		displayName: 'Derivative',
		category: 'Derivatives',
		image: slope,
		component: Derivative,
		colors: {
			function: {
				title: 'Function',
				default: '#ffffff'
			},
			runRise: {
				title: 'Run & Rise',
				default: '#ffffff'
			}
		}
	},
	{
		type: 'riemannSum',
		displayName: 'Riemann Sum',
		category: 'Area Under Curve',
		image: riemann,
		component: Riemann,
		colors: {
			function: {
				title: 'Function',
				default: '#ffffff'
			},
			rectanglesPos: {
				title: 'Rectangles Positive',
				default: '#0000ff'
			},
			rectanglesNeg: {
				title: 'Rectangles Negative',
				default: '#ff0000'
			}
		}
	},
	{
		type: 'arcLength',
		displayName: 'Arc Length',
		category: 'Arc Length',
		image: arc,
		component: Arc,
		colors: {
			function: {
				title: 'Function',
				default: '#ffffff'
			},
			arcLines: {
				title: 'Arc Lines',
				default: '#ffa000'
			}
		}
	}
]
