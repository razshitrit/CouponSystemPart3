import React from 'react'
import './DeleteCoupon.css'
import * as zod from "zod";

import { useNavigate } from "react-router";

import notificationService from '../../../Services/NotificationService';

import store from '../../../Redux/Store';

import { useParams } from 'react-router-dom';
import { deleteCouponApi } from '../../../Services/CompanyApiService';
import { deleteCoupon } from '../../../Redux/CompanySlice';


interface DeleteCouponProps {

}

const DeleteCoupon = (props: DeleteCouponProps) => {
    const navigate = useNavigate();
    const params = useParams();
    const couponId = Number(params.id);

    function yesDeleteCoupon() {
        return deleteCouponApi(couponId)
            .then(response => {
                // store.dispatch({type: "addCompany", payload: response?.data}) Not Good For Us
                store.dispatch(deleteCoupon(couponId))
                notificationService.successPlainText("Coupon was deleted successfully");
                navigate("/company/coupons")
            })
            .catch(err => {
                notificationService.errorAxiosApiCall(err)
            });
    };

    function cancelDelete() {
        navigate("/company/coupons")

    }

  return (
    <div className="login-container">
    <h1 className="login-title">Delete Coupon</h1>

    <button className="btn btn-danger" onClick={yesDeleteCoupon}>Yes</button>
    <button className="btn btn-primary" onClick={cancelDelete}>Cancel</button>
</div>

  )
}

export default DeleteCoupon