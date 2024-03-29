import '../../jquery.js'
import '../../desmos.js'
import { Expression } from 'desmos-react'
import { useContext, useEffect, useState } from 'react'
import { ExperimentBase } from './ExperimentBase/ExperimentBase'
import { MathInput } from './Controls/MathInput'
import { Slider } from './Controls/Slider/Slider'
import { ExpressionListener } from './ExpressionListener.jsx'
import { ExperimentContext } from './Experiment.jsx'

/**
 * Component for the Arc experiment.
 *
 * This component allows users to interactively visualize and experiment with the concept
 * of Arc Length in calculus. Users can input a function, select a range on the x-axis, and
 * see their arc length estimation be refined as the number of subdivisions is increased.
 * The component also includes a help section to guide users on how to use the interactive features.
 *
 * @component
 * @author Steven Thao
 * @param {Object} props
 * @param {Object} props.payload - The initial payload containing function, range and number of subdivisions. Used if the experiment is opened from a file.
 * @param {boolean} props.visible - Determines whether the component is visible or not.
 * @param {Function} props.setPayload - Callback function to update the payload when it changes. Used to save experiment state to a file.
 * @returns {ReactElement|null} The rendered Arc Length component or null if not visible.
 * @example
 * <Arc payload={{equation: 'x^2', x: 2, n: 10}} visible={true} setPayload={setPayload} />
 */
export const Arc = ({ payload, visible, setPayload }) => {
	const [equation, setEquation] = useState(payload.equation ?? '')
	const [range, setRange] = useState(payload.range ?? [0, 10])
	const [numberOfSubdivisions, setNumberOfSubdivisions] = useState(
		payload.numberOfSubdivisions ?? 0
	)
	const [length, setLength] = useState(NaN)

	const experimentContext = useContext(ExperimentContext)

	useEffect(() => {
		setPayload({
			equation: equation,
			range: range,
			numberOfSubdivisions: numberOfSubdivisions
		})
	}, [equation, range, numberOfSubdivisions])

	/**
	 * Renders the options section of the Arc Length component.
	 *
	 * This function returns a React fragment containing the inputs and sliders for the function, range, and number of subdivisions.
	 * Each input/slider includes a corresponding label and callback to update the respective state variables.
	 *
	 * @returns {ReactElement} React fragment containing the options section of the Arc Length component.
	 */
	const renderOptions = () => {
		return (
			<>
				<h2>Arc Length</h2>
				<MathInput
					id="function"
					label="Function"
					latex={equation}
					onChange={(input) => {
						setEquation(input.latex())
					}}
				/>
				<Slider
					id="numberSubdivisions"
					label="Number of Subdivisions"
					value={numberOfSubdivisions}
					onChange={setNumberOfSubdivisions}
					min={1}
					max={100}
					step={1}
					disabled={equation == ''}
				/>
				<Slider
					id="lengthRange"
					label="Length Range"
					value={range}
					onChange={setRange}
					min={-20}
					max={20}
					step={0.01}
					disabled={equation == ''}
				/>
			</>
		)
	}

	/**
	 * Renders the graph section of the Arc Length component.
	 *
	 * This function returns a React fragment containing the visual representation of the Arc Length using the Desmos SDK.
	 * It includes the function, range, and number of subdivisions, as well as lines to help illustrate the arc length.
	 *
	 * @returns {ReactElement} React fragment containing the graph section of the Arc Length component.
	 */
	const renderGraph = () => {
		return (
			<>
				<Expression id="a" latex={'a=' + range[0]} />
				<Expression id="b" latex={'b=' + range[1]} />
				<Expression id="n" latex={'n=' + numberOfSubdivisions} />
				<Expression
					id="function"
					latex={'f(x)=' + equation}
					color={experimentContext.colors.function}
				/>
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
					color={experimentContext.colors.arcLines}
				/>
				<ExpressionListener latex={'e_{stimation}'} onExpressionChange={setLength} />
			</>
		)
	}

	/**
	 * Renders the help section of the Arc Length component.
	 *
	 * This function returns a React fragment containing an explanation of the arc length and a step-by-step guide on how to use the interactive features.
	 * It covers how to input a function, select the range, and choose the number of subdivisions.
	 *
	 * @returns {ReactElement} React fragment containing the help section of the Arc Length component.
	 */
	const renderHelp = () => {
		return (
			<>
				<h3>What is an arc length?</h3>
				<p>
					The arc length is an application of integration that lets us find the length of
					the curve of a function within a certain range. The method by which this is
					achieved it very similar to the approximation of the area under a curve where
					Riemann sums where exhaustively used. In short, subdivisions in x of a function
					are joined by straight lines and they are all joined to approximate the curve of
					the function. The approximation is simply given by the sum of the length of each
					small line section.
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
					As is true with Riemann sums, the arc length&apos;s estimation gets better and
					better as you increase the number of subdivisions. On the bottom of the controls
					is an output box that shows the sum of the line segments which will get closer
					to the true arc length as you increase the number of subdivisions.
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
