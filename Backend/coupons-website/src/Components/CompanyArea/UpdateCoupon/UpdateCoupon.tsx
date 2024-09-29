import React, { useState } from 'react'
import './UpdateCoupon.css'
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router";

import notificationService from '../../../Services/NotificationService';
import store from '../../../Redux/Store';
import { useParams } from 'react-router-dom';
import { CouponModel } from '../../../Models/CouponModel';
import { updateCouponApi } from '../../../Services/CompanyApiService';
import { updateCoupon } from '../../../Redux/CompanySlice';


interface UpdateCouponProps {
}

const UpdateCoupon = (props: UpdateCouponProps) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string>("https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newImageUrl = e.target.value;
    setImagePreview(newImageUrl);
  }


  const params = useParams();
  const couponId = Number(params.id);
  const coupon = store.getState().company.coupons.find(c => c.id === couponId);
  const schema = zod.object({
    category: zod.string(),
    title: zod.string().min(1, "you must enter a title"),
    description: zod.string().min(1, "you must enter a description"),
    amount: zod.coerce.number().min(1, "Please enter a valid amount"), 
    image: zod.string().url("invalid image URL"),
    price: zod.coerce.number().min(1, "Please enter a valid price"), 
    startDate: zod.string().transform((dateString, ctx) => {
      const date = new Date(dateString);
      if (!zod.date().safeParse(date).success) {
        ctx.addIssue({
          code: zod.ZodIssueCode.invalid_date,
        });
      }
      return date;
    }),
    endDate: zod.string().transform((dateString, ctx) => {
      const date = new Date(dateString);
      if (!zod.date().safeParse(date).success) {
        ctx.addIssue({
          code: zod.ZodIssueCode.invalid_date,
        });
      }
      return date;
    }),
  });


  const { register, handleSubmit, control, formState: { errors, isValid, isSubmitting } } =
    useForm<CouponModel>({
      defaultValues: {
        ...coupon || {},
        startDate: coupon ? new Date(coupon.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0], // Format as string for display
        endDate: coupon ? new Date(coupon.endDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0], // Format as string for display
      },
      mode: "all",
      resolver: zodResolver(schema)
    });

  function updateCouponFormSubmit(data: CouponModel) {
    data.id = couponId;
    data.companyId = store.getState().auth.user.id;
    data.startDate = new Date(data.startDate).toISOString();
    data.endDate = new Date(data.endDate).toISOString();
  
    return updateCouponApi(data)
      .then(response => {
        // store.dispatch({type: "updateCoupon", payload: response?.data}) Not Good For Us
        store.dispatch(updateCoupon(data))
        notificationService.successPlainText("Coupon was updated successfully");
        navigate("/company/coupons")
      })
      .catch(err => {
        notificationService.errorAxiosApiCall(err)
      });
  };
  return (
    <div className="login-container">
      <h1 className="login-title">Update Coupon Form</h1>
      <form className='login-form' onSubmit={handleSubmit(updateCouponFormSubmit)}>
        {(errors?.category) ? <span>{errors.category?.message}</span> : <label htmlFor="category">Category</label>}
        <select {...register("category")}>
          <option value="food">food</option>
          <option value="flights">flights</option>
          <option value="restaurant">restaurant</option>
          <option value="electricity">electricity</option>
          <option value="movies">movies</option>
          <option value="vacation">vacation</option>
        </select>

        {(errors?.title) ? <span>{errors.title?.message}</span> : <label htmlFor="title">Title</label>}
        <input {...register("title")} name="title" type="text" placeholder="Coupon Title" />

        {(errors?.description) ? <span>{errors.description?.message}</span> : <label htmlFor="description">Description</label>}
        <input {...register("description")} name="description" type="text" placeholder="Coupon Description" />

        {(errors?.amount) ? <span>{errors.amount?.message}</span> : <label htmlFor="amount">Amount</label>}
        <input {...register("amount")} name="amount" type="number" placeholder="Coupon Amount" />

        {/* Image input with preview */}
        {(errors?.image) ? <span>{errors.image?.message}</span> : <label htmlFor="image">Image</label>}
        <input
          {...register("image")}
          name="image"
          type="text"
          placeholder="Coupon Image"
          onChange={handleImageChange} // Update image preview on change
        />

        {/* Image preview */}
        <div className="image-preview-container">
          {imagePreview && <img src={imagePreview} alt="Image Preview" className="image-preview" width={250} height={150} />}
        </div>

        {(errors?.price) ? <span>{errors.price?.message}</span> : <label htmlFor="price">Price</label>}
        <input {...register("price")} name="price" type="number" placeholder="Coupon Price" />

        {(errors?.startDate) ? <span>{errors.startDate?.message}</span> : <label htmlFor="startDate">StartDate</label>}
        <input {...register("startDate")} name="startDate" type="date" placeholder="Coupon StartDate" />

        {(errors?.endDate) ? <span>{errors.endDate?.message}</span> : <label htmlFor="endDate">EndDate</label>}
        <input {...register("endDate")} name="endDate" type="date" placeholder="Coupon EndDate" />

        <button disabled={!isValid || isSubmitting}>Update Coupon</button>
      </form>
    </div>
  );
}

export default UpdateCoupon