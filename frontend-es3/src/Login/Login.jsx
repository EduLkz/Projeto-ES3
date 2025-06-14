import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogged, setUserType } from '../slices/logSlice'
import { validateLogin } from '../api/apiCalls'
import { Link } from 'react-router'

export default function Login() {

    const dispatch = useDispatch()
    const [userType, setType] = useState(0)
    const [userEmail, setUserEmail] = useState('')
    const [userPasswd, setUserPasswd] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            dispatch(setUserType(userType))
        }catch (e){
            console.log(e)
        }

        const loginValidation = await validateLogin(userEmail, userPasswd, userType);
        console.log(loginValidation)

        dispatch(setLogged(loginValidation.status === 200))
    }

  return (
    <div className='login'>
        <div className='userType'>
            <button onClick={() => { setType(0) }} className='loginButtons'>Cliente</button>
            <button onClick={() => { setType(1) }} className='loginButtons'>Entregador</button>
        </div>
        <div>
            <Link to='/register' className='registerButton loginButtons'>Não Tenho Conta</Link>
        </div>
        <div>  
            <form action="submit" method="post" className='loginForm' onSubmit={handleSubmit}>
                <h3>{ (userType === 0) ? 'Login Cliente' : 'Login Entregador'} </h3>
                <div className='formInput'>
                    <label htmlFor="login">Email: </label>
                    <input type='email' htmlFor='login' required onChange={(e) => { setUserEmail(e.target.value) }}/>
                </div>
                <div className='formInput'>
                    <label htmlFor="password">Senha </label>
                    <input type='password' htmlFor='password' required onChange={(e) => { setUserPasswd(e.target.value) }}/>
                </div>
                <button type='submit' className='loginButtons formButtom'>Login</button>
            </form>
        </div>

    </div>
  )
}
