package com.CouponSystemP3.CouponSystemP3.Repositories;

import com.CouponSystemP3.CouponSystemP3.Beans.Coupon;
import com.CouponSystemP3.CouponSystemP3.Exceptions.CouponSystemException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CouponRepo extends JpaRepository<Coupon, Long> {

    boolean existsByTitleAndCompanyId(String title, long companyId);

    boolean existsByTitleAndCompanyIdAndIdNot(String title, long companyId, long id);

    boolean existsByIdAndCompanyId(long id, long companyId);

    @Modifying
    @Query(value = "delete from `customer_coupons` where coupons_id in (select id from `coupon` where company_id = ?)", nativeQuery = true)
    void deletePurchasedCoupons(long companyId);

    @Modifying
    @Query(value = "delete from `customer_coupons` where customer_id = ?", nativeQuery = true)
    void deletePurchasedCouponsByCustomerId(long customerId);


    @Transactional
    @Modifying
    @Query(value = "INSERT INTO `customer_coupons` VALUES (?, ?)", nativeQuery = true)
    void purchaseCoupon(long couponId, long customerId);

    @Query(value = "SELECT EXISTS (SELECT * FROM customer_coupons WHERE customer_id = ? AND coupons_id = ? ) AS res;", nativeQuery = true)
    int isCouponPurchasedBefore(long customer_id, long coupons_id);


    @Query(value = "select * from `coupon` join `customer_coupons` on coupon.id = customer_coupons.coupons_id where customer_id = ?", nativeQuery = true)
    List<Coupon> findByCustomer(long customerId) throws CouponSystemException;

    @Query(value = "select * from `coupon` join `customer_coupons` on coupon.id = customer_coupons.coupons_id where customer_id = ? and  price <= ?", nativeQuery = true)
    List<Coupon> findByCustomerIdAndPrice(long customerId, double price) throws CouponSystemException;

    @Query(value = "select * from `coupon` join `customer_coupons` on coupon.id = customer_coupons.coupons_id where customer_id = ? and  category = ? ", nativeQuery = true)
    List<Coupon> findByCustomerIdAndCategory(long customerId, String category) throws CouponSystemException;



    void deleteByCompanyId(long companyId);

    @Query(value = "SELECT * FROM coupon WHERE company_id = ?", nativeQuery = true)
    List<Coupon> getCompanyCoupons(long companyId);


    @Query(value = "SELECT * FROM coupon WHERE company_id = ? AND category = ? ", nativeQuery = true)
    List<Coupon> getCompanyCouponsByCategory(long companyId, String categoryName);

    @Query(value = "SELECT * FROM coupon WHERE company_id = ? AND price <= ? ", nativeQuery = true)
    List<Coupon> getCompanyCouponsByMaxPrice(long companyId, double maxPrice);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM  `coupons`.customer_coupons WHERE coupons_id IN (SELECT id FROM `coupons`.coupon WHERE end_date < CURDATE()) ", nativeQuery = true)
    void deleteExpiredPurchasedCoupons();

    @Query(value = "SELECT DISTINCT c.* FROM `coupons`.coupon c " +
            "LEFT JOIN `coupons`.customer_coupons cc " +
            "ON c.id = cc.coupons_id AND cc.customer_id = ?1 " +
            "WHERE cc.coupons_id IS NULL", nativeQuery = true)
    List<Coupon> findAllCouponsNotPurchasedByCustomer(long customerId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM `coupons`.coupon WHERE end_date < CURDATE()", nativeQuery = true)
    void deleteExpiredCoupons();

    @Query(value = "SELECT * FROM coupon WHERE end_date < CURDATE()", nativeQuery = true)
    List<Coupon> getAllExpiredCoupons();


}
