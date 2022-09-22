import React from 'react'
import Header from '../header/Header'
import WorkersList from '../workersList/WorkersList'
import WorkersAddForm from '../workersAddForm/WorkersAddForm'

const App = () => {
  return (
	<>
		<Header/>
		<WorkersList/>
		<WorkersAddForm/>
	</>
  )
}

export default App;