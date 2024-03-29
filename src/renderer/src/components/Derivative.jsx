import '../../jquery.js'
import '../../desmos.js'
import { ExperimentBase } from './ExperimentBase/ExperimentBase'
import { MathInput } from './Controls/MathInput'
import { useContext, useEffect, useState } from 'react'
import { Expression } from 'desmos-react'
import { Slider } from './Controls/Slider/Slider'
import { Dropdown } from './Controls/Dropdown'
import { ExpressionListener } from './ExpressionListener.jsx'
import { ExperimentContext } from './Experiment.jsx'

/**
 * Component for the Derivative/Slope experiment.
 *
 * This component allows users to interactively visualize and experiment with the concept
 * of instantaneous slopes in calculus. Users can input a function, select a point on the x-axis,
 * choose rise and run values, and choose to see the first or second derivative. The component also includes
 * a help section to guide users on how to use the interactive features.
 *
 * @author Wassim Yahia
 * @component
 * @param {Object} props
 * @param {Object} props.payload - The initial payload containing function, x point, rise and run value, and derivative order. Used if the experiment is opened from a file.
 * @param {boolean} props.visible - Determines whether the component is visible or not.
 * @param {Function} props.setPayload - Callback function to update the payload when it changes. Used to save experiment state to a file.
 * @returns {ReactElement|null} The rendered Derivative/Slope component or null if not visible.
 * @example
 * <Derivative payload={{equation: 'x^2', x: 2, riseRun: 2, derivativeOrder: 1}} visible={true} setPayload={setPayload} />
 */
