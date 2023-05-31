import React, { useState, useEffect, createContext } from 'react'
import { experiments } from '../data/experiments'
import useExperiment from '../hooks/useExperiment'

/**
 * This component represents an individual experiment. It uses the `useExperiment` hook to fetch
 * the experiment data and renders the corresponding experiment component.
 *
 * The experiment's payload is stored in local storage whenever it changes, and a listener is set up to update
 * the payload in local storage whenever a 'updatePayload:[id]' event is dispatched.
 *
 * @author Benjamin Saine
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.id - The unique identifier for the experiment.
 * @param {boolean} props.visible - Whether or not the experiment should be visible.
 *
 * @example
 *
 * <Experiment
 *   id={'unique-experiment-id'}
 *   visible={true}
 * />
 *
 * @returns {ReactElement|null} If loading, returns null. If there's an error, returns an error message. Otherwise, returns the rendered experiment component.
 */
export const Experiment = ({ id, visible }) => {
	// Get the experiment data based on the id
	const { experiment, loading, error } = useExperiment(id)
	const [payload, setPayload] = useState({})
	const [colors, setColors] = useState({})

	// Add a listener to update the payload in local storage whenever it changes (used when saving to file)
	useEffect(() => {
		document.addEventListener('updatePayload:' + id, (e) => { /// single letter variable
			localStorage.setItem(id, JSON.stringify({ ...experiment, payload, colors }))
		})

		return () => {
			document.removeEventListener('updatePayload:' + id, (e) => /// single letter variable
				localStorage.setItem(id, JSON.stringify({ ...experiment, payload, colors }))
			)
		}
	}, [id, payload, colors])

	useEffect(() => {
		if (!experiment) return
		setColors(experiment.colors)
	}, [experiment])

	if (loading) return null

	if (error) return <div>Error: {error.message}</div>

	// Get the experiment component based on the experiment type
	return (
		<ExperimentContext.Provider
			value={{
				experiment,
				colors,
				setColors: (colors) => setColors({ ...colors })
			}}
		>
			{React.createElement(experiments.find((exp) => exp.type == experiment.type).component, { /// do not abbreviate
				payload: experiment.payload,
				visible,
				setPayload
			})}
		</ExperimentContext.Provider>
	)
}

/**
 * This context is used to pass the experiment data to the experiment components.
 * It also provides a function to update the experiment's colors.
 *
 * @author Steven Thao
 * @example
 * import { ExperimentContext } from '../Experiment'
 *
 * const { experiment, colors, setColors } = useContext(ExperimentContext)
 *
 * @see Experiment
 * @see Colors /// no reference
 *
 * @returns {React.Context} The context object
 */
export const ExperimentContext = createContext({
	experiment: {},
	colors: {},
	setColors: () => {}
})
