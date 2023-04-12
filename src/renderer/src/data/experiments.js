import { Arc } from '../components/Arc'
import { Derivative } from '../components/Derivative'
import { Limit } from '../components/Limit'
import { Riemann } from '../components/Riemann'

export const experiments = [
	{
		type: 'epsilonDelta',
		displayName: 'Epsilon-Delta',
		category: 'Limits',
		image: '/src/assets/images/icons/eps.svg',
		component: Limit
	},
	{
		type: 'slope',
		displayName: 'Slope',
		category: 'Derivatives',
		image: '/src/assets/images/icons/slope.svg',
		component: Derivative
	},
	{
		type: 'riemannSum',
		displayName: 'Riemann Sum',
		category: 'Area Under Curve',
		image: '/src/assets/images/icons/reimann.svg',
		component: Riemann
	},
	{
		type: 'arcLength',
		displayName: 'Arc Length',
		category: 'Arc Length',
		image: '/src/assets/images/icons/arc.svg',
		component: Arc
	}
]
