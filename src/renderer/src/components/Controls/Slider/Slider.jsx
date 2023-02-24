import ReactSlider from 'react-slider'
import { ControlContainer } from '../ControlContainer/ControlContainer'
import styles from './Slider.module.scss'

export const Slider = ({ id, label, value, onChange, min, max, step, minDistance }) => {
	return (
		<ControlContainer id={id} label={label}>
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