export const Derivative = ({ payload, visible, setPayload }) => {
	/**
	 * The equation expression state.
	 *
	 * @type {string}
	 */
	const [equation, setEquation] = useState(payload.equation ?? '')

	const experimentContext = useContext(ExperimentContext)

	/**
	 * The X point state.
	 *
	 * @type {number}
	 */
	const [xPoint, setXPoint] = useState(payload.xPoint ?? 0)

	/**
	 * The run and rise value state.
	 *
	 * @type {number}
	 */
	const [runRiseVal, setRunRiseVal] = useState(payload.runRiseVal ?? 0.001)

	/**
	 * The derivative order state.
	 *
	 * @type {string}
	 */
	const [derivOrder, setDerivOrder] = useState(payload.derivOrder ?? 'First')

	/**
	 * The slope value state.
	 *
	 * @type {number}
	 */
	const [slope, setSlope] = useState(NaN)

	/**
	 * Updates the payload state whenever there is a change in the state of the component.
	 *
	 * @returns {void}
	 */
	useEffect(() => {
		setPayload({
			equation: equation,
			xPoint: xPoint,
			runRiseVal: runRiseVal,
			derivOrder: derivOrder
		})
	}, [equation, xPoint, runRiseVal, derivOrder])

	/**
	 * Renders the options section of the Derivative component.
	 *
	 * This function returns a React fragment containing the inputs, sliders, and dropdown for the function, x point, run and rise values, derivative order, and an explanation for the instantaneous slope line.
	 * Each input/slider/drop down includes a corresponding label and callback to update the respective state variables.
	 *
	 * @returns {ReactElement} React fragment containing the options section of the Derivative component.
	 */
	const renderOptions = () => {
		return (
			<>
				<h2>Derivative</h2>
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
					label={'Slope at x = '}
					value={xPoint}
					onChange={setXPoint}
					min={-20}
					max={20}
					step={0.1}
					disabled={equation == ''}
				/>
				<Slider
					id="d"
					label={'Run and Rise'}
					value={runRiseVal}
					onChange={setRunRiseVal}
					min={0.001}
					max={1}
					step={0.001}
					disabled={equation == ''}
				/>
				<Dropdown
					id="derivOrd"
					label="Derivative Order"
					value={derivOrder}
					options={['First', 'Second']}
					onChange={setDerivOrder}
					disabled={equation == ''}
				/>
				{/*explains what the instantaneous slope represents according to the selected derivative order. */}
				{derivOrder == 'First' ? (
					<p>The line shows the instantaneous slope of the inputed function.</p>
				) : (
					<p>
						The line shows the instantaneous slope of the derivative of the inputed
						function.
					</p>
				)}
			</>
		)
	}

	/**
	 * Renders the graph section of the Derivative component.
	 *
	 * This function returns a React fragment containing the visual representation of the derivative using the Desmos SDK.
	 * It includes the function, x-axis point, run and rise values, and derivative order, as well as lines and points to help illustrate the derivative.
	 *
	 * @returns {ReactElement} React fragment containing the graph section of the Derivative component.
	 */
	const renderGraph = () => {
		return (
			<>
				<Expression id="x" latex={'x_{point}=' + xPoint} />
				<Expression id="d" latex={'d_{eltaX}=' + runRiseVal} />
				<Expression
					id="function"
					latex={'f\\left(x\\right)=' + equation}
					color={experimentContext.colors.function}
				/>
				{/*adds the second derivative function on the graph when selected through the dropdwon*/}
				{derivOrder == 'Second' && (
					<Expression
						id="function2"
						latex={'g\\left(x\\right)=\\frac{d}{dx}' + equation}
						lineOpacity="0.5"
						color="#444444"
					/>
				)}
				<Expression
					id="slope"
					latex={
						//shows the slope that corresponds to the selected derivative order
						derivOrder == 'First'
							? 'y=\\frac{f\\left(x_{point}+d_{eltaX}\\right)-f\\left(x_{point}\\right)}{d_{eltaX}}\\left(x-x_{point}\\right)+f\\left(x_{point}\\right)'
							: 'y=\\frac{g\\left(x_{point}+d_{eltaX}\\right)-g\\left(x_{point}\\right)}{d_{eltaX}}\\left(x-x_{point}\\right)+g\\left(x_{point}\\right)'
					}
					color="#3377aa"
				/>
				<Expression
					id="riseDown"
					latex={
						derivOrder == 'First'
							? 'x_{2}=x_{point}+d_{eltaX}\\left\\{f\\left(x_{point}+d_{eltaX}\\right)<y<f\\left(x_{point}\\right)\\right\\}'
							: 'x_{2}=x_{point}+d_{eltaX}\\left\\{g\\left(x_{point}+d_{eltaX}\\right)<y<g\\left(x_{point}\\right)\\right\\}'
					}
					color={experimentContext.colors.runRise}
				/>
				<Expression
					id="run"
					latex={
						//applies the run value to the slope corresponding to the requested derivative order
						derivOrder == 'First'
							? 'y_{2}=f\\left(x_{point}\\right)\\left\\{x_{point}+d_{eltaX}>x>x_{point}\\right\\}'
							: 'y_{2}=g\\left(x_{point}\\right)\\left\\{x_{point}+d_{eltaX}>x>x_{point}\\right\\}'
					}
					color={experimentContext.colors.runRise}
				/>
				<Expression
					id="rise"
					latex={
						//applies the rise value to the slope corresponding to the requested derivative order
						derivOrder == 'First'
							? 'x_{1}=x_{point}+d_{eltaX}\\left\\{f\\left(x_{point}\\right)<y<f\\left(x_{point}+d_{eltaX}\\right)\\right\\}'
							: 'x_{1}=x_{point}+d_{eltaX}\\left\\{g\\left(x_{point}\\right)<y<g\\left(x_{point}+d_{eltaX}\\right)\\right\\}'
					}
					color={experimentContext.colors.runRise}
				/>
				<Expression
					id="point"
					latex={'\\left(x_{point},f\\left(x_{point}\\right)\\right)'}
					color="#ffaa00"
				/>
				<Expression
					id="slopeVal"
					latex={
						//calculates the value of the slope corresponding to the requested derivative order
						derivOrder == 'First'
							? 's=\\frac{f\\left(x_{point}+d_{eltaX}\\right)-f\\left(x_{point}\\right)}{d_{eltaX}}'
							: 's=\\frac{g\\left(x_{point}+d_{eltaX}\\right)-g\\left(x_{point}\\right)}{d_{eltaX}}'
					}
				/>
				<ExpressionListener latex={'s'} onExpressionChange={setSlope} />
			</>
		)
	}

	/**
	 * Renders the help section of the Derivative component.
	 *
	 * This function returns a React fragment containing an explanation of derivatives and a step-by-step guide on how to use the interactive features.
	 * It covers how to input a function, select the point on the x-axis, choose rise and run values, and select a derivative order.
	 *
	 * @returns {ReactElement} React fragment containing the help section of the Derivative component.
	 */
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
				<h3>How to experiment with Slope:</h3>
				<p>
					Experimenting with the slope yourself is simple. Here are the components that
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
					calculate and show the slope. The default value is 0.
				</p>

				<h4>3. Select a value for run and rise</h4>
				<p>
					Use the second slider to select the run and rise values which will be used to
					modify the slope value. The default value is 0.001.
				</p>

				<h4>3. Select a derivative order</h4>
				<p>
					Use the dropdown to choose between the first and second derivatives. The second
					derivative option will add the second derivative function to the graph in a
					transparent grey for a clearer visualization and the visualizer will then
					display its instantaneous slope. The default value is the first derivative.
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
