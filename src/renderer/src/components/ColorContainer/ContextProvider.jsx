import React, {useState} from "react"


/**
 * Provides the global color variables used to change the graph's colors.
 * This React context provides an object containing color variables for various expressions in experiments,
 * allowing for customization of the appearance of the graphs. The object has the following properties:
 *
 *	@typedef {Object} ColorContextObject
 *	@property {Object} arc - An object containing variables related to arc length expressions.
 *	@property {string} arc.arcColor - The color of the arc length approximation lines.
 *	@property {string} arc.functionColorArc - The color of the function in the arc length experiment.
 *	@property {function} arc.setArcColor - A function to set the color of the arc length approximation lines.
 *	@property {function} arc.setFunctionColorArc - A function to set the function in the arc length experiment.
 *	@property {Object} riemann - An object containing variables related to the Riemann sum experiment.
 *	@property {string} riemann.riemannColorNeg - The color of the negative area.
 *	@property {string} riemann.riemannColorPos - The color of the positive area.
 *	@property {string} riemann.functionColorRiemann - The color of the function in the Riemann sum experiment.
 * 	@property {function} riemann.setRiemannColorNeg - A function to set the color of the negative area.
 *	@property {function} riemann.setRiemannColorPos - A function to set the color of the positive area.
 *	@property {function} riemann.setFunctionColorRiemann - A function to set the color of the function in the Riemann sum experiment.
 *	@property {Object} limit - An object containing variables related to limit experiment.
 *	@property {string} limit.epsilonColor - The color of the epsilon lines.
 *	@property {string} limit.deltaColor - The color of the delta lines.
 *	@property {string} limit.functionColorLimit - The color of the function in the limit experiment.
 *	@property {function} limit.setEpsilonColor - A function to set the color of the epsilon lines.
 *	@property {function} limit.setDeltaColor - A function to set the color of the delta lines.
 *	@property {function} limit.setFunctionColorLimit - A function to set the color of the function in the limit experiment.
 *	@property {Object} derivative - An object containing variables related to the derivative experiment.
 *	@property {string} derivative.functionColorDerivative - The color of the function in the derivative experiment.
 *	@property {string} derivative.runRiseColor - The color of the run/rise lines.
 *	@property {function} derivative.setFunctionColorDerivative - A function to set the color of the function in the derivative experiment.
 *	@property {function} derivative.setRunRiseColor - A function to set the color of the run/rise lines.
 *	@type {React.Context<ColorContextObject>}
 */
export const Context = React.createContext({
	limit: {
		functionColorLimit: "white",
		epsilonColor: "white",
		deltaColor: "white",
		setFunctionColorLimit: function(color){},
		setEpsilonColor: function(color){},
		setDeltaColor: function(color){},
	},
	derivative: {
		functionColorDerivative: "white",
		runRiseColor: "white",
		setFunctionColorDerivative: function(color){},
		setRunRiseColor: function(color){},
	},
	riemann: {
		functionColorRiemann: "white",
		riemannColorPos: "blue",
		riemannColorNeg: "red",
		setFunctionColorRiemann: function(color){},
		setRiemannColorPos: function(color){},
		setRiemannColorNeg: function(color){},
	},
	arc: {
		functionColorArc: "white",
		arcColor: "orange",
		setFunctionColorArc: function(color){},
		setArcColor: function(color){}
	},
})

/**
 * What provides the entire application with the above-defined variables.
 * @param props - The component props
 * @returns {JSX.Element}
 * @constructor - Provides the application with the Context variables required for color change.
 */
function ContextProvider(props){
	const [functionColorLimit, setFunctionColorLimitState] = useState("white")
	const [functionColorDerivative, setFunctionColorDerivativeState] = useState("white")
	const [functionColorRiemann, setFunctionColorRiemannState] = useState("white")
	const [functionColorArc, setFunctionColorArcState] = useState("white")

	const [epsilonColor, setEpsilonColorState] = useState("green")
	const [deltaColor, setDeltaColorState] = useState("red")
	const [runRiseColor, setRunRiseColorState] = useState("blue")
	const [riemannColorPos, setRiemannColorStatePos] = useState("blue")
	const [riemannColorNeg, setRiemannColorStateNeg] = useState("red")
	const [arcColor, setArcColorState] = useState("orange")

	const ctx = {
		limit: {
			functionColorLimit,
			epsilonColor,
			deltaColor,
			setFunctionColorLimit: function(color){
				setFunctionColorLimitState(color)
			},
			setEpsilonColor: function(color){
				setEpsilonColorState(color)
			},
			setDeltaColor: function(color){
				setDeltaColorState(color)
			},
		},
		derivative: {
			functionColorDerivative,
			runRiseColor,
			setFunctionColorDerivative: function(color){
				setFunctionColorDerivativeState(color)
			},
			setRunRiseColor: function(color){
				setRunRiseColorState(color)
			},
		},
		riemann: {
			functionColorRiemann,
			riemannColorPos,
			riemannColorNeg,
			setFunctionColorRiemann: function(color){
				setFunctionColorRiemannState(color)
			},
			setRiemannColorPos: function(color){
				setRiemannColorStatePos(color)
			},
			setRiemannColorNeg: function(color){
				setRiemannColorStateNeg(color)
			},
		},
		arc: {
			functionColorArc,
			arcColor,
			setFunctionColorArc: function(color){
				setFunctionColorArcState(color)
			},
			setArcColor: function(color){
				setArcColorState(color)
			}
		},
	}


	return(<>
		<Context.Provider value={ctx}>{props.children}</Context.Provider>
	</>)

}

export default ContextProvider
