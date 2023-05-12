import ReactSlider from 'react-slider'
import { ControlContainer } from '../ControlContainer/ControlContainer'
import styles from './Slider.module.scss'

/**
 * Slider component. A slider control that allows the user to slide the thumb between a minimum and maximum value with steps of a defined amount.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the slider element.
 * @param {string} props.label - The label for the slider element.
 * @param {number|number[]} props.value - The current value or range of values of the slider.
 * @param {function} props.onChange - The callback function called when the slider value changes.
 * @param {boolean} props.disabled - Specifies if the slider should be disabled.
 * @param {number} props.min - The minimum value of the slider.
 * @param {number} props.max - The maximum value of the slider.
 * @param {number} props.step - The step increment of the slider.
 * @param {number} props.minDistance - The minimum distance between handles in a range slider.
 * @returns {ReactElement} The rendered Slider component.
 */
export const Slider = ({ id, label, value, onChange, disabled, min, max, step, minDistance }) => {
	return (
		<ControlContainer id={id} label={label} disabled={disabled}>
			<div className={styles.sliderContainer}>
				<ReactSlider
					className={
						styles.slider + (Array.isArray(value) ? ' ' + styles.sliderRange : '')
					}
					trackClassName={styles.track}
					thumbClassName={styles.thumb}
					thumbActiveClassName={styles.thumbActive}
					renderThumb={(props, state) => (
						<div {...props}>
							<span className={styles.value}>{state.valueNow}</span>
						</div>
					)}
					value={value}
					onChange={onChange}
					min={min}
					max={max}
					step={step}
					minDistance={minDistance}
					pearling
					disabled={disabled}
				/>
				<span className={styles.labelRow}>
					<span>{min}</span>
					{/* {min * max < 0 && <span className={styles.zero} style={{left: (100*Math.abs(min)/(max-min)-2)+"%"}}>0</span>} */}
					<span>{max}</span>
				</span>
			</div>
		</ControlContainer>
	)
}
