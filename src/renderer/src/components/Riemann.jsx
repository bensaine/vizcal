import '../../jquery.js'
import '../../desmos.js'
import { Expression } from 'desmos-react'
import { useEffect, useState } from 'react'
import { Dropdown } from './Controls/Dropdown'
import { ExperimentBase } from './ExperimentBase/ExperimentBase'
import { MathInput } from './Controls/MathInput'
import { Slider } from './Controls/Slider/Slider'
import { ExpressionListener } from './ExpressionListener.jsx'
import { StaticMath } from './StaticMath.jsx'
import fig1 from '../assets/images/reimannDark/reimann1.png'
import fig2 from '../assets/images/reimannDark/reimann2.png'
import fig3 from '../assets/images/reimannDark/reimann3.png'
import fig4 from '../assets/images/reimannDark/reimann4.png'

export const Riemann = ({ payload, visible, setPayload }) => {
	const [fx, setFx] = useState(payload.fx ?? '')
	const [x, setX] = useState(payload.x ?? [-10, 10])
	const [direction, setDirection] = useState(payload.direction ?? 'left')
	const [n, setN] = useState(payload.n ?? 1)
	const [area, setArea] = useState(NaN)

	useEffect(() => {
		setPayload({
			fx: fx,
			x: x,
			direction: direction,
			n: n
		})
	}, [fx, x, direction, n])

	const renderOptions = () => {
		return (
			<>
				<h2>Riemann Sums</h2>
				<MathInput
					id="function"
					label="Function"
					latex={fx}
					onChange={(input) => {
						setFx(input.latex())
					}}
				/>

				<Slider
					id="range"
					label="Range"
					value={x}
					onChange={setX}
					min={-100}
					max={100}
					step={0.1}
					disabled={fx == ''}
				/>
				<Slider
					id="n"
					label="Number of Rectangles"
					value={n}
					onChange={setN}
					min={1}
					max={1000}
					step={1}
					disabled={fx == ''}
				/>
				<Dropdown
					id="direction"
					label="Direction"
					value={direction}
					options={['left', 'right']}
					onChange={setDirection}
					disabled={fx == ''}
				/>
			</>
		)
	}

	const renderGraph = () => {
		return (
			<>
				<Expression id="a" latex={'a=' + x[0]} />
				<Expression id="b" latex={'b=' + x[1]} />
				<Expression id="c" latex={'c=' + (direction == 'left' ? 0 : 1)} />
				<Expression id="n" latex={'n=' + n} />
				<Expression id="w" latex={'w=\\frac{b-a}{n}'} />
				<Expression
					id="s"
					latex={'s\\left(x\\right)=a+w\\left(x+c\\right)'}
					hidden={true}
				/>
				<Expression id="function" latex={'f\\left(x\\right)=' + fx} />
				<Expression
					id="nOfX"
					latex={
						'n_{x}\\left(x\\right)=\\operatorname{floor}\\left(\\frac{x-a}{w}\\right)'
					}
					hidden
				/>
				<Expression
					id="sSubX"
					latex={
						's_{x}\\left(x\\right)=\\left\\{a\\le x\\le b:\\ s\\left(n_{x}\\left(x\\right)\\right)\\right\\}'
					}
					hidden
				/>
				<Expression
					id="areaPos"
					latex={
						'0\\le y\\le f\\left(s_{x}\\left(x\\right)\\right)\\left\\{a\\le x\\le b\\right\\}'
					}
				/>
				<Expression
					id="areaNeg"
					latex={
						'f\\left(s_{x}\\left(x\\right)\\right)\\le y\\le0\\left\\{a\\le x\\le b\\right\\}'
					}
				/>
				<Expression
					id="areaValue"
					latex={'I=\\sum_{i=0}^{n\\ -\\ 1}f\\left(s\\left(i\\right)\\right)\\cdot w'}
					hidden
				/>
				{fx && (
					<>
						<Expression id="min" latex={'x=a'} />
						<Expression id="max" latex={'x=b'} />
					</>
				)}
				<ExpressionListener latex={'I'} onExpressionChange={setArea} />
			</>
		)
	}
	const renderHelp = () => {
		return (
			<>
				<h2>Reimann sums and Integrals</h2>
				<h3>What is a Reimann sum?</h3>
				<p>
					In mathematics, a Riemann sum is a certain kind of approximation of an integral
					by a finite sum. Riemann sums help us approximate definite integrals, but they
					also help us formally define definite integrals.
				</p>
				<h3>How does it work?</h3>
				<p>
					When approximating the area under a function's graph, one usually uses
					rectangular subdivisions.
				</p>
				<img src={fig1} alt="Approximating the area under a graph with rectangles" />
				<p>
					As seen in the figure below, using more subdivisions results in a better
					approximation:
				</p>
				<img src={fig2} alt="Increasing the number of rectangles for the approximation" />
				<p>
					The subdivisions can be either uniform or non-uniform. However, this program
					will strictly use uniform subdivisions.
				</p>
				<p>
					The rectangles place themselves under the curve in 4 different ways, generating{' '}
					<b>4 types of Reimann sums</b>:
				</p>
				<ol type="I">
					<li>Left Reimann sum</li>
					<li>Right Reimann Sum</li>
					<li>Midpoint Reimann sum </li>
					<li>Trapezoidal Reimann sum</li>
				</ol>
				<p>This program only consists of Left and Right Reimann sums.</p>
				<h4>Left Reimann sum:</h4>
				<p>
					With this method, each rectangular subdivision touches the curve through their
					top-left corner.
				</p>
				<img src={fig3} alt="Left Hand Reimann Sum" />
				<p>As seen in the figure 3, this results in an underestimation.</p>
				<h4>Right Reimann sum:</h4>
				<p>
					With this method, each rectangular subdivision touches the curve through their
					top-right corner.
				</p>
				<img src={fig4} alt="Right Hand Reimann Sum" />
				<p>As seen in the figure 4, this results in an overestimation.</p>
				<h3>Steps to Approximating the Area Through Reimann Sums:</h3>
				<p> The approximation can be represented as the sum of each rectangles' areas:</p>
				<StaticMath>{'\\sum_{i=1}^{n}f\\left(x_{i}^*\\right)\\cdot\\Delta {x}'}</StaticMath>
				,
				<p>
					where <StaticMath>{' \\Delta{x}'}</StaticMath> represents the width of each
					rectangle and <StaticMath>{'f\\left(x_{i}^*\\right)'}</StaticMath> represents
					the height of each rectangle.
				</p>
				<b>When using the left hand point:</b>
				<p>
					<StaticMath>{'\\Delta x=\\frac{\\left(a-b\\right)}{n}'}</StaticMath>, where a
					and b represent the starting and ending points for the area approximation, and n
					is the number of subdivisions.
				</p>
				<p>
					<StaticMath>{'x_{i}^*= x_{i-1}'}</StaticMath>
				</p>
				<b>When using the right hand point:</b>
				<p>
					<StaticMath>{'\\Delta x=\\frac{\\left(a-b\\right)}{n}'}</StaticMath>, where a
					and b represent the starting and ending points for the area approximation, and n
					is the number of subdivisions.
				</p>
				<p>
					<StaticMath>{'x_{i}^*= x_{i}'}</StaticMath>
				</p>
				<p>As the number of subdivisions approaches infinity, the sum becomes:</p>
				<StaticMath>
					{
						'\\lim_{n\\rightarrow \\infty}\\sum_{i=1}^{n}f\\left(x_{i}^*\\right)\\cdot\\Delta{x}'
					}
				</StaticMath>
				<p>which introduces the concept of integrals.</p>
			</>
		)
	}

	return visible ? (
		<ExperimentBase
			optionsSlot={renderOptions}
			graphSlot={renderGraph}
			helpSlot={renderHelp}
			output={area}
		/>
	) : null
}
