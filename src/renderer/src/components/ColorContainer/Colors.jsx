import React, {Component, useEffect, useState} from 'react'
import { ColorItems } from './ColorItems'
import "./color.scss"
import styles from "../ExperimentBase/ExperimentBase.module.scss";
import { Droplet, X} from 'react-feather'

export const Colors = ({colorArray, experiment}) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={"outer-color-container"}>
			<div className={"inner-color-container"}>
				<span className={"inner-color-container-top"}>
					<span className={"color-menu-button"} onClick={() => setOpen((prev) => !prev)}>
						{open ? <X/> : <Droplet/>}
					</span>
					{open && (<h2 className={"color-selector-title"}> Color Selector </h2>)}
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
