import React, {useState} from "react"

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
