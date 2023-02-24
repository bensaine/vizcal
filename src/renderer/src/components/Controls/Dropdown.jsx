import { ControlContainer } from './ControlContainer/ControlContainer'

export const Dropdown = ({ id, label, options, selected, onChange }) => {
	return (
		<ControlContainer id={id} label={label}>
			<select
				value={selected}
				onChange={(e) => onChange(e.target.value)}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</ControlContainer>
	)
}
