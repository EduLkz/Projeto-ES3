import { Route, Routes } from 'react-router';
import './App.css';
import Login from './Login/Login';
import Logged from './Login/Logged';
import { useSelector } from 'react-redux';
import Deliveries from './Deliveries';
import LoggedHeader from './Login/LoggedHeader';
import Register from './Register';
import UserProfile from './User/UserProfile';

function App() {

  const logged = useSelector(state => state.isLogged.value)

  return (
    <div className="App">
      
     { logged && <LoggedHeader/>}
    <Routes>

      <Route path="/" element={ logged ? <Logged/> : <Login/> }/>
      <Route path="/profile" element={ <UserProfile/>}/>
      <Route path="/MinhasEntregas" element={<Deliveries/>} />
      <Route path="/register" element={<Register/>} />
    </Routes> 
    

    </div>
  );
}

export default App;
