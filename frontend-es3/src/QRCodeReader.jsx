import React, { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'
import './qrcode.css'
import { useDispatch, useSelector } from 'react-redux';
import { setDriverCoord } from './slices/logSlice';

export default function QRCodeReader() {

    const driverCoord = useSelector(state => state.isLogged.driverCoord)
    
    const dispatch = useDispatch();
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null)

    const [result, setResult] = useState('')

    const [hasCamera, setHasCamera] = useState(true)
    const [cameraActive, setCameraActive] = useState(false)

    useEffect(() => {
        QrScanner.hasCamera().then(hasCamera =>{
            setHasCamera(hasCamera)
        })

        return () => {
            if(qrScannerRef.current){
                qrScannerRef.current.stop()
                qrScannerRef.current.destroy()
                qrScannerRef.current = null;
            }
        };
    }, [])

    const startScanner = () => {
        if(!videoRef.current) return;

        qrScannerRef.current = new QrScanner(
            videoRef.current,
            (result) => {
                dispatch(setDriverCoord([...driverCoord, result.data]))
                qrScannerRef.current.stop()
                setCameraActive(false)
            },
            {
                preferredCamera: 'environment',
                highlightScanRegion: true,
                highlightCodeOutline: true,
                maxScansPerSecond: 5
            }
        );

        qrScannerRef.current.start()
            .then(() => setCameraActive(true))
            .catch((err) => {
                console.error(err);
                setHasCamera(false);
            })
    }

    const stopScanner = () => {
        if(qrScannerRef.current){
            qrScannerRef.current.stop()
            setCameraActive(false)
        }
    }

    const toggleScanner = () => {
        (cameraActive) ? stopScanner() : startScanner();
    }

  return (
    <div className="qr-scanner-container">

        {!hasCamera ? (
            <p>Nenhuma camera encontrada</p>
        ) : (
            <>
                <div className='video-container'>
                    <video ref={videoRef} playsInline className='video-element'/>
                </div>

                <button onClick={toggleScanner} 
                    className={`scanner-button ${cameraActive ? 'stop-button' : 'start-button'}`} >
                    {cameraActive ? 'Parar leitura' : 'Iniciar Leitura'}
                </button>
            </>
        )}

        {result && (
            <div className="result-container">
                <h2>Resultado:</h2>
                <p className="result-text">{ result }</p>
                <button onClick={() => setResult('')} className="scanner-button clear-button">
                    Limpar
                </button>
            </div> 
        )}
    </div>
  )
}

