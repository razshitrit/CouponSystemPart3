package com.CouponSystemP3.CouponSystemP3.Services;

import com.CouponSystemP3.CouponSystemP3.Exceptions.CouponSystemException;
import com.CouponSystemP3.CouponSystemP3.Repositories.CompanyRepo;
import com.CouponSystemP3.CouponSystemP3.Repositories.CouponRepo;
import com.CouponSystemP3.CouponSystemP3.Repositories.CustomerRepo;
import com.CouponSystemP3.CouponSystemP3.Util.LoginResponse;
import com.CouponSystemP3.CouponSystemP3.Util.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class ClientService {

    @Autowired
    protected  CompanyRepo companyRepo;
    @Autowired
    protected  CouponRepo couponRepo;
    @Autowired
    protected  CustomerRepo customerRepo;
    @Autowired
    protected TokenManager tokenManager;

    public abstract LoginResponse login(String email, String password) throws CouponSystemException;

}
