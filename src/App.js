import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
      <>
       <BrowserRouter>
         <Routes>
           <Route path="/tasks" element={<Home />}></Route>
             <Route path="/login" element={<Login />}></Route>
         </Routes>
       </BrowserRouter>
      </>
  );
}

export default App;
