import React from 'react'
import { useSelector } from 'react-redux'
import UserLogged from '../User/UserLogged'
import DriverLogged from '../Driver/DriverLogged'

export default function Logged() {

  const userType = useSelector(state => state.isLogged.userType)
    
  return (
    <div className='logged'>
      

      {
          userType === 0 ?
          <UserLogged/>
          :
          <DriverLogged/>
      }
    </div>
  )
}

