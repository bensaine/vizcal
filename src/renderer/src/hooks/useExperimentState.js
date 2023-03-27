const useExperimentState = (defaultValue, key, experimentId) => {
	const [value, setValue] = React.useState(() => {
		const stickyValue = window.localStorage.getItem(experimentId)
		return stickyValue !== null ? JSON.parse(stickyValue).payload[key] : defaultValue
	})
	React.useEffect(() => {
		const stickyValue = window.localStorage.getItem(experimentId) || {}
		stickyValue.payload = { ...stickyValue.payload, [key]: value }
		localStorage.setItem(experimentId, JSON.stringify(stickyValue))
	}, [key, experimentId, value])
	return [value, setValue]
}

export default useExperimentState
