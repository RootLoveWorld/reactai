import React, { useState } from 'react'
import { Navigation } from './components'
import HomePage from './pages/HomePage'
import ControlledPage from './pages/ControlledPage'
import UncontrolledPage from './pages/UncontrolledPage'
import StateLiftingPage from './pages/StateLiftingPage'
import ContextPage from './pages/ContextPage'
import UseReducerPage from './pages/UseReducerPage'
import RefsPage from './pages/RefsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'controlled':
        return <ControlledPage />;
      case 'uncontrolled':
        return <UncontrolledPage />;
      case 'state-lifting':
        return <StateLiftingPage />;
      case 'context':
        return <ContextPage />;
      case 'useReducer':
        return <UseReducerPage />;
      case 'refs':
        return <RefsPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      
      <div className="app-content">
        {renderCurrentPage()}
      </div>
    </div>
  )
}

export default App