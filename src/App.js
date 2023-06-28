import './App.css';
import Sidebar from './components/Sidebar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
