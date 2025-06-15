import React from 'react'
import { useSelector } from 'react-redux'

export default function UserProfile() {

  const userInfo = useSelector(state => state.isLogged.user);

  return (
    <div className="profile">
        {
          (userInfo) &&
          <table className='coordTable'> 
          <thead>
            <th colspan="2"  className='coordIndex'>{userInfo.user_type === '0' ? 'Cliente': 'Entregador'}</th>
          </thead>
            <tbody>
            
            <tr className='coord'><td className='coordIndex'>Nome: </td><td>{userInfo.nome}</td></tr>
            <tr className='coord'><td className='coordIndex'>Email: </td><td>{userInfo.email}</td></tr>
            <tr className='coord'><td className='coordIndex'>Cel: </td><td>{userInfo.cel}</td></tr>
            {userInfo.user_type === '0' && <tr className='coord'><td className='coordIndex'>Endereço: </td><td>{userInfo.endereco}</td></tr>}
          </tbody></table>
        }
    </div>
  )
}
