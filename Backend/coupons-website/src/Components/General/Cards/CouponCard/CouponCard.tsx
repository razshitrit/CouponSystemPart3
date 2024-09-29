import React from 'react'
import './CouponCard.css'

import { Link } from 'react-router-dom'
import { CouponModel } from '../../../../Models/CouponModel'
import moment from 'moment'
import { purchaseCouponApi } from '../../../../Services/CustomerApiService'
import notificationService from '../../../../Services/NotificationService'
import store from '../../../../Redux/Store'
import { purchaseCoupon } from '../../../../Redux/CustomerSlice'

interface CouponCardProps {
    coupon: CouponModel
    isCompany: Boolean
}


export default function CouponCard(props: CouponCardProps) {
  function handleCouponPurchase() {
    console.log("before purchase");
    purchaseCouponApi(props.coupon.id).then((response) => {
      console.log("after purchase");
      notificationService.successPlainText("Coupon purchased")
      store.dispatch(purchaseCoupon(props.coupon))
    }).catch((error) => {
      notificationService.errorAxiosApiCall(error)
    })
  }
  return (
    <div className="couponCard">
        <img src = {props.coupon.image} alt={"coupon image " + props.coupon.id } width={250} height ={150}/>
        <p>{props.coupon.id}</p>
        <p>{props.coupon.category}</p>
        <p>{props.coupon.title}</p>
        <p>{props.coupon.description}</p>
        <p>{moment(props.coupon.startDate).format("DD-MM-YYYY")}</p>
        <p>{moment(props.coupon.endDate).format("DD-MM-YYYY")}</p>
        <p>{props.coupon.amount}</p>
        <p>{props.coupon.price}</p>
        {
        props.isCompany
        ?
        <>
        <Link to={"/company/coupon/update/" + props.coupon.id}>Update</Link>
        <Link to={"/company/coupon/delete/" + props.coupon.id}>Delete</Link>
        </>
        :
        store.getState().customer.myCoupons.includes(props.coupon) ?
        <></>
        :
        <button onClick={() => handleCouponPurchase()}>Buy Now</button> 

        }
    </div>
  )
}

