import { ControlContainer } from './ControlContainer/ControlContainer'

export const Input = ({ id, label, value, onChange }) => {
	return (
		<ControlContainer id={id} label={label}>
			<input
				name={id}
				type="text"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</ControlContainer>
	)
}
