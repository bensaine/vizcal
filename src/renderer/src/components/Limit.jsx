import { Expression } from 'desmos-react'
import { useState } from 'react'
import { Dropdown } from './Controls/Dropdown'
import { Experiment } from './Experiment/Experiment'
import { MathInput } from './Controls/MathInput/MathInput'
import { Slider } from './Controls/Slider/Slider'

export const Limit = () => {
	const [fx, setFx] = useState('')
	const [x, setX] = useState([0, 10])
	const [direction, setDirection] = useState('left')

	const renderOptions = () => {
		return (
			<>
				<h2>Limit</h2>
				<MathInput
					id="function"
					label="Function"
					latex={fx}
					onChange={(input) => {
						setFx(input.latex())
					}}
				/>
				<Slider id="x" label="x" value={x} onChange={setX} min={-20} max={10} step={0.1} />
				<Dropdown
					id="direction"
					label="Direction"
					options={['left', 'right']}
					onChange={setDirection}
				/>
			</>
		)
	}

	const renderGraph = () => {
		return <Expression id="function" latex={fx} />
	}

	const renderHelp = () => {
		return (
			<>
				<p>HO SAY YUNG FROM SQUID GAME?</p>
			</>
		)
	}

	return <Experiment optionsSlot={renderOptions} graphSlot={renderGraph} helpSlot={renderHelp} />
}
