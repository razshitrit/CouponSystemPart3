import React from 'react'
import './DeleteCompany.css'
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LoginRequestModel } from '../../../Models/LoginRequestModel';
import { loginApi } from '../../../Services/LoginApiService';
import notificationService from '../../../Services/NotificationService';
import { CompanyModel } from '../../../Models/CompanyModel';
import { createCompanyApi, deleteCompanyApi } from '../../../Services/AdminApiService';
import store from '../../../Redux/Store';
import { addCompany, deleteCompany } from '../../../Redux/AdminSlice';
import { Link, useParams } from 'react-router-dom';


interface DeleteCompanyProps {

}

const DeleteCompany = (props: DeleteCompanyProps) => {
    const navigate = useNavigate();
    const params = useParams();
    const companyId = Number(params.id);

    function yesDeleteCompany() {
        return deleteCompanyApi(companyId)
            .then(response => {
                // store.dispatch({type: "addCompany", payload: response?.data}) Not Good For Us
                store.dispatch(deleteCompany(companyId))
                notificationService.successPlainText("Company was deleted successfully");
                navigate("/admin/companies")
            })
            .catch(err => {
                notificationService.errorAxiosApiCall(err)
            });
    };

    function cancelDelete() {
        navigate("/admin/companies")

    }

  return (
    <div className="login-container">
    <h1 className="login-title">Delete Company</h1>

    <button className="btn btn-danger" onClick={yesDeleteCompany}>Yes</button>
    <button className="btn btn-primary" onClick={cancelDelete}>Cancel</button>
</div>

  )
}

export default DeleteCompany