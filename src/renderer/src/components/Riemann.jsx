import '../../jquery.js'
import '../../desmos.js'
import { Expression } from 'desmos-react'
import { useEffect, useState } from 'react'
import { Dropdown } from './Controls/Dropdown'
import { ExperimentBase } from './ExperimentBase/ExperimentBase'
import { MathInput } from './Controls/MathInput'
import { Slider } from './Controls/Slider/Slider'
import { ExpressionListener } from './ExpressionListener.jsx'

/**
 * Component for the Riemann Sum experiment.
 *
 * This component allows users to visualize Riemann sums and approximations of definite integrals
 * using sliders to change the function, range, number of subdivisions, and direction.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.payload - The payload object containing the state of the experiment.
 * @param {string} props.payload.equation - The function expression.
 * @param {number[]} props.payload.x - The range of the function.
 * @param {string} props.payload.direction - The direction of the Riemann sum.
 * @param {number} props.payload.n - The number of subdivisions for the Riemann sum.
 * @param {boolean} props.visible - Whether the component is visible.
 * @param {function} props.setPayload - The function to set the payload state.
 * @returns {React.Component} - The Riemann component.
 *
 * @example
 *<Limit payload={{equation: 'x^2', x: 2, n: 5000, delta: 0.1}} visible={true} setPayload={setPayload} />
 */
export const Riemann = ({ payload, visible, setPayload }) => {
	/**
	 * The function expression state.
	 *
	 * @type {string}
	 */
	const [equation, setEquation] = useState(payload.equation ?? '')

	/**
	 * The range state.
	 *
	 * @type {number[]}
	 */
	const [range, setRange] = useState(payload.x ?? [-10, 10])

	/**
	 * The direction of the Riemann sum state.
	 *
	 * @type {string}
	 */
	const [direction, setDirection] = useState(payload.direction ?? 'left')

	/**
	 * The number of subdivisions state.
	 *
	 * @type {number}
	 */
	const [n, setN] = useState(payload.n ?? 1)

	/**
	 * The area state.
	 *
	 * @type {number}
	 */
	const [area, setArea] = useState(NaN)

	/**
	 * Updates the payload state whenever there is a change in the state of the component.
	 *
	 * @returns {void}
	 */
	useEffect(() => {
		setPayload({
			equation: equation,
			range: range,
			direction: direction,
			n: n
		})
	}, [equation, range, direction, n])
	/**
	 * Renders the options for the component.
	 *
	 * This function returns a React fragment containing the inputs and sliders for the function, range array, number of subdivisions n,and direction values.
	 * Each input/slider includes a corresponding label and callback to update the respective state variables.
	 *
	 * @returns {ReactElement} React fragment containing the options section of the Riemann component.
	 */
	const renderOptions = () => {
		return (
			<>
				<h2>Riemann Sums</h2>
				<MathInput
					id="function"
					label="Function"
					latex={equation}
					onChange={(input) => {
						setEquation(input.latex())
					}}
				/>

				<Slider
					id="range"
					label="Range"
					value={range}
					onChange={setRange}
					min={-100}
					max={100}
					step={0.1}
					disabled={equation == ''}
				/>
				<Slider
					id="n"
					label="Number of Subdivisions"
					value={n}
					onChange={setN}
					min={1}
					max={5000}
					step={1}
					disabled={equation == ''}
				/>
				<Dropdown
					id="direction"
					label="Direction"
					value={direction}
					options={['left', 'right']}
					onChange={setDirection}
					disabled={equation == ''}
				/>
			</>
		)
	}
	/**
	 * Renders the graph for the component.
	 *
	 * This function returns a React fragment containing the visual representation of the area approximation using the Desmos SDK.
	 * Each Expression element represents a functional parameter used for the mathematical computations.
	 * It includes the function, lower and upper range a and b,  direction c, and number of subdivisions n.
	 * Intermediary expressions are used in the final expressions for approximating the area: areaPos and areaNeg
	 *
	 * @returns {ReactElement} - The graph component.
	 */
	const renderGraph = () => {
		return (
			<>
				<Expression id="a" latex={'a=' + range[0]} />
				<Expression id="b" latex={'b=' + range[1]} />
				<Expression id="c" latex={'c=' + (direction == 'left' ? 0 : 1)} />
				<Expression id="n" latex={'n=' + n} />
				<Expression id="w" latex={'w=\\frac{b-a}{n}'} />
				<Expression
					id="s"
					latex={'s\\left(x\\right)=a+w\\left(x+c\\right)'}
					hidden={true}
				/>
				<Expression id="function" latex={'f\\left(x\\right)=' + equation} />
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
				{equation && (
					<>
						<Expression id="min" latex={'x=a'} />
						<Expression id="max" latex={'x=b'} />
					</>
				)}
				<ExpressionListener latex={'I'} onExpressionChange={setArea} />
			</>
		)
	}
	/**
	 * Renders the help section of the Riemann Component.
	 * This function returns a React fragment containing an explanation of Riemann Sums and a step-by-step guide on how to use the interactive features.
	 * It includes a short definition of the theoretical concept, and explains how to input a function, select a range, select a number of subdivisions, and select a direction.
	 *
	 * @returns {ReactElement} React fragment containing the help section of the Reimann component.
	 */
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
				<h3>How to experiment with Riemann Sums:</h3>
				<h4>1. Input a function</h4>
				<p>No need to add "f(x)", just directly input the function in terms of x.</p>
				<h4>2. Select a range</h4>
				<p>
					Use this slider to set the lower and upper limit on which the area will be
					approximated.
				</p>
				<h4>3. Select the number of subdivisions</h4>
				<p>
					Use this slider to define the amound of subdivisions used for the calculation.
					The more rectangles/subdivisions you have, the more precise the area
					approximation gets.
				</p>
				<h4>4. Select a direction</h4>
				<p>
					Use this dropdown menu to switch between right hand Riemann Sum and left hand
					Riemann Sum.
				</p>
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
