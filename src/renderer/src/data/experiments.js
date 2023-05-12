import { Arc } from '../components/Arc'
import { Derivative } from '../components/Derivative'
import { Limit } from '../components/Limit'
import { Riemann } from '../components/Riemann'
import eps from '../assets/images/icons/eps.svg'
import slope from '../assets/images/icons/slope.svg'
import riemann from '../assets/images/icons/riemann.svg'
import arc from '../assets/images/icons/arc.svg'

export const experiments = [
	{
		type: 'limit',
		displayName: 'Limit',
		category: 'Limits',
		image: eps,
		component: Limit
	},
	{
		type: 'slope',
		displayName: 'Derivative',
		category: 'Derivatives',
		image: slope,
		component: Derivative
	},
	{
		type: 'riemannSum',
		displayName: 'Riemann Sum',
		category: 'Area Under Curve',
		image: riemann,
		component: Riemann
	},
	{
		type: 'arcLength',
		displayName: 'Arc Length',
		category: 'Arc Length',
		image: arc,
		component: Arc
	}
]
