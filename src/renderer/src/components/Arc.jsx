import '../../jquery.js'
import '../../desmos.js'
import { Expression } from 'desmos-react'
import { useEffect, useState } from 'react'
import { ExperimentBase } from './ExperimentBase/ExperimentBase'
import { MathInput } from './Controls/MathInput'
import { Slider } from './Controls/Slider/Slider'
import { ExpressionListener } from './ExpressionListener.jsx'

export const Arc = ({ payload, visible, setPayload }) => {
	const [fx, setFx] = useState(payload.fx ?? '')
	const [x, setX] = useState(payload.x ?? [0, 10])
	const [n, setN] = useState(payload.n ?? 0)
	const [length, setLength] = useState(NaN)

	useEffect(() => {
		setPayload({
			fx: fx,
			x: x,
			n: n
		})
	}, [fx, x, n])

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
					disabled={fx == ''}
				/>
				<Slider
					id="lengthRange"
					label="Length Range"
					value={x}
					onChange={setX}
					min={-20}
					max={20}
					step={0.01}
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
				<ExpressionListener latex={'e_{stimation}'} onExpressionChange={setLength} />
			</>
		)
	}
	const renderHelp = () => {
		return (
			<>
				<h3>What is an arc length?</h3>
				<p>
					The arc length is an application of integration that lets us find the length of
					a function within a certain range. The method by which this is achieved it very
					similar to the approximation of the area under a curve where Riemann sums where
					exhaustively used. In short, subdivisions in x of a function are joined by
					straight lines and they are all joined to approximate the curve of the function.
					The approximation is simply given by the sum of the length of each small line
					section.
				</p>
				<h3>How to experiment with Arc Length:</h3>
				<p>
					Experimenting with the arc length yourself is simple. Here are the components
					that you see on the screen and how to use them:
				</p>

				<h4>1. Input a function</h4>
				<p>
					Type any explicit function you like in the textbox. Just like other math tools,
					this is a LaTeX textbox, so you can type your function in easily.
				</p>

				<h4>2. Select the number of subdivisions</h4>
				<p>
					Use the first slider to indicate the number of subdivisions you want. Remember,
					the higher the number, the better the approximation. The default is set to 1.
				</p>

				<h4>3. Select a range</h4>
				<p>
					Use the second slider to select the range on which you want to approximate the
					length of the curve. The default is set to 0 - 10.
				</p>

				<h4>4. Refine your estimation</h4>
				<p>
					As is true with Riemann sums, the arc length's estimation gets better and better
					as you increase the number of subdivisions. On the bottom of the controls is an
					output box that shows the sum of the line segments which will get closer to the
					true arc length as you increase the number of subdivisions.
				</p>
			</>
		)
	}

	return visible ? (
		<ExperimentBase
			optionsSlot={renderOptions}
			graphSlot={renderGraph}
			helpSlot={renderHelp}
			output={length}
		/>
	) : null
}
