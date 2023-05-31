import { ControlContainer } from './ControlContainer/ControlContainer'

/**
 * Dropdown component. A dropdown control that allows user to choose between options that change the dropdown's value.
 *
 * @author Benjamin Saine, Wassim Yahia
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the dropdown element.
 * @param {string} props.label - The label for the dropdown element.
 * @param {Array} props.options - The options available in the dropdown.
 * @param {string} props.value - The currently selected value in the dropdown.
 * @param {function} props.onChange - The callback function called when the selected value changes.
 * @param {boolean} props.disabled - Specifies if the dropdown should be disabled.
 * @returns {ReactElement} The rendered Dropdown component.
 */
export const Dropdown = ({ id, label, options, value, onChange, disabled }) => {
	return (
		<ControlContainer id={id} label={label} disabled={disabled}>
			<select value={value} onChange={(e) => onChange(e.target.value)} /// single letter variable
				disabled={disabled}>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</ControlContainer>
	)
}
