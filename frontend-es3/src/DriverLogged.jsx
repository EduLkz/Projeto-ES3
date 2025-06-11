import React, { useState } from 'react'
import QRCodeReader from './QRCodeReader'
import { useSelector, useDispatch} from 'react-redux';
import { setDriverCoord } from './slices/logSlice'
import axios from "axios";

export default function DriverLogged() {

    const dispatch = useDispatch()
    const [insertCord, setInsertCord] = useState(true);

    const [inputCoord, setInputCoord] = useState('')

    function getCoordenadas() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocalização não suportada'));
        }
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(inputCoord))
      if(!/^[-+]|[\w]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(inputCoord)){
        alert('Coordenadas não validas');
        return;
      }
      dispatch(setDriverCoord([...driverCoord, inputCoord]))

      

    }

    const getRoute = async () => {
      const pos = await getCoordenadas();
      const { latitude, longitude } = pos.coords
      const coord = [...driverCoord];
      const body = {
        origin: `${latitude}, ${longitude}`,
        coords: coord
      }

      console.log(JSON.stringify(body))

      axios.post('http://127.0.0.1:5000/gen-route', 
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
        console.log(res.data)
        window.open(res.data,'_blank', 'rel=noopener noreferrer')
      }).catch((e) => {
        console.error(e.message)
      })
    }

    const driverCoord = useSelector(state => state.isLogged.driverCoord)

  return (
    <div className='addCoord'>
        <button onClick={ () => setInsertCord(prevCheck => !prevCheck)} className='loginButtons'> 
          { (insertCord) ? 'Ler QrCode' : 'Ler Coord'} 
        </button>
        <div>

          { (insertCord) ? 
          <form>
            <label htmlFor="coord">Coordenadas </label>
            <input htmlFor="coord" onChange={(e) => setInputCoord(e.target.value)}/>
            <button className='loginButtons' onClick={handleSubmit}>
              Add
            </button>
          </form>
          :
            <QRCodeReader/>
          }
        </div>

        <table className='coordTable'>
        {
          driverCoord.map((c, index) => {
            return (
              <tr className='coord' key={index}>
                <td className='coordIndex'>{index} </td>
                <td> {c} </td>
                <td style={{padding: 0}}> <button onClick={() => {
                  const copy = [...driverCoord];
                  copy.splice(index, 1)
                  console.log(copy)
                  dispatch(setDriverCoord(copy))
                }} className='coordBtn'> - </button> </td>
              </tr>
            )
          })
        }
        </table>

        <button className='loginButtons' onClick={getRoute}>
          Gerar Rota
        </button>
    </div>
  )
}
