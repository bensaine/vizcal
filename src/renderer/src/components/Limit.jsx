import '../../jquery.js'
import '../../desmos.js'
import { Expression } from 'desmos-react'
import { useEffect, useState } from 'react'
import { ExperimentBase } from './ExperimentBase/ExperimentBase'
import { MathInput } from './Controls/MathInput'
import { Slider } from './Controls/Slider/Slider'
import { ExpressionListener } from './ExpressionListener.jsx'

/**
 * Component for the Limit experiment.
 *
 * This component allows users to interactively visualize and experiment with the concept
 * of limits in calculus. Users can input a function, select a point on the x-axis, and
 * choose epsilon and delta values to approximate the limit. The component also includes
 * a help section to guide users on how to use the interactive features.
 *
 * @component
 * @author Benjamin Saine
 * @param {Object} props
 * @param {Object} props.payload - The initial payload containing function, x point, epsilon, and delta values. Used if the experiment is opened from a file.
 * @param {boolean} props.visible - Determines whether the component is visible or not.
 * @param {Function} props.setPayload - Callback function to update the payload when it changes. Used to save experiment state to a file.
 * @returns {ReactElement|null} The rendered Limit component or null if not visible.
 * @example
 * <Limit payload={{equation: 'x^2', xPoint: 2, epsilon: 0.1, delta: 0.1}} visible={true} setPayload={setPayload} />
 */
export const Limit = ({ payload, visible, setPayload }) => {
	const [equation, setEquation] = useState(payload.equation ?? '')
	const [xPoint, setXPoint] = useState(payload.xPoint ?? 0)
	const [epsilon, setEpsilon] = useState(payload.epsilon ?? 0.1)
	const [delta, setDelta] = useState(payload.delta ?? 0.1)
	const [limit, setLimit] = useState(NaN)

	/**
	 * Updates the payload state whenever there is a change in the state of the component.
	 *
	 * @returns {void}
	 */
	useEffect(() => {
		setPayload({
			equation: equation,
			xPoint: xPoint,
			epsilon: epsilon,
			delta: delta
		})
	}, [equation, xPoint, epsilon, delta])

	/**
	 * Renders the options section of the Limit component.
	 *
	 * This function returns a React fragment containing the inputs and sliders for the function, x point, epsilon, and delta values.
	 * Each input/slider includes a corresponding label and callback to update the respective state variables.
	 *
	 * @returns {ReactElement} React fragment containing the options section of the Limit component.
	 */
	const renderOptions = () => {
		return (
			<>
				<h2>Limit</h2>
				<MathInput
					id="function"
					label="Function"
					latex={equation}
					onChange={(input) => {
						setEquation(input.latex())
					}}
				/>
				<Slider
					id="x"
					label="x point"
					value={xPoint}
					onChange={setXPoint}
					min={-20}
					max={10}
					step={0.1}
					disabled={equation == ''}
				/>
				<Slider
					id="epsilon"
					label="Epsilon"
					value={epsilon}
					onChange={setEpsilon}
					min={0}
					max={20}
					step={0.0001}
					disabled={equation == ''}
				/>
				<Slider
					id="delta"
					label="Delta"
					value={delta}
					onChange={setDelta}
					min={0}
					max={20}
					step={0.0001}
					disabled={equation == ''}
				/>
			</>
		)
	}

	/**
	 * Renders the graph section of the Limit component.
	 *
	 * This function returns a React fragment containing the visual representation of the limit using the Desmos SDK.
	 * It includes the function, x-axis point, epsilon, and delta values, as well as lines and points to help illustrate the limit.
	 *
	 * @returns {ReactElement} React fragment containing the graph section of the Limit component.
	 */
	const renderGraph = () => {
		return (
			<>
				<Expression id="function" latex={'f\\left(x\\right)=' + equation} color="#fff" />
				{equation != '' && (
					<>
						<Expression id="x" latex={'x_{point}=' + xPoint} />
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
						<Expression id="limit" latex={'y_{xpoint}=f\\left(x_{point}\\right)'} />
						<ExpressionListener latex={'y_{xpoint}'} onExpressionChange={setLimit} />
					</>
				)}
			</>
		)
	}

	/**
	 * Renders the help section of the Limit component.
	 *
	 * This function returns a React fragment containing an explanation of limits and a step-by-step guide on how to use the interactive features.
	 * It covers how to input a function, select the point on the x-axis, and choose epsilon and delta values.
	 *
	 * @returns {ReactElement} React fragment containing the help section of the Limit component.
	 */
	const renderHelp = () => {
		return (
			<>
				<h3>Limits</h3>
				<p>What is a Limit?</p>
				<p>
					A limit is a fundamental concept in calculus and mathematical analysis that
					describes the behavior of a function as its input approaches a particular value.
					In other words, it is the value that a function approaches as the input gets
					arbitrarily close to a specific point. Limits are used to define the concepts of
					continuity, derivatives, and integrals in calculus.
				</p>
				<h3>How to experiment with Limit:</h3>
				<p>
					Experimenting with the limit yourself is simple. Here are the components that
					you see on the screen and how to use them:
				</p>

				<h4>1. Input a function</h4>
				<p>
					Type any explicit function you like in the textbox. Just like other math tools,
					this is a LaTeX textbox, so you can type your function in easily.
				</p>

				<h4>2. Select the point on the x-axis</h4>
				<p>
					Use the first slider to indicate the point on the x-axis where you want to
					calculate the limit. The default value is 0.
				</p>

				<h4>3. Select an epsilon value</h4>
				<p>
					Use the second slider to select the epsilon value which will be used to
					approximate the limit. The default value is 0.1.
				</p>

				<h4>3. Select a delta value</h4>
				<p>
					Use the second slider to select the delta value which will be used to
					approximate the limit. The default value is 0.1.
				</p>
			</>
		)
	}

	return visible ? (
		<ExperimentBase
			optionsSlot={renderOptions}
			graphSlot={renderGraph}
			helpSlot={renderHelp}
			output={limit}
		/>
	) : null
}
