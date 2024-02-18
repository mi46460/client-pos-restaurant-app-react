import React, { useState } from 'react';
import './App.css';
import { SideBar } from './Component/SideBar';
import { AppPageProvider } from './Context/appPageContext';
import Dashboard from './pages/Dashboard';
import { Navbar } from './Component/Navbar';
import Setting from './pages/Setting';

function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleOpenNavbar = () => {
    setNavbarOpen(!navbarOpen);
  }

  return (
    <AppPageProvider children={
      <div className="h-screen w-screen flex">
        <Navbar handleOpen={handleOpenNavbar} state={navbarOpen}/>
        <SideBar />
        <Dashboard />
        <Setting />
      </div>
    }/>
  );
}

export default App;
