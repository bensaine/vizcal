import { Experiment } from './Experiment/Experiment'
import { MathInput } from './Controls/MathInput'
import { useState } from 'react'
import { Expression } from 'desmos-react'
import { Slider } from './Controls/Slider/Slider'
export const Derivative = () => {
	const [fx, setFx] = useState('')
	const [x, setX] = useState()
	const [d, setD] = useState()
	const renderOptions = () => {
		return (
			<>
				<h2>Derivative</h2>
				<MathInput
					id="function"
					label="Function"
					latex={fx}
					onChange={(input) => {
						setFx(input.latex())
					}}
				/>
				<Slider
					id="x"
					label={'Slope at x = '}
					value={x}
					onChange={setX}
					min={-20}
					max={20}
					step={0.1}
				/>
				<Slider
					id="d"
					label={'Run and Rise'}
					value={d}
					onChange={setD}
					min={0.00001}
					max={1}
					step={0.0001}
				/>
			</>
		)
	}

	const renderGraph = () => {
		return (
			<>
				<Expression id="x" latex={'x_{point}=' + x} />
				<Expression id="d" latex={'d_{eltaX}=' + d} />
				<Expression id="function" latex={'f\\left(x\\right)=' + fx} color="#fff" />
				<Expression
					id="slope"
					latex={
						'y=\\frac{f\\left(x_{point}+d_{eltaX}\\right)-f\\left(x_{point}\\right)}{d_{eltaX}}\\left(x-x_{point}\\right)+f\\left(x_{point}\\right)'
					}
					color="#37a"
				/>
				<Expression
					id="runRise"
					latex={
						'x_{2}=x_{point}+d_{eltaX}\\left\\{f\\left(x_{point}+d_{eltaX}\\right)<y<f\\left(x_{point}\\right)\\right\\}'
					}
					color="#fff"
				/>
				<Expression
					id="riseRun"
					latex={
						'y_{2}=f\\left(x_{point}\\right)\\left\\{x_{point}+d_{eltaX}>x>x_{point}\\right\\}'
					}
					color="#fff"
				/>
				<Expression
					id="riseRunU"
					latex={
						'x_{1}=x_{point}+d_{eltaX}\\left\\{f\\left(x_{point}\\right)<y<f\\left(x_{point}+d_{eltaX}\\right)\\right\\}'
					}
					color="#fff"
				/>
			</>
		)
	}

	return <Experiment optionsSlot={renderOptions} graphSlot={renderGraph} />
}
