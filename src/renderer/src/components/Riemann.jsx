import { Expression } from 'desmos-react'
import { useState } from 'react'
import { Dropdown } from './Controls/Dropdown'
import { Experiment } from './Experiment/Experiment'
import { MathInput } from './Controls/MathInput'
import { Slider } from './Controls/Slider/Slider'
import { StaticMath } from './StaticMath'

export const Riemann = () => {
	const [fx, setFx] = useState('')
	const [x, setX] = useState([-10, 10])
	const [direction, setDirection] = useState('left')
	const [n, setN] = useState(1)

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
				<Expression id="min" latex={'x=a'} />
				<Expression id="max" latex={'x=b'} />
			</>
		)
	}
	const renderHelp = () => {
		return (
			<>
				<h3>Reimann sums and Integrals</h3>
				<p>What is a Reimann sum?</p>
				<p>
					In mathematics, a Riemann sum is a certain kind of approximation of an integral
					by a finite sum. Riemann sums help us approximate definite integrals, but they
					also help us formally define definite integrals.
				</p>
			</>
		)
	}

	return <Experiment optionsSlot={renderOptions} graphSlot={renderGraph} helpSlot={renderHelp} />
}
