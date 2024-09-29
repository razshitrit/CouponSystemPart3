import React from 'react'
import './CompanyCard.css'
import { CompanyModel } from '../../../../Models/CompanyModel'
import { Link } from 'react-router-dom'

interface CompanyCardProps {
    company: CompanyModel
}


export default function CompanyCard(props: CompanyCardProps) {
  return (
    <div className="companyCard">
        <p>{props.company.id}</p>
        <p>{props.company.name}</p>
        <p>{props.company.email}</p>
        <p>{props.company.password}</p>

        <Link to={"/admin/company/update/" + props.company.id}>Update</Link>
        <Link to={"/admin/company/delete/" + props.company.id}>Delete</Link>
    </div>
  )
}

