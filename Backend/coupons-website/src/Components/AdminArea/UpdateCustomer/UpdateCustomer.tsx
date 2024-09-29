import React from 'react'
import './UpdateCustomer.css'
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router";

import notificationService from '../../../Services/NotificationService';
import { CustomerModel } from '../../../Models/CustomerModel';
import {  updateCustomerApi } from '../../../Services/AdminApiService';
import store from '../../../Redux/Store';
import { updateCustomer } from '../../../Redux/AdminSlice';
import { useParams } from 'react-router-dom';


interface UpdateCustomerProps {
}

const UpdateCustomer = (props: UpdateCustomerProps) => {
    const navigate = useNavigate();

    
    const params = useParams();
    const customerId = Number(params.id);
    const customer = store.getState().admin.customers.find(c => c.id === customerId);
    const schema = zod.object({
        id: zod.number().min(1, "invalid id minimum 1 characters"),
        firstName: zod.string().min(1, "invalid first name minimum 1 characters"),
        lastName: zod.string().min(1, "invalid last name minimum 1 characters"),
        email: zod.string().email("invalid email e.g name@example.com"),
        password: zod.string().min(4, "invalid password minimum 4 characters"),
        
    })
    
    const { register, handleSubmit, control, formState: { errors, isValid, isSubmitting } } =
        useForm<CustomerModel>({ defaultValues: {...customer}, mode: "all", resolver: zodResolver(schema) });

    function updateCustomerFormSubmit (data: CustomerModel) {
        return updateCustomerApi(data)
            .then(response => {
                // store.dispatch({type: "addCustomer", payload: response?.data}) Not Good For Us
                store.dispatch(updateCustomer(data))
                notificationService.successPlainText("Customer was updated successfully");
                navigate("/admin/customers")
            })
            .catch(err => {
                notificationService.errorAxiosApiCall(err)
            });
    };
  return (
    <div className="login-container">
    <h1 className="login-title">Update customer Form</h1>
    <form className='login-form' onSubmit={handleSubmit(updateCustomerFormSubmit)}>

        <label htmlFor="id">Id</label>
        <input {...register("id")} name="id" type="number" placeholder="id..." disabled={true}/>
        {(errors?.id) && <span>{errors.id.message}</span>}

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

        <button disabled={!isValid || isSubmitting}>Update Customer</button>
    </form>
</div>

  )
}

export default UpdateCustomer