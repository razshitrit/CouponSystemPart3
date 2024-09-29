import { useEffect, useState } from 'react'
import './AllCustomers.css'
import { getCustomersApi } from '../../../Services/AdminApiService'
import notificationService from '../../../Services/NotificationService'
import store from '../../../Redux/Store'
import { getCustomers } from '../../../Redux/AdminSlice'
import CustomerCard from '../../General/Cards/CustomerCard/CustomerCard'
import { CustomerModel } from '../../../Models/CustomerModel'
import { Link } from 'react-router-dom'


const AllCustomers = () => {
    const [customers, setCustomers] = useState<CustomerModel[]>(store.getState().admin.customers)

    useEffect(() => {
        if (customers.length === 0) {
            getCustomersApi().then((response) => {
                notificationService.successPlainText("Customers loaded")
                store.dispatch(getCustomers(response?.data))
                setCustomers(store.getState().admin.customers)
            }).catch((error) => {
                notificationService.errorAxiosApiCall(error)
        })

        return () => {
            
        }
    }

}, [])
  return (
    <div>
         <Link to="/admin/customer/add" className="btn btn-primary">Add Customer</Link>
        {
        customers.length > 0 
            ?
            // c as customer
        customers.map((c) => (
        <>
           {/* <div key={customer.id}><p>{customer.name}</p></div> */}
            <CustomerCard key={c.id} customer={c} />
        </>
        ))
        :
        <p>No Ccustomers</p>
        }
    </div>
  )
}

export default AllCustomers