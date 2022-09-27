import React from 'react'
import Header from '../header/Header'
import WorkersList from '../workersList/WorkersList'
import WorkersFormSection from '../workersFormSection/WorkersFormSection'

const App = () => {
	return (
		<>
			<Header/>
			<WorkersList/>
			<WorkersFormSection/>
		</>
	)
}

export default App;