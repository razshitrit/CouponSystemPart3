package com.CouponSystemP3.CouponSystemP3.Services;

import com.CouponSystemP3.CouponSystemP3.Enums.Category;
import com.CouponSystemP3.CouponSystemP3.Beans.Company;
import com.CouponSystemP3.CouponSystemP3.Beans.Coupon;
import com.CouponSystemP3.CouponSystemP3.Exceptions.CouponSystemException;
import com.CouponSystemP3.CouponSystemP3.Enums.ClientType;
import com.CouponSystemP3.CouponSystemP3.Util.LoginResponse;
import com.CouponSystemP3.CouponSystemP3.Util.TokenInformation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class CompanyService extends ClientService {

    @Override
    public LoginResponse login(String email, String password) throws CouponSystemException {
        Company companyFromDb = companyRepo.findByEmailAndPassword(email, password).orElseThrow(() -> new CouponSystemException("Email or password is wrong"));
        TokenInformation tokenInformation = new TokenInformation(companyFromDb.getId(), email, LocalDateTime.now().plusDays(1), ClientType.COMPANY);
        UUID token = tokenManager.addToken(tokenInformation);
        return new LoginResponse(token, companyFromDb.getId(),  email, companyFromDb.getName(), ClientType.COMPANY);
    }

    @Transactional
    public Coupon addCoupon(UUID token, Coupon coupon) throws CouponSystemException {
        long companyId = tokenManager.validateToken(token, ClientType.COMPANY);
        Company companyFromDb = companyRepo.findById(companyId).orElseThrow(() -> new CouponSystemException("Company does not exist"));
        if (couponRepo.existsByTitleAndCompanyId(coupon.getTitle(), companyId)) {
            throw new CouponSystemException("Coupon title already exists");
        }
        coupon.setCompany(companyFromDb);
        return couponRepo.save(coupon);
    }


    @Transactional
    public Coupon updateCoupon(UUID token, Coupon coupon) throws CouponSystemException {
        long companyId = tokenManager.validateToken(token, ClientType.COMPANY);
        Company companyFromDb = companyRepo.findById(companyId).orElseThrow(() -> new CouponSystemException("Company does not exist"));

        if (!couponRepo.existsByIdAndCompanyId(coupon.getId(), companyId)) {
            throw new CouponSystemException("Coupon does not exist");
        }
        if (couponRepo.existsByTitleAndCompanyIdAndIdNot(coupon.getTitle(), companyId, coupon.getId())) {
            throw new CouponSystemException("Coupon title already exists");
        }
        coupon.setCompany(companyFromDb);
        return couponRepo.saveAndFlush(coupon);
    }

    @Transactional
    public void deleteCoupon(UUID token, long couponID) throws CouponSystemException {
        long companyId = tokenManager.validateToken(token, ClientType.COMPANY);
        if (!couponRepo.existsById(couponID)) {
            throw new CouponSystemException("Coupon does not exist");
        }
        couponRepo.deletePurchasedCoupons(companyId);
        couponRepo.deleteById(couponID);
    }


    public List<Coupon> getCompanyCoupons(UUID token) throws CouponSystemException {
        long companyId = tokenManager.validateToken(token, ClientType.COMPANY);

        if (!companyRepo.existsById(companyId)) {
            throw new CouponSystemException("Company does not exist");
        }
        return couponRepo.getCompanyCoupons(companyId);
    }


    public List<Coupon> getCompanyCoupons(UUID token, Category category) throws CouponSystemException {
        long companyId = tokenManager.validateToken(token, ClientType.COMPANY);

        if (!companyRepo.existsById(companyId)) {
            throw new CouponSystemException("Company does not exist");
        }
        return couponRepo.getCompanyCouponsByCategory(companyId, category.name());

    }

    public List<Coupon> getCompanyCoupons(UUID token, double maxPrice) throws CouponSystemException {
        long companyId = tokenManager.validateToken(token, ClientType.COMPANY);

        if (!companyRepo.existsById(companyId)) {
            throw new CouponSystemException("Company does not exist");
        }
        return couponRepo.getCompanyCouponsByMaxPrice(companyId, maxPrice);
    }

    public Company getCompanyDetails(UUID token) throws CouponSystemException {
        long companyId = tokenManager.validateToken(token, ClientType.COMPANY);
        return companyRepo.findById(companyId).orElseThrow(() -> new CouponSystemException("Company does not exist"));
    }

}