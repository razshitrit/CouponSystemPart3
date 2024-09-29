import React from 'react'
import './DeleteCustomer.css'

import { useNavigate } from "react-router";

import notificationService from '../../../Services/NotificationService';

import {  deleteCustomerApi } from '../../../Services/AdminApiService';
import store from '../../../Redux/Store';
import {  deleteCustomer } from '../../../Redux/AdminSlice';
import { useParams } from 'react-router-dom';


interface DeleteCustomerProps {

}

const DeleteCustomer = (props: DeleteCustomerProps) => {
    const navigate = useNavigate();
    const params = useParams();
    const customerId = Number(params.id);

    function yesDeleteCustomer() {
        return deleteCustomerApi(customerId)
            .then(response => {
                // store.dispatch({type: "addCompany", payload: response?.data}) Not Good For Us
                store.dispatch(deleteCustomer(customerId))
                notificationService.successPlainText("Customer was deleted successfully");
                navigate("/admin/customers")
            })
            .catch(err => {
                notificationService.errorAxiosApiCall(err)
            });
    };

    function cancelDelete() {
        navigate("/admin/customers")

    }

  return (
    <div className="login-container">
    <h1 className="login-title">Delete Customer</h1>

    <button className="btn btn-danger" onClick={yesDeleteCustomer}>Yes</button>
    <button className="btn btn-primary" onClick={cancelDelete}>Cancel</button>
</div>

  )
}

export default DeleteCustomer