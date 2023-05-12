import { useEffect, useState } from 'react'

/**
 * A custom React hook that fetches an experiment from local storage by its ID.
 *
 * @author Benjamin Saine
 * @hook
 * @param {string} id - The unique identifier for the experiment.
 *
 * @example
 *
 * const { experiment, loading, error } = useExperiment('unique-experiment-id')
 *
 * @returns {Object} Returns an object with three properties:
 * 1. `experiment`: The fetched experiment object, or `null` if it's not yet loaded or an error occurred.
 * 2. `loading`: A boolean indicating whether the experiment data is currently being loaded.
 * 3. `error`: Any error that occurred while fetching the experiment, or `null` if no error occurred.
 */
const useExperiment = (id) => {
	const [experiment, setExperiment] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchExperiment = async () => {
			try {
				const experiment = fetchExperimentById(id)
				setExperiment(experiment)
			} catch (error) {
				console.error(error)
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		fetchExperiment()
	}, [id])

	const fetchExperimentById = (id) => {
		const experiment = localStorage.getItem(id)
		if (experiment) {
			return JSON.parse(experiment)
		}

		throw new Error('Experiment not found')
	}

	return { experiment, loading, error }
}

export default useExperiment
