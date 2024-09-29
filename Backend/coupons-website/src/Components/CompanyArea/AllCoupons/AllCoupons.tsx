import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './AllCoupons.css'
import CouponCard from '../../General/Cards/CouponCard/CouponCard'
import { CouponModel } from '../../../Models/CouponModel'
import { getCompanies } from '../../../Redux/AdminSlice'
import store from '../../../Redux/Store'
import { getCompaniesApi } from '../../../Services/AdminApiService'
import notificationService from '../../../Services/NotificationService'
import { getCompanyCouponsApi } from '../../../Services/CompanyApiService'
import { getCoupons } from '../../../Redux/CompanySlice'

const AllCoupons = () => {
  const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().company.coupons)
  const [filteredCoupons, setFilteredCoupons] = useState<CouponModel[]>(store.getState().company.coupons)
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [category, setCategory] = useState<string>('ALL')

  useEffect(() => {
    if (coupons.length === 0) {
      getCompanyCouponsApi().then((response) => {
        notificationService.successPlainText("Coupons loaded")
        store.dispatch(getCoupons(response?.data))
        setCoupons(store.getState().company.coupons)
        setFilteredCoupons(store.getState().company.coupons)
      }).catch((error) => {
        notificationService.errorAxiosApiCall(error)
      })

      return () => {

      }
    }
  }, [])


  const handleFilterChanges = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    let localFilteredCoupons: CouponModel[] = coupons

    if (event.target.name === "price") {
      setMaxPrice(Number(event.target.value))
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
      <div>AllCoupons</div>
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
          <option value="clothes">clothes</option>
        </select>
      </div>
      <Link to="/company/coupon/add" className="btn btn-primary">Add Coupon</Link>
      {
        filteredCoupons.length > 0
          ?
          // c as coupon
          filteredCoupons.map((c) => <CouponCard key={c.id} coupon={c} isCompany={true} />)


          :
          <p>No Coupons</p>
      }
    </div>
  )
}

export default AllCoupons