import React, {} from 'react';
import './App.css';
import { SideBar } from './Component/SideBar';
import { AppPageProvider } from './Context/appPageContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AppPageProvider children={
      <div className="h-screen w-screen flex">
        <SideBar />
        <Dashboard />
      </div>
    }/>
  );
}

export default App;
