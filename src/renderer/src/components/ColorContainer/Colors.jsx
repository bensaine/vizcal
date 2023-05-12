import React, {Component, useEffect, useState} from 'react'
import { ColorItems } from './ColorItems'
import "./color.scss"
import styles from "../ExperimentBase/ExperimentBase.module.scss";
import { Droplet, X} from 'react-feather'

export const Colors = ({colorArray, experiment}) => {
	const [open, setOpen] = useState(false)
	const [colorMenuButtonStyle, setColorMenuButtonStyle] = useState("color-menu-button")
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
						{colorArray.map(names => {
								return <ColorItems key={Math.random()} title={names} experiment={experiment}></ColorItems>
							}
						)}
					</div>
				)}
			</div>
		</div>
	)
}
