import { useEffect, useState } from 'react'
import './AllCompanies.css'
import { getCompaniesApi } from '../../../Services/AdminApiService'
import notificationService from '../../../Services/NotificationService'
import store from '../../../Redux/Store'
import { getCompanies } from '../../../Redux/AdminSlice'
import { CompanyModel } from '../../../Models/CompanyModel'
import CompanyCard from '../../General/Cards/CompanyCard/CompanyCard'
import { Link, useNavigate } from 'react-router-dom'


const AllCompanies = () => {
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().admin.companies)

    useEffect(() => {
        if (companies.length === 0) {
            getCompaniesApi().then((response) => {
                notificationService.successPlainText("Companies loaded")
                store.dispatch(getCompanies(response.data))
                setCompanies(store.getState().admin.companies)
            }).catch((error) => {
                notificationService.errorAxiosApiCall(error)
            })

            return () => {

            }
        }

    }, [])
    return (
        <div>
            <Link to="/admin/company/add" className="btn btn-primary">Add Company</Link>
            {
                companies.length > 0
                    ?
                    // c as company
                    companies.map((c) => (
                        <>
                            {/* <div key={company.id}><p>{company.name}</p></div> */}
                            <CompanyCard key={c.id} company={c} />
                        </>
                    ))
                    :
                    <p>No Companies</p>
            }
        </div>
    )
}

export default AllCompanies