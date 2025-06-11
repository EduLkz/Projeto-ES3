import React from 'react'
import { useSelector } from 'react-redux'
import UserLogged from './UserLogged'
import DriverLogged from './DriverLogged'

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
