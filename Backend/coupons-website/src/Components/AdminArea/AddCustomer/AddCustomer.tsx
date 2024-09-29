import React from 'react'
import './AddCustomer.css'
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LoginRequestModel } from '../../../Models/LoginRequestModel';
import { loginApi } from '../../../Services/LoginApiService';
import notificationService from '../../../Services/NotificationService';
import { CompanyModel } from '../../../Models/CompanyModel';
import { createCompanyApi, createCustomerApi } from '../../../Services/AdminApiService';
import store from '../../../Redux/Store';
import { addCompany, addCustomer } from '../../../Redux/AdminSlice';
import { CustomerModel } from '../../../Models/CustomerModel';


interface AddCustomerProps {

}

const AddCustomer = (props: AddCustomerProps) => {
    const navigate = useNavigate();


    const schema = zod.object({
       
        firstName: zod.string().min(1, "invalid first name minimum 1 characters"),
        lastName: zod.string().min(1, "invalid last name minimum 1 characters"),
        email: zod.string().email("invalid email e.g name@example.com"),
        password: zod.string().min(4, "invalid password minimum 4 characters"),
        
    })
    
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<CustomerModel>({ mode: "all", resolver: zodResolver(schema) });

    function addCustomerFormSubmit (data: CustomerModel) {
        return createCustomerApi(data)
            .then(response => {
                // store.dispatch({type: "addCompany", payload: response?.data}) Not Good For Us
                store.dispatch(addCustomer(response?.data))
                notificationService.successPlainText("Customer was added successfully");
                navigate("/admin/customers")
            })
            .catch(err => {
                notificationService.errorAxiosApiCall(err)
            });
    };
  return (
    <div className="login-container">
    <h1 className="login-title">Add Customer Form</h1>
    <form className='login-form' onSubmit={handleSubmit(addCustomerFormSubmit)}>

    

        <label htmlFor="firstName">First Name</label>
        <input {...register("firstName")} name="firstName" type="text" placeholder="firstName..."  />
        {(errors?.firstName) && <span>{errors.firstName.message}</span>}

        <label htmlFor="lastName">Last Name</label>
        <input {...register("lastName")} name="lastName" type="text" placeholder="lastName..."  />
        {(errors?.lastName) && <span>{errors.lastName.message}</span>}

        <label htmlFor="email">Email</label>
        <input {...register("email")} name="email" type="email" placeholder="Email..." />
        {(errors?.email) && <span>{errors.email.message}</span>}

        <label htmlFor="password">Password</label>
        <input {...register("password")} name="password" type="password" placeholder="Password..." />
        {(errors?.password) && <span>{errors.password.message}</span>}

        <button disabled={!isValid || isSubmitting}>Add Customer</button>
    </form>
</div>

  )
}

export default AddCustomer