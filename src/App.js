import './App.css';
import { useState, useContext } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import Settings from "./components/Settings";
import CalendarPage from "./components/CalendarPage";
import SidebarContext from './contexts/SidebarContext';

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(5);
  return (
    <SidebarContext.Provider value={sidebarWidth}>
       <BrowserRouter>
         <Routes>
           <Route path="/tasks" element={<Home  />}></Route>
           <Route path="/calendar" element={<CalendarPage />}></Route>
             <Route path="/login" element={<Login />}></Route>
             <Route path="/register" element={<Register />}></Route>
             <Route path="/" element={<HomePage />}></Route>
             <Route path="/settings" element={<Settings />}></Route>
         </Routes>
       </BrowserRouter>
      </SidebarContext.Provider>
  );
}

export default App;
