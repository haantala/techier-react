import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from './components/sidebar';
import AppRoutes from './router/routes';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <SideBar>
          <AppRoutes />
        </SideBar>
      </BrowserRouter>
    </div>
  );
};

export default App;
