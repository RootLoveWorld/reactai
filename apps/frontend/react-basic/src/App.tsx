import React, { useState } from 'react'
import { Provider } from 'react-redux';
import store from './store';
import { Navigation } from './components'
import HomePage from './pages/HomePage'
import ControlledPage from './pages/ControlledPage'
import UncontrolledPage from './pages/UncontrolledPage'
import StateLiftingPage from './pages/StateLiftingPage'
import ContextPage from './pages/ContextPage'
import UseReducerPage from './pages/UseReducerPage'
import UseEffectPage from './pages/UseEffectPage'
import RefsPage from './pages/RefsPage'
import ConcurrentPage from './pages/ConcurrentPage'
import TailwindPage from './pages/TailwindPage'
import ReduxPage from './pages/ReduxPage'
import ThunkPage from './pages/ThunkPage'
import SagaPage from './pages/SagaPage'
import MiraclePage from './pages/MiraclePage';

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
      case 'useEffect':
        return <UseEffectPage />;
      case 'refs':
        return <RefsPage />;
      case 'concurrent':
        return <ConcurrentPage />;
      case 'tailwind':
        return <TailwindPage />;
      case 'redux':
        return <ReduxPage />;
      case 'thunk':
        return <ThunkPage />;
      case 'saga':
        return <SagaPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <Provider store={store}>
      <div className="app">
                <MiraclePage/>
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />
        
        <div className="app-content">
          {renderCurrentPage()}
        </div>


      </div>
    </Provider>
  )
}

export default App