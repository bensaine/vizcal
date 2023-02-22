import { Expression } from 'desmos-react'
import { useState } from 'react'
import { Experiment } from './Experiment/Experiment'
import { MathInput } from './MathInput/MathInput'
import { Slider } from './Slider/Slider'

export const Limit = () => {
	const [fx, setFx] = useState('')
	const [x, setX] = useState([0, 10])

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
			</>
		)
	}

	const renderGraph = () => {
		return <Expression id="function" latex={fx} />
	}

	return <Experiment optionsSlot={renderOptions} graphSlot={renderGraph} />
}
