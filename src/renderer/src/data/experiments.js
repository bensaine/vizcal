import { Arc } from '../components/Arc'
import { Derivative } from '../components/Derivative'
import { Limit } from '../components/Limit'
import { Riemann } from '../components/Riemann'

export const experiments = [
	{
		type: 'epsilonDelta',
		displayName: 'Epsilon-Delta',
		category: 'Limits',
		component: Limit
	},
	{
		type: 'slope',
		displayName: 'Slope',
		category: 'Derivatives',
		component: Derivative
	},
	{
		type: 'riemannSum',
		displayName: 'Riemann Sum',
		category: 'Area Under Curve',
		component: Riemann
	},
	{
		type: 'arcLength',
		displayName: 'Arc Length',
		category: 'Arc Length',
		component: Arc
	}
]
