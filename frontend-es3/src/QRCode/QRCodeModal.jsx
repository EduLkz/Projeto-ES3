import React from 'react';
import QRCode from 'react-qr-code';

export default function QRCodeModal({ cod, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Código de Entrega</h3>
        <div style={{ background: 'white', padding: '16px', margin: '20px 0' }}>
          <QRCode value={cod} size={200} />
        </div>
        <p>Código: {cod}</p>
        <button className='loginButtons' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};