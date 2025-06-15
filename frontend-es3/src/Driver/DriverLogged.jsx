import React, { useEffect, useState } from 'react'
import QRCodeReader from '../QRCode/QRCodeReader'
import { useSelector } from 'react-redux';
import { getAPIRoute, getPedidosRota, confirmarEntrega } from "../api/apiCalls";

export default function DriverLogged() {

  function getCoordenadas() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não suportada'));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }


  const getRoute = async () => {
    const pos = await getCoordenadas();
    const { latitude, longitude } = pos.coords
    const coords = userDeliveries
      .map(pedido => pedido.endereco)
    const body = {
      origin: `${latitude}, ${longitude}`,
      coords: coords
    }
    getAPIRoute(body);
  }

  const userType = useSelector(state => state.isLogged.userType);

  const [userDeliveries, setUserDeliveries] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState(null);
  const [manualCode, setManualCode] = useState('');

  const handleConfirmClick = (delivery) => {
    setCurrentDelivery(delivery);
    setShowConfirmation(true);
  };


  const user = useSelector(state => state.isLogged.user)

    useEffect(() => {
        callPedidos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callPedidos = async () => {
      setIsLoading(true);
      
      const body = {id: String(user['id']), user_type: String(userType)};
      
      const response = await getPedidosRota(body);
      
      setUserDeliveries(response.data || []); 

      setIsLoading(false);
  };

  const handleQRCodeSuccess = (data) => {
    setManualCode(data)
  };

  const handleConfirm = async() => {
    const body = {
      cod: String(manualCode),
      id: String(user.id)
    }

    console.log(body)
    const res = await confirmarEntrega(body)

    if(res.status < 400){
      confirmDelivery()
    }
  };

  const confirmDelivery = () => {
    console.log('Entrega confirmada:', currentDelivery.id);
    setShowConfirmation(false);
    setManualCode('');
    callPedidos();
  };


  return (
    <div className='addCoord'>
        

        <table className='coordTable'>
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
                    <td>{d.endereco}</td>
                    <td>
                      <button onClick={() => handleConfirmClick(d)}>Confirmar Entrega</button>
                    </td>
                </tr>
            )}))}
          </tbody>
        </table>

        {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>Confirmar Entrega</h3>
            <button className='loginButtons' onClick={() => setShowConfirmation(false)}>Fechar</button>
            <p>Pedido: {currentDelivery?.cod}</p>
            
            <div className="qr-section">
              <h4>Ler QR Code</h4>
              <QRCodeReader onSuccess={handleQRCodeSuccess} />
            </div>
            
            <div className="or-divider">OU</div>
            
            <div className="manual-section">
              <h4>Digite os 6 primeiros dígitos</h4>
              <input 
                type="text" 
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                maxLength={6}
                placeholder="6 dígitos do código"
              />
              <button className='loginButtons' onClick={handleConfirm}>Confirmar</button>
            </div>
            
            
          </div>
        </div>
      )}

        <button className='loginButtons' onClick={getRoute}>
          Gerar Rota
        </button>
    </div>
  )
}
