import {useContext, useState} from 'react'
import './color.scss'
import {Context} from "./ContextProvider.jsx"

export const ColorItems = ({ title, experiment}) => {
	const [open, setOpen] = useState(false)
	const [optionButtonStyle, setOptionButtonStyle] = useState("button-color")

	const ctx = useContext(Context)


	const colors = ['#ffffff','#c74440', '#2d70b3', '#388c46', '#6042a6','#fa7e19', '#000000']
	const [colorf, setColor] = useState()
	const changeStyle = () => {
		setOpen((prev) => !prev)
		open ? setOptionButtonStyle("option-button"): setOptionButtonStyle("option-button-active")
	}

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
			<button className={optionButtonStyle} onClick={changeStyle}>
				<div style={{display: "flex", flexDirection: "column", alignItems: "center", height: "fit-content"}}>
					<div style={{padding: "1rem"}}>
						{title}
					</div>
					{open && <div className={"color-list"} style={{opacity: open ? "100%" : "0%", transition: "opacity 2s ease-in-out"}}>
						{colors.map((color) => (
							// eslint-disable-next-line react/jsx-key
							<div className="color" style={{ backgroundColor: color }}
								 onClick={(e) => {handleColorChange(color)}}
							>
							</div>
						))}
					</div>}
				</div>
			</button>
		</div>
	)
}
