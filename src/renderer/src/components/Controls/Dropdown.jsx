import { ControlContainer } from './ControlContainer/ControlContainer'

export const Dropdown = ({ id, label, options, value, onChange, disabled }) => {
	return (
		<ControlContainer id={id} label={label} disabled={disabled}>
			<select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</ControlContainer>
	)
}
