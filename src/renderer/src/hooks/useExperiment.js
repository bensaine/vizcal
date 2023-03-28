import { useEffect, useState } from 'react'

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
