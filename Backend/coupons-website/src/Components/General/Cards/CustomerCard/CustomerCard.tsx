import React from 'react'
import './CustomerCard.css'
import { CustomerModel } from '../../../../Models/CustomerModel'
import { Link } from 'react-router-dom'

interface CustomerCardProps {
    customer: CustomerModel
}


export default function CustomerCard(props: CustomerCardProps) {
  return (
    <div className="customerCard">
        <p>{props.customer.id}</p>
        <p>{props.customer.firstName}</p>
        <p>{props.customer.lastName}</p>
        <p>{props.customer.email}</p>
        <p>{props.customer.password}</p>

        <Link to={"/admin/customer/delete/" + props.customer.id}>Delete</Link>
        <Link to={"/admin/customer/update/" + props.customer.id}>Update</Link>
    </div>
  )
}
