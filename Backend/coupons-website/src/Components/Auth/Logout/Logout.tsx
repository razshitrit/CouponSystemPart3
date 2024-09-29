import { useNavigate } from 'react-router-dom'
import './Logout.css'
import { useEffect } from 'react'
import store from '../../../Redux/Store'
import { logout } from '../../../Redux/AuthSlice'
import { adminClearAll } from '../../../Redux/AdminSlice'
import { companyClearAll } from '../../../Redux/CompanySlice'
import { customerClearAll } from '../../../Redux/CustomerSlice'
import notificationService from '../../../Services/NotificationService'

const Logout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch(logout());
    store.dispatch(adminClearAll());
    store.dispatch(companyClearAll());
    store.dispatch(customerClearAll());
    notificationService.successPlainText("Logout successful");
    navigate("/login")
    return () => { 
      
    }
  }, [])

  return (
    <>
    </>
  )
}

export default Logout