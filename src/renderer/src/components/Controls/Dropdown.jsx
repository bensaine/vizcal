import { ControlContainer } from './ControlContainer/ControlContainer'

export const Dropdown = ({ id, label, options, selected, onChange, disabled }) => {
	return (
		<ControlContainer id={id} label={label} disabled={disabled}>
			<select value={selected} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</ControlContainer>
	)
}
