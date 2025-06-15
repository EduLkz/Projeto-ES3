import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPedidosRota } from "../api/apiCalls";
import QRCodeModal from '../QRCode/QRCodeModal';

export default function UserLogged() {

  const [userDeliveries, setUserDeliveries] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const userInfo = useSelector(state => state.isLogged.user);
  
      useEffect(() => {
          callPedidos();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const [showQRCode, setShowQRCode] = useState(false);
    const callPedidos = async () => {
        setIsLoading(true);
        
        const body = {id: String(userInfo['id']), user_type: String(userInfo['user_type'])};
        
        const response = await getPedidosRota(body);
        
        setUserDeliveries(response.data || []); 
  
        setIsLoading(false);
    };


  const [currentDelivery, setCurrentDelivery] = useState(null);

  const handleShowQRCode = (delivery) => {
    setCurrentDelivery(delivery);
    setShowQRCode(true);
  };

  return (
    <div className="addCoord">
      <table className='coordTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data do Pedido</th>
            <th>Status</th>
            <th>Data de Entrega</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6" className="loading-message">
                <div className="loading-spinner"></div>
                Carregando pedidos...
              </td>
            </tr>
          ) : (
            userDeliveries?.map((delivery) => (
              <tr key={delivery.id}>
                <td className='coordIndex'>{delivery.id}</td>
                <td>{delivery.datahorapedido}</td>
                <td className={`status ${delivery.status.toLowerCase()}`}>
                  {delivery.status}
                </td>
                <td>{delivery.datahoraentrega || 'Pendente'}</td>
                <td>{delivery.endereco}</td>
                <td>
                  <button 
                    className='loginButtons'
                    onClick={() => handleShowQRCode(delivery)}
                    aria-label={`Gerar QRCode para pedido ${delivery.cod}`}
                  >
                    <i className="fas fa-qrcode"></i> QRCode
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showQRCode && currentDelivery && (
        <QRCodeModal 
          cod={currentDelivery.cod} 
          onClose={() => setShowQRCode(false)}
          additionalData={{
            id: currentDelivery.id,
            endereco: currentDelivery.endereco
          }}
        />
      )}
    </div>
  );
}
