import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import View from './views/view';

const App: React.FC = () => {
  return (
    <div className="App">
      <ToastContainer />
      <View />
    </div>
  );
}

export default App;
