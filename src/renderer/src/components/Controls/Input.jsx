import { ControlContainer } from './ControlContainer/ControlContainer'

export const Input = ({ id, label, value, onChange, disabled }) => {
	return (
		<ControlContainer id={id} label={label} disabled={disabled}>
			<input
				name={id}
				type="text"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				disabled={disabled}
			/>
		</ControlContainer>
	)
}
