import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Component/Register';
import Homepage from './Component/Homepage';
import Login from './Component/Login';


function App() {
  return (
    
    <>
     <Routes>
      <Route>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/' element={<Homepage/>}/>
      
      </Route>
    </Routes>
    
    </>
  );
}

export default App;
