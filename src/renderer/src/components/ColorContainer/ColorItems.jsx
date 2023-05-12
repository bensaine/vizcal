import React, {useContext, useEffect, useState} from 'react'
import './color.scss'
import {Context} from "./ContextProvider.jsx"
import {Droplet, X} from "react-feather";

/**
 * Responsible to render the different option buttons as well as the list of color options.
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the button
 * @param {string} props.experiment - The experiment type
 * @returns {JSX.Element} - Returns the UI components for color selection
 */
export const ColorItems = ({ title, experiment}) => {
	const [open, setOpen] = useState(false)
	const [optionButtonStyle, setOptionButtonStyle] = useState("option-button")

	const ctx = useContext(Context)

	const colors = ['#ffffff','#c74440', '#ffc0cb', '#388c46', '#6042a6','#fa7e19', '#000000']

	/**
	 * Changes the style of the button and toggles the open state.
	 */
	const changeStyle = (e) => {
		e.stopPropagation()
		setOpen((prev) => !prev)
		open ? setOptionButtonStyle("option-button"): setOptionButtonStyle("option-button-active")
	}

	/**
	 * Changes the color of the selected graph line.
	 * @param {string} color - The selected color
	 */
	function handleColorChange(color){
		switch(title){
			case "Function":
				switch(experiment){
					case "Limit":
						ctx.limit.setFunctionColorLimit(color)
						break
					case "Derivative":
						ctx.derivative.setFunctionColorDerivative(color)
						break
					case "Riemann":
						ctx.riemann.setFunctionColorRiemann(color)
						break
					case "Arc":
						ctx.arc.setFunctionColorArc(color)
						break
					default:
						break
				}
				break
			case "Delta Lines":
				ctx.limit.setDeltaColor(color)
				break
			case "Epsilon Lines":
				ctx.limit.setEpsilonColor(color)
				break
			case "Run & Rise":
				ctx.derivative.setRunRiseColor(color)
				break
			case "Rectangles Positive":
				ctx.riemann.setRiemannColorPos(color)
				break
			case "Rectangles Negative":
				ctx.riemann.setRiemannColorNeg(color)
				break
			case "Arc Lines":
				ctx.arc.setArcColor(color)
				break
			default:
				break
		}

		if(title === "Delta Lines"){
			ctx.setDeltaColor(color)
		}

	}

	return (
		<div>
			<button disabled={open} className={optionButtonStyle} onClick={changeStyle} style={{cursor: (open ? "default":"pointer")}}>

				{open && <span className={"option-button-X"} style={{position: "absolute", height: "5rem", marginRight: "20rem"}} onClick={changeStyle}>
					<X/>
				</span>}

				<span style={{position: "absolute", height: (open ? "4.5rem": "1rem"), transition: "height 0.3s ease-in-out", fontSize: "18px"}}>
					{title}
				</span>

					{open && <div className={"color-list"} style={{position: "absolute", height: "0"}}>
						{colors.map((color) => (
							// eslint-disable-next-line react/jsx-key
							<div className="color" style={{backgroundColor: color}}
								 onClick={(event) =>{ handleColorChange(color)}}
							>
							</div>
						))}
					</div>}
			</button>
		</div>
	)
}
