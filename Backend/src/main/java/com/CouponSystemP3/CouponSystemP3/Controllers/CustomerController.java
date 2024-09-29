package com.CouponSystemP3.CouponSystemP3.Controllers;

import com.CouponSystemP3.CouponSystemP3.Enums.Category;
import com.CouponSystemP3.CouponSystemP3.Beans.Coupon;
import com.CouponSystemP3.CouponSystemP3.Beans.Customer;
import com.CouponSystemP3.CouponSystemP3.Exceptions.CouponSystemException;
import com.CouponSystemP3.CouponSystemP3.Services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("api/customer")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping("/purchase/{couponId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void PurchaseCoupon(@RequestHeader("Authorization") UUID token, @PathVariable long couponId) throws CouponSystemException {
        customerService.PurchaseCoupon(token, couponId);
    }

    @GetMapping("/coupons")
    @ResponseStatus(HttpStatus.OK) // 200
    public List<Coupon> getCustomerCoupons(@RequestHeader("Authorization") UUID token) throws CouponSystemException {
        return customerService.getCustomerCoupons(token);

    }

    @GetMapping("/coupons-by-max-price")
    @ResponseStatus(HttpStatus.OK) // 200
    public List<Coupon> getCustomerCoupons(@RequestHeader("Authorization") UUID token, @RequestParam double maxPrice) throws CouponSystemException {
        return customerService.getCustomerCoupons(token, maxPrice);
    }

    @GetMapping("/coupons-by-category")
    @ResponseStatus(HttpStatus.OK) // 200
    public List<Coupon> getCustomerCoupons(@RequestHeader("Authorization") UUID token, @RequestParam Category category) throws CouponSystemException {
        return customerService.getCustomerCoupons(token, category);
    }

    @GetMapping("/customer-details")
    @ResponseStatus(HttpStatus.OK) // 200
    public Customer getCustomerDetails(@RequestHeader("Authorization") UUID token) throws CouponSystemException {
        return customerService.getCustomerDetails(token);
    }

    @GetMapping("/all-non-purchased-coupons")
    @ResponseStatus(HttpStatus.OK) // 200
    public List<Coupon> getAllNonPurchesedCoupons(@RequestHeader("Authorization") UUID token) throws CouponSystemException {
        return customerService.getAllNonPurchesedCoupons(token);
    }

}
