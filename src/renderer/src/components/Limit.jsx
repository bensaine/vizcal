import '../../jquery.js'
import '../../desmos.js'
import { Expression } from 'desmos-react'
import { useEffect, useState } from 'react'
import { ExperimentBase } from './ExperimentBase/ExperimentBase'
import { MathInput } from './Controls/MathInput'
import { Slider } from './Controls/Slider/Slider'
import { StaticMath } from './StaticMath'

export const Limit = ({ payload, visible, setPayload }) => {
	const [fx, setFx] = useState(payload.fx ?? '')
	const [x, setX] = useState(payload.x ?? 0)
	const [epsilon, setEpsilon] = useState(payload.epsilon ?? 0.1)
	const [delta, setDelta] = useState(payload.delta ?? 0.1)

	useEffect(() => {
		setPayload({
			fx: fx,
			x: x,
			epsilon: epsilon,
			delta: delta
		})
	}, [fx, x, epsilon, delta])

	const renderOptions = () => {
		return (
			<>
				<h2>Limit</h2>
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
					label="x point"
					value={x}
					onChange={setX}
					min={-20}
					max={10}
					step={0.1}
					disabled={fx == ''}
				/>
				<Slider
					id="epsilon"
					label="Epsilon"
					value={epsilon}
					onChange={setEpsilon}
					min={0}
					max={20}
					step={0.0001}
					disabled={fx == ''}
				/>
				<Slider
					id="delta"
					label="Delta"
					value={delta}
					onChange={setDelta}
					min={0}
					max={20}
					step={0.0001}
					disabled={fx == ''}
				/>
			</>
		)
	}

	const renderGraph = () => {
		return (
			<>
				<Expression id="function" latex={'f\\left(x\\right)=' + fx} color="#fff" />
				{fx != '' && (
					<>
						<Expression id="x" latex={'x_{point}=' + x} />
						<Expression id="epsilon" latex={'e_{psilon}=' + epsilon} />
						<Expression id="delta" latex={'d_{elta}=' + delta} />
						<Expression id="xLine" latex={'x=x_{point}'} color="#37a" />
						<Expression
							id="pointOnFunction"
							latex={'\\left(x_{point},f\\left(x_{point}\\right)\\right)'}
							dragMode="NONE"
						/>
						<Expression id="yLine" latex={'y=f\\left(x_{point}\\right)'} />
						<Expression
							id="xAxisPoint"
							latex={'\\left(x_{point},0\\right)'}
							color="#37a"
						/>
						<Expression
							id="yDown"
							latex={'y_{down}=f\\left(x_{point}\\right)-e_{psilon}'}
						/>
						<Expression
							id="yUp"
							latex={'y_{up}=f\\left(x_{point}\\right)+e_{psilon}'}
						/>
						<Expression
							id="yDownLine"
							latex={'y=y_{down}'}
							lineStyle="DASHED"
							lineWidth={1.5}
							lineOpacity={0.6}
							color="#fff"
						/>
						<Expression
							id="yUpLine"
							latex={'y=y_{up}'}
							lineStyle="DASHED"
							lineWidth={1.5}
							lineOpacity={0.6}
							color="#fff"
						/>
						<Expression id="xLeft" latex={'x_{left}=x_{point}-d_{elta}'} />
						<Expression id="xRight" latex={'x_{right}=x_{point}+d_{elta}'} />
						<Expression
							id="xLeftLine"
							latex={'x=x_{left}'}
							lineStyle="DASHED"
							lineWidth={1.5}
							lineOpacity={0.6}
							color="#fff"
						/>
						<Expression
							id="xRightLine"
							latex={'x=x_{right}'}
							lineStyle="DASHED"
							lineWidth={1}
							lineOpacity={0.6}
							color="#fff"
						/>
						<Expression id="yUpDelta" latex={'y_{upDelta}=f\\left(x_{right}\\right)'} />
						<Expression
							id="yDownDelta"
							latex={'y_{downDelta}=f\\left(x_{left}\\right)'}
						/>
						<Expression
							id="yUpDeltaLine"
							latex={'y=y_{upDelta}'}
							lineWidth={1.5}
							color="#37a"
						/>
						<Expression
							id="yDownDeltaLine"
							latex={'y=y_{downDelta}'}
							lineWidth={1.5}
							color="#37a"
						/>
					</>
				)}
			</>
		)
	}

	const renderHelp = () => {
		return (
			<>
				<p>todo</p>
				<StaticMath>
					{'lim_{h\\to0}\\frac{f\\left(x+h\\right)-f\\left(x\\right)}{h}'}
				</StaticMath>
			</>
		)
	}

	return visible ? (
		<ExperimentBase optionsSlot={renderOptions} graphSlot={renderGraph} helpSlot={renderHelp} />
	) : null
}
