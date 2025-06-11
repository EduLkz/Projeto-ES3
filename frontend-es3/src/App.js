import { Route, Routes } from 'react-router';
import './App.css';
import Login from './Login';
import Logged from './Logged';
import { useSelector } from 'react-redux';
import Deliveries from './Deliveries';
import LoggedHeader from './LoggedHeader';

function App() {

  const logged = useSelector(state => state.isLogged.value)

  return (
    <div className="App">
      
     { logged && <LoggedHeader/>}
    <Routes>

      <Route path="/" element={ logged ? <Logged/> : <Login/> }/>
      <Route path="/profile" element={ <></>}/>
      <Route path="/MinhasEntregas" element={<Deliveries/>} />
    </Routes> 
    

    </div>
  );
}

export default App;
