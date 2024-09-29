import React, { useEffect, useState } from 'react'
import './AllAvailableCoupons.css'
import { Link } from 'react-router-dom'
import { CompanyModel } from '../../../Models/CompanyModel'
import { getCompanies } from '../../../Redux/AdminSlice'
import store from '../../../Redux/Store'
import { getCompaniesApi } from '../../../Services/AdminApiService'
import notificationService from '../../../Services/NotificationService'
import CompanyCard from '../../General/Cards/CompanyCard/CompanyCard'
import { CouponModel } from '../../../Models/CouponModel'
import { getCustomerNonPurchasedCouponsApi } from '../../../Services/CustomerApiService'
import { getAllCoupons } from '../../../Redux/CustomerSlice'
import CouponCard from '../../General/Cards/CouponCard/CouponCard'

const AllAvailableCoupons = () => {
    const [allCoupons, setAllCoupons] = useState<CouponModel[]>(store.getState().customer.allCoupons);
    const [filteredCoupons, setFilteredCoupons] = useState<CouponModel[]>(store.getState().customer.allCoupons)
    const [maxPrice, setMaxPrice] = useState<number>(0)
    const [category, setCategory] = useState<string>('ALL')

    useEffect(() => {
        if (allCoupons.length === 0) {
            getCustomerNonPurchasedCouponsApi().then((response) => {
                notificationService.successPlainText("Coupons loaded")
                store.dispatch(getAllCoupons(response.data))
                setAllCoupons(response?.data)
                setFilteredCoupons(response?.data)
            }).catch((error) => {
                notificationService.errorAxiosApiCall(error)
            })
        }

        const unsubscribe = store.subscribe(() => {
            setAllCoupons(store.getState().customer.allCoupons)

        })

        return () => {
            unsubscribe()
        }
    }, [])

    const handleFilterChanges = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        let localFilteredCoupons: CouponModel[] = allCoupons;

        if (event.target.name === "price") {
            setMaxPrice(Number(event.target.value))
            console.log(event.target.value)
            if (event.target.value && event.target.value !== "0") {
                localFilteredCoupons = localFilteredCoupons.filter(c => c.price <= Number(event.target.value))
            }
            if (category !== "ALL") {
                localFilteredCoupons = localFilteredCoupons.filter(c => c.category === category)
            }

        } else {
            setCategory(event.target.value)
            if (event.target.value && event.target.value !== "ALL") {
                localFilteredCoupons = localFilteredCoupons.filter(c => c.category === event.target.value)
            }
            if (maxPrice !== 0) {
                localFilteredCoupons = localFilteredCoupons.filter(c => c.price <= maxPrice)
            }
        }
        setFilteredCoupons(localFilteredCoupons)
    }

    return (

        <div>
            <div>
                <label htmlFor="price">Max Price</label>
                <input type="number" id="price" name="price" min="0" step="0.1" value={maxPrice} onChange={(e) => handleFilterChanges(e)} />
                <select name="category" id="category" value={category} onChange={(e) => handleFilterChanges(e)} >
                    <option value="ALL">All</option>
                    <option value="food">food</option>
                    <option value="flights">flights</option>
                    <option value="restaurant">restaurant</option>
                    <option value="electricity">electricity</option>
                    <option value="movies">movies</option>
                    <option value="vacation">vacation</option>
                </select>
            </div>
            <div className='gallery'>

                {
                    filteredCoupons.length > 0
                        ?
                        // c as coupon
                        filteredCoupons.map((c) => (
                            <CouponCard key={c.id} coupon={c} isCompany={false} />
                        ))
                        :
                        <p>No Coupons Available</p>
                }

            </div>
        </div>
    )
}

export default AllAvailableCoupons