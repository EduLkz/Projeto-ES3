import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogged, setUserType } from './slices/logSlice'

export default function Login() {

    const dispatch = useDispatch()
    const [userType, setType] = useState(0)

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(setLogged(true))

        try{
            dispatch(setUserType(userType))
        }catch (e){
            console.log(e)
        }
    }

  return (
    <div className='login'>
        <div className='userType'>
            <button onClick={() => { setType(0) }} className='loginButtons'>Cliente</button>
            <button onClick={() => { setType(1) }} className='loginButtons'>Entregador</button>
        </div>
        <div>  
            <form action="submit" method="post" className='loginForm' onSubmit={handleSubmit}>
                <h3>{ (userType === 0) ? 'Login Cliente' : 'Login Entregador'} </h3>
                <div className='formInput'>
                    <label htmlFor="login">Usuario </label>
                    <input type='text' htmlFor='login' required/>                
                </div>
                <div className='formInput'>
                    <label htmlFor="password">Senha </label>
                    <input type='password' htmlFor='password' required/> 
                </div>
                <button type='submit' className='loginButtons formButtom'>Login</button>
            </form>
        </div>

    </div>
  )
}
