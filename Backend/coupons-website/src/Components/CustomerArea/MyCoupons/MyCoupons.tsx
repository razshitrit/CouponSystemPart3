import React, { useEffect, useState } from 'react'
import './MyCoupons.css'
import { CouponModel } from '../../../Models/CouponModel'
import store from '../../../Redux/Store'
import { getCoupons } from '../../../Redux/CompanySlice'
import notificationService from '../../../Services/NotificationService'
import { getCustomerCouponsApi } from '../../../Services/CustomerApiService'
import { getMyCoupons } from '../../../Redux/CustomerSlice'
import CouponCard from '../../General/Cards/CouponCard/CouponCard'

const MyCoupons = () => {

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().customer.myCoupons)

    useEffect(() => {
        if (coupons.length === 0) {
            getCustomerCouponsApi().then((response) => {
                if(response?.data.length > 0) {
                    notificationService.successPlainText("Coupons loaded")
                    store.dispatch(getMyCoupons(response?.data))
                    setCoupons(store.getState().customer.myCoupons)
                }

            }).catch((error) => {
                notificationService.errorAxiosApiCall(error)
            })

            return () => {

            }
        }
    }, [])
  return (

    <div>
    {
        coupons.length > 0
            ?
                // c as coupon
                coupons.map((c) => (
                    <div key={c.id}>
                        <CouponCard key={c.id} coupon={c} isCompany={false}/>
                    </div>
                ))

            :
            <p>No Coupons</p>
        }
        </div>
  )
}

export default MyCoupons