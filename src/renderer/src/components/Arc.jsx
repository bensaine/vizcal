import { Expression } from 'desmos-react'
import { useState } from 'react'
import { Experiment } from './Experiment/Experiment'
import { MathInput } from './Controls/MathInput'
import { Slider } from './Controls/Slider/Slider'

export const Arc = () => {
	const [fx, setFx] = useState('')
	const [x, setX] = useState([0, 10])
	const [n, setN] = useState(0)

	const renderOptions = () => {
		return (
			<>
				<h2>Arc Length</h2>
				<MathInput
					id="function"
					label="Function"
					latex={fx}
					onChange={(input) => {
						setFx(input.latex())
					}}
				/>
				<Slider
					id="numberSubdivisions"
					label="Number of Subdivisions"
					value={n}
					onChange={setN}
					min={1}
					max={100}
					step={1}
				/>
				<Slider
					id="lengthRange"
					label="Length Range"
					value={x}
					onChange={setX}
					min={-20}
					max={20}
					step={0.01}
				/>
			</>
		)
	}

	const renderGraph = () => {
		return (
			<>
				<Expression id="a" latex={'a=' + x[0]} />
				<Expression id="b" latex={'b=' + x[1]} />
				<Expression id="n" latex={'n=' + n} />
				<Expression id="function" latex={'f(x)=' + fx} color="white" />
				<Expression id="listofn" latex={'l_{istofN}=\\left[0,1,...,n\\right]'} />
				<Expression id="delx" latex={'d_{elX}=\\frac{b-a}{n}'} />
				<Expression id="xpoints" latex={'x_{points}=a+l_{istofN}\\cdot d_{elX}'} />
				<Expression
					id="estimation"
					latex={
						'e_{stimation}=\\sum_{i=1}^{n}\\sqrt{d_{elX}^{2}+\\left(f\\left(x_{pointsoffRight}\\left[i\\right]\\right)-f\\left(x_{pointsoffLeft}\\left[i\\right]\\right)\\right)^{2}}'
					}
					hidden
				/>
				<Expression
					id="actual"
					latex={"a_{ctual}=\\int_{a}^{b}\\sqrt{1+f'\\left(x\\right)^{2}}dx"}
				/>
				<Expression
					id="xpointsright"
					latex={
						'x_{pointsoffRight}=a+\\left(\\left[1,...,n\\right]\\right)\\cdot d_{elX}'
					}
				/>
				<Expression
					id="xpointsleft"
					latex={
						'x_{pointsoffLeft}=a+\\left(\\left[0,...,n-1\\right]\\right)\\cdot d_{elX}'
					}
				/>
				<Expression
					id="lines"
					latex={'\\left(x_{points},f\\left(x_{points}\\right)\\right)'}
					lines
					color="orange"
				/>
			</>
		)
	}

	return <Experiment optionsSlot={renderOptions} graphSlot={renderGraph} />
}
