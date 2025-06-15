import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPedidos } from './api/apiCalls';

export default function Deliveries() {
  
    const userType = useSelector(state => state.isLogged.userType);
    const [userDeliveries, setUserDeliveries] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const user = useSelector(state => state.isLogged.user)
    useEffect(() => {
        callPedidos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const callPedidos = async () => {
        setIsLoading(true);
        
        const body = {id: String(user['id']), user_type: String(userType)}; // Seu body original
        
        const response = await getPedidos(body);
        
        setUserDeliveries(response.data || []); // A ÚNICA alteração necessária (evita null)
        console.log(response.data); // Debug correto (não use userDeliveries aqui)
        
        setIsLoading(false);
    };

    

    const DriverDelivery = () => {
        return(
            <div className='addCoord'>
                <h3>My Deliveries</h3>
                <table className='coordTable'>
                    <thead style={{ borderBottom: 3, borderBottomStyle: 'solid' }}>
                        <td className='coordIndex'>Codigo</td>
                        <td className='coordIndex'>Data pedido</td>
                        <td className='coordIndex'>Status</td>
                        <td className='coordIndex'>Data Entrega</td>
                        <td className='coordIndex'>Entregador</td>
                    </thead>
                    <tbody>
                        { 
                        isLoading ? (
                        <tr>
                            <td colSpan="5" className="loading-message">
                                <div className="loading-spinner"></div>
                                Carregando pedidos...
                            </td>
                        </tr>
                        ):(
                        Array.isArray(userDeliveries) && userDeliveries.map((d) => {return(
                            <tr key={d.id}>
                                <td className='coordIndex'>{d.id}</td>
                                <td>{d.datahorapedido}</td>
                                <td className='coordIndex'>{d.status}</td>
                                <td>{d.datahoraentrega}</td>
                                <td className='coordIndex'>{d.nome_entregador}</td>
                            </tr>
                        )}))}
                    </tbody>
                    
                </table>
            </div>
        )
    }


    const UserDelivery = () => {
        return(
            <div className='addCoord'>
                <h3>My Deliveries</h3>
                <table className='coordTable'>
                    <thead style={{ borderBottom: 3, borderBottomStyle: 'solid' }}>
                        <td className='coordIndex'>Codigo</td>
                        <td className='coordIndex'>Data pedido</td>
                        <td className='coordIndex'>Status</td>
                        <td className='coordIndex'>Data Entrega</td>
                        <td className='coordIndex'>Entregador</td>
                    </thead>
                    <tbody>
                        { 
                        isLoading ? (
                        <tr>
                            <td colSpan="5" className="loading-message">
                                <div className="loading-spinner"></div>
                                Carregando pedidos...
                            </td>
                        </tr>
                        ):(
                        Array.isArray(userDeliveries) && userDeliveries.map((d) => {return(
                            <tr key={d.cod}>
                                <td className='coordIndex'>{d.cod}</td>
                                <td>{d.datahorapedido}</td>
                                <td className='coordIndex'>{d.status}</td>
                                <td>{d.datahoraentrega}</td>
                                <td className='coordIndex'>{d.nome_entregador}</td>
                            </tr>
                        )}))}
                    </tbody>
                    
                </table>
            </div>
        )
    }

    return (
        <div className="deliveries">
            {
                userType === 0 ?
                <UserDelivery/>
                :
                <DriverDelivery/>
            }
        </div>
  )
}
