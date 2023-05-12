import React, {Component, useEffect, useState} from 'react'
import { ColorItems } from './ColorItems'
import "./color.scss"
import styles from "../ExperimentBase/ExperimentBase.module.scss";
import { Droplet, X} from 'react-feather'

/**
 * A component that renders a color menu button and allows users to select a color from a list of options.
 * @param {object} props - The props that are passed to the component.
 * @param {Array<string>} props.colorArray - The array that contains the possible choices of color change.
 * @param {string} props.experiment - The experiment for which the color is being selected.
 * @returns {JSX.Element} - A JSX element that renders a color menu button and a list of color options.
 */
export const Colors = ({colorArray, experiment}) => {
	const [open, setOpen] = useState(false)
	const [colorMenuButtonStyle, setColorMenuButtonStyle] = useState("color-menu-button")

	/**
	 * Changes the style of the color menu button depending on whether it is open or closed.
	 */
	const changeStyle = () => {
		open ? setColorMenuButtonStyle("color-menu-button-active"): setColorMenuButtonStyle("color-menu-button")
	}


	return (
		<div className={"outer-color-container"}>
			<div className={"inner-color-container"}>
				<span className={colorMenuButtonStyle} onClick={() => setOpen((prev) => !prev) && changeStyle()}>
						{open ? <X/> : <Droplet/>}
				</span>
				<span className={"inner-color-container-top"}>
				 {open && (<h2 className={"color-selector-title"} > Color Selector </h2>)}
				</span>
				{open && (
					<div className={"options-container"} >
						{colorArray.map((names) => {
								return <ColorItems key={names} title={names} experiment={experiment}></ColorItems>
							}
						)}
					</div>
				)}
			</div>
		</div>
	)
}
