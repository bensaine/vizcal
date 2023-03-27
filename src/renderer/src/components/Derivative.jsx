import '../../jquery.js'
import '../../desmos.js'
import { ExperimentBase } from './ExperimentBase/ExperimentBase'
import { MathInput } from './Controls/MathInput'
import { useEffect, useState } from 'react'
import { Expression } from 'desmos-react'
import { Slider } from './Controls/Slider/Slider'
import { Dropdown } from './Controls/Dropdown'

export const Derivative = ({ payload, visible, setPayload }) => {
	const [fx, setFx] = useState(payload.fx ?? '')
	const [x, setX] = useState(payload.x ?? 0)
	const [d, setD] = useState(payload.d ?? 0.00001)
	const [derivOrd, setDerivOrd] = useState(payload.derivOrd ?? 'First')

	useEffect(() => {
		setPayload({
			fx: fx,
			x: x,
			d: d,
			derivOrd: derivOrd
		})
	}, [fx, x, d, derivOrd])

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
					disabled={fx == ''}
				/>
				<Slider
					id="d"
					label={'Run and Rise'}
					value={d}
					onChange={setD}
					min={0.00001}
					max={1}
					step={0.0001}
					disabled={fx == ''}
				/>
				<Dropdown
					id="derivOrd"
					label="Derivative Order"
					value={derivOrd}
					options={['First', 'Second']}
					onChange={setDerivOrd}
					disabled={fx == ''}
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
						derivOrd == 'First'
							? 'y=\\frac{f\\left(x_{point}+d_{eltaX}\\right)-f\\left(x_{point}\\right)}{d_{eltaX}}\\left(x-x_{point}\\right)+f\\left(x_{point}\\right)'
							: "y=\\frac{f'\\left(x_{point}+d_{eltaX}\\right)-f'\\left(x_{point}\\right)}{d_{eltaX}}\\left(x-x_{point}\\right)+f\\left(x_{point}\\right)"
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
				<Expression
					id="point"
					latex={'\\left(x_{point},f\\left(x_{point}\\right)\\right)'}
					color="#fa0"
				/>
			</>
		)
	}

	const renderHelp = () => {
		return (
			<>
				<h3>Derivatives</h3>
				<p>What is a Derivative?</p>
				<p>
					The derivative of a function at a given point is the instaneous slope of said
					function at said point. The values for the run and rise dictate the range of
					points at which the derivative is calculated and then yields the average slope
					of the function between these points.
				</p>
			</>
		)
	}

	return visible ? (
		<ExperimentBase optionsSlot={renderOptions} graphSlot={renderGraph} helpSlot={renderHelp} />
	) : null
}
