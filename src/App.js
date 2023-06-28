import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";

function App() {
  return (
      <>
        <Home />
      {/*// <BrowserRouter>*/}
      {/*//   <Routes>*/}
      {/*//     <Route path="/" element={<Sidebar/>}></Route>*/}
      {/*//   </Routes>*/}
      {/*// </BrowserRouter>*/}
      </>
  );
}

export default App;
