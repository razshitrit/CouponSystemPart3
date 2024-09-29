import React from 'react'
import './AddCompany.css'
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LoginRequestModel } from '../../../Models/LoginRequestModel';
import { loginApi } from '../../../Services/LoginApiService';
import notificationService from '../../../Services/NotificationService';
import { CompanyModel } from '../../../Models/CompanyModel';
import { createCompanyApi } from '../../../Services/AdminApiService';
import store from '../../../Redux/Store';
import { addCompany } from '../../../Redux/AdminSlice';


interface AddCompanyProps {

}

const AddCompany = (props: AddCompanyProps) => {
    const navigate = useNavigate();


    const schema = zod.object({
        name: zod.string().min(1, "invalid name minimum 1 characters"),
        email: zod.string().email("invalid email e.g name@example.com"),
        password: zod.string().min(4, "invalid password minimum 4 characters"),
        
    })
    
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<CompanyModel>({ mode: "all", resolver: zodResolver(schema) });

    function addCompanyFormSubmit (data: CompanyModel) {
        return createCompanyApi(data)
            .then(response => {
                // store.dispatch({type: "addCompany", payload: response?.data}) Not Good For Us
                store.dispatch(addCompany(response?.data))
                notificationService.successPlainText("Company was added successfully");
                navigate("/admin/companies")
            })
            .catch(err => {
                notificationService.errorAxiosApiCall(err)
            });
    };
  return (
    <div className="login-container">
    <h1 className="login-title">Add Company Form</h1>
    <form className='login-form' onSubmit={handleSubmit(addCompanyFormSubmit)}>

      <label htmlFor="name">Name</label>
        <input {...register("name")} name="name" type="text" placeholder="name..." />
        {(errors?.name) && <span>{errors.name.message}</span>}

        <label htmlFor="email">Email</label>
        <input {...register("email")} name="email" type="email" placeholder="Email..." />
        {(errors?.email) && <span>{errors.email.message}</span>}

        <label htmlFor="password">Password</label>
        <input {...register("password")} name="password" type="password" placeholder="Password..." />
        {(errors?.password) && <span>{errors.password.message}</span>}

        <button disabled={!isValid || isSubmitting}>Add Company</button>
    </form>
</div>

  )
}

export default AddCompany