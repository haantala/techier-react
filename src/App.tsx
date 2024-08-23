import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from './components/sidebar';
import View from './views/view';

const App: React.FC = () => {
  return (
    <div className="App">
      <ToastContainer />
      <SideBar>
        <View/>
      </SideBar>
    </div>
  );
};

export default App;
