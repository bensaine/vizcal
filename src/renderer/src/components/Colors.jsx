import React, { Component, useState } from 'react'
import { ColorItems } from './ColorItems'
import "./ColorContainer/color.css"

export const Colors = ({color}) => {
	const [open, setOpen] = useState(false)
	const [colors, setColors] = useState("white")
	const  chooseColor = (color) => {
		setColors(color)
		console.log(color)
	}


	return (
		<div>
			<button className="button" onClick={() => setOpen((prev) => !prev)}></button>

			{open && (
				<div>
					<ColorItems title={'Function'} chooseColor={chooseColor}></ColorItems>
					<ColorItems title={'Epsilon lines'} chooseColor={chooseColor}></ColorItems>
					<ColorItems title={'Delta lines'} chooseColor={chooseColor}></ColorItems>
				</div>
			)}
		</div>
	)
}
