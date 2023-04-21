import { useState } from 'react'
import './ColorContainer/color.css'

export const ColorItems = ({ title, chooseColor}) => {
	const [open, setOpen] = useState(false)
	const [change, setChange] = useState('#1e2b68')

	const handleChange = (event) => {
		setChange(event)
	}

	const colors = ['#2872d7', '#44bb6a', '#dfe619', '#de3d21', '#ca358c']
	const [colorf, setColor] = useState()

	const changeColor = (e) => {
		setColor(e.target.style.getPropertyValue('background-color'))
	}

	return (
		<div>
			<button
				style={{ backgroundColor: colorf, border: colorf }}
				onClick={() => setOpen((prev) => !prev)}
			>
				{title}
			</button>

			{open && (
				<div className="color-list">
					{' '}
					{colors.map((color, idx) => (
						// eslint-disable-next-line react/jsx-key
						<div
							className="color-item"
							style={{ backgroundColor: color }}
							onClick={(e) => {
								setColor(e.target.style.getPropertyValue('background-color'))
								chooseColor(colorf)
							}}
						>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
