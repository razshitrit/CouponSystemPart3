import React from 'react'
import './UpdateComapny.css'
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router";

import notificationService from '../../../Services/NotificationService';
import { CompanyModel } from '../../../Models/CompanyModel';
import {  updateCompanyApi } from '../../../Services/AdminApiService';
import store from '../../../Redux/Store';
import { updateCompany } from '../../../Redux/AdminSlice';
import { useParams } from 'react-router-dom';


interface UpdateCompanyProps {
}

const UpdateCompany = (props: UpdateCompanyProps) => {
    const navigate = useNavigate();

    
    const params = useParams();
    const companyId = Number(params.id);
    const company = store.getState().admin.companies.find(c => c.id === companyId);
    const schema = zod.object({
        id: zod.number().min(1, "invalid id minimum 1 characters"),
        name: zod.string().min(1, "invalid name minimum 1 characters"),
        email: zod.string().email("invalid email e.g name@example.com"),
        password: zod.string().min(4, "invalid password minimum 4 characters"),
        
    })
    
    const { register, handleSubmit, control, formState: { errors, isValid, isSubmitting } } =
        useForm<CompanyModel>({ defaultValues: {...company}, mode: "all", resolver: zodResolver(schema) });

    function updateCompanyFormSubmit (data: CompanyModel) {
        return updateCompanyApi(data)
            .then(response => {
                // store.dispatch({type: "addCompany", payload: response?.data}) Not Good For Us
                store.dispatch(updateCompany(data))
                notificationService.successPlainText("Company was updated successfully");
                navigate("/admin/companies")
            })
            .catch(err => {
                notificationService.errorAxiosApiCall(err)
            });
    };
  return (
    <div className="login-container">
    <h1 className="login-title">Update Company Form</h1>
    <form className='login-form' onSubmit={handleSubmit(updateCompanyFormSubmit)}>

        <label htmlFor="id">Id</label>
        <input {...register("id")} name="id" type="number" placeholder="id..." disabled={true}/>
        {(errors?.id) && <span>{errors.id.message}</span>}

        <label htmlFor="name">Name</label>
        <input {...register("name")} name="name" type="text" placeholder="name..." disabled={true} />
        {(errors?.name) && <span>{errors.name.message}</span>}

        <label htmlFor="email">Email</label>
        <input {...register("email")} name="email" type="email" placeholder="Email..." />
        {(errors?.email) && <span>{errors.email.message}</span>}

        <label htmlFor="password">Password</label>
        <input {...register("password")} name="password" type="password" placeholder="Password..." />
        {(errors?.password) && <span>{errors.password.message}</span>}

        <button disabled={!isValid || isSubmitting}>Update Company</button>
    </form>
</div>

  )
}

export default UpdateCompany