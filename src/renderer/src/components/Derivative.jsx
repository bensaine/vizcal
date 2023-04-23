import '../../jquery.js'
import '../../desmos.js'
import { ExperimentBase } from './ExperimentBase/ExperimentBase'
import { MathInput } from './Controls/MathInput'
import { useEffect, useState } from 'react'
import { Expression } from 'desmos-react'
import { Slider } from './Controls/Slider/Slider'
import { Dropdown } from './Controls/Dropdown'
import { ExpressionListener } from './ExpressionListener.jsx'

export const Derivative = ({ payload, visible, setPayload }) => {
	const [fx, setFx] = useState(payload.fx ?? '')
	const [x, setX] = useState(payload.x ?? 0)
	const [d, setD] = useState(payload.d ?? 0.00001)
	const [derivOrd, setDerivOrd] = useState(payload.derivOrd ?? 'First')
	const [slope, setSlope] = useState(NaN)

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
				<Expression id="function" latex={'f\\left(x\\right)=' + fx} color="#ffffff" />
				{derivOrd == 'Second' && (
					<Expression
						id="function2"
						latex={'g\\left(x\\right)=\\frac{d}{dx}' + fx}
						color="#444444"
					/>
				)}
				<Expression
					id="slope"
					latex={
						derivOrd == 'First'
							? 'y=\\frac{f\\left(x_{point}+d_{eltaX}\\right)-f\\left(x_{point}\\right)}{d_{eltaX}}\\left(x-x_{point}\\right)+f\\left(x_{point}\\right)'
							: 'y=\\frac{g\\left(x_{point}+d_{eltaX}\\right)-g\\left(x_{point}\\right)}{d_{eltaX}}\\left(x-x_{point}\\right)+g\\left(x_{point}\\right)'
					}
					color="#3377aa"
				/>
				<Expression
					id="runRise"
					latex={
						derivOrd == 'First'
							? 'x_{2}=x_{point}+d_{eltaX}\\left\\{f\\left(x_{point}+d_{eltaX}\\right)<y<f\\left(x_{point}\\right)\\right\\}'
							: 'x_{2}=x_{point}+d_{eltaX}\\left\\{g\\left(x_{point}+d_{eltaX}\\right)<y<g\\left(x_{point}\\right)\\right\\}'
					}
					color="#ffffff"
				/>
				<Expression
					id="riseRun"
					latex={
						derivOrd == 'First'
							? 'y_{2}=f\\left(x_{point}\\right)\\left\\{x_{point}+d_{eltaX}>x>x_{point}\\right\\}'
							: 'y_{2}=g\\left(x_{point}\\right)\\left\\{x_{point}+d_{eltaX}>x>x_{point}\\right\\}'
					}
					color="#ffffff"
				/>
				<Expression
					id="riseRunU"
					latex={
						derivOrd == 'First'
							? 'x_{1}=x_{point}+d_{eltaX}\\left\\{f\\left(x_{point}\\right)<y<f\\left(x_{point}+d_{eltaX}\\right)\\right\\}'
							: 'x_{1}=x_{point}+d_{eltaX}\\left\\{g\\left(x_{point}\\right)<y<g\\left(x_{point}+d_{eltaX}\\right)\\right\\}'
					}
					color="#ffffff"
				/>
				<Expression
					id="point"
					latex={'\\left(x_{point},f\\left(x_{point}\\right)\\right)'}
					color="#ffaa00"
				/>
				<Expression
					id="s"
					latex={
						derivOrd == 'First'
							? 's=\\frac{f\\left(x_{point}+d_{eltaX}\\right)-f\\left(x_{point}\\right)}{d_{eltaX}}'
							: 's=\\frac{g\\left(x_{point}+d_{eltaX}\\right)-g\\left(x_{point}\\right)}{d_{eltaX}}'
					}
				/>
				<ExpressionListener latex={'s'} onExpressionChange={setSlope} />
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
		<ExperimentBase
			optionsSlot={renderOptions}
			graphSlot={renderGraph}
			helpSlot={renderHelp}
			output={slope}
		/>
	) : null
}
