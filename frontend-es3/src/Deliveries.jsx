import React from 'react'
import { useSelector } from 'react-redux'

export default function Deliveries() {
  
    const userType = useSelector(state => state.isLogged.userType);

    const DriverDelivery = () => {
        return(
            <div>
                Driver

            </div>
        )
    }


    const UserDelivery = () => {
        return(
            <div>
                User
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
