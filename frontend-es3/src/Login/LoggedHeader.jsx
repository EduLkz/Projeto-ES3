import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { setLogged } from '../slices/logSlice';


export default function LoggedHeader() {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoff = () => {
    navigate('/');
    dispatch(setLogged(false))
  }

  return (
    <nav className='loggedHeader'>
      <Link to='/' className='headerLink'>Home</Link>
      <Link to='/profile' className='headerLink'>Perfil</Link>
      <Link to='/MinhasEntregas' className='headerLink'>Minhas Entregas</Link>
      <button onClick={logoff} className='headerButton'>Sair</button>
    </nav>
  )
}
