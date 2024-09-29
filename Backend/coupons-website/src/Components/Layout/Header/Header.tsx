import React, { useEffect, useState } from 'react'
import './Header.css'
import { LoginReponseModel } from '../../../Models/LoginResponseModel'
import store from '../../../Redux/Store'
import { Link } from 'react-router-dom'

const Header = () => {
  const [userDetails, setUserDetails] = useState<LoginReponseModel>(store.getState().auth.user)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUserDetails(store.getState().auth.user)
    })

    return () => {
      unsubscribe()
    }
  }, [])


  return (
    <div className="header">
      {userDetails.token !== "" 
      ? <>
          <p>Hello {userDetails.name}</p>
          <Link to="/logout">Logout</Link>
        </>
      : 
      <>
        <p>Hello Guest</p>
          <Link to="/login">Login</Link>
        </>
    }
    </div>
  )
}

export default Header