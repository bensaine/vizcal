import { InputContainer } from './InputContainer/InputContainer'

export const Input = ({ id, label, value, onChange }) => {
	return (
		<InputContainer id={id} label={label}>
			<input
				name={id}
				type="text"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</InputContainer>
	)
}
