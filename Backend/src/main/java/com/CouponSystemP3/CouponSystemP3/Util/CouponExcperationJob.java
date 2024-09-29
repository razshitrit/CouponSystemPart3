package com.CouponSystemP3.CouponSystemP3.Util;

import com.CouponSystemP3.CouponSystemP3.Repositories.CouponRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CouponExcperationJob extends Thread{


        private final CouponRepo couponRepo;



        @Scheduled(fixedRate = 1000 * 60 * 60 * 24, initialDelay = 1000 * 60)
        public void deleteCouponsExpired(){
            couponRepo.deleteExpiredPurchasedCoupons();
            couponRepo.deleteExpiredCoupons();
        }


    }

