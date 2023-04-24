import React, {Component, useEffect, useState} from 'react'
import { ColorItems } from './ColorItems'
import "./color.scss"
import styles from "../ExperimentBase/ExperimentBase.module.scss";

export const Colors = ({color, colorArray, experiment}) => {
	const [open, setOpen] = useState(false)
	const [colors, setColors] = useState("white")

	useEffect(() => {
		setColors(color)
	}, [color])

	return (
		<div className={`color-selector ${open ? 'selector-open button-main-open' : 'selector-close button-main-close'}`}>
			<div style={{backgroundColor: "#111827", borderRadius: "5px", display: "flex", flexDirection: "column"}}>
				<div style={{display: "flex"}}>
					<button className="button-main" onClick={() => setOpen((prev) => !prev)}/>
					{/*<span style={{fontSize: "20px", fontFamily: 'Inter', textAlign: "center", width: "100%"}}>*/}
					{/*	Color Picker*/}
					{/*</span>*/}
				</div>
				{open && (
					<div className={"button-container"} >
						{colorArray.map(names => {
								return <ColorItems key={Math.random()} title={names} chooseColor={color} experiment={experiment}></ColorItems>
							}
						)}
					</div>
				)}
			</div>
		</div>
	)
}
