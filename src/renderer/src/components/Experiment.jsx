import React, { useState, useEffect } from 'react'
import { experiments } from '../data/experiments'
import useExperiment from '../hooks/useExperiment'

export const Experiment = ({ id, visible }) => {
	const { experiment, loading, error } = useExperiment(id)
	const [payload, setPayload] = useState({})

	useEffect(() => {
		document.addEventListener('updatePayload:' + id, (e) => {
			localStorage.setItem(id, JSON.stringify({ ...experiment, payload: payload }))
		})

		return () => {
			document.removeEventListener('updatePayload:' + id, (e) =>
				localStorage.setItem(id, JSON.stringify({ ...experiment, payload: payload }))
			)
		}
	}, [id, payload])

	if (loading) return null

	if (error) return <div>Error: {error.message}</div>

	return React.createElement(experiments.find((exp) => exp.type == experiment.type).component, {
		payload: experiment.payload,
		visible,
		setPayload
	})
}
