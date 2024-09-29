package com.CouponSystemP3.CouponSystemP3.Util;

import com.CouponSystemP3.CouponSystemP3.Enums.Category;
import com.CouponSystemP3.CouponSystemP3.Beans.Company;
import com.CouponSystemP3.CouponSystemP3.Beans.Coupon;
import com.CouponSystemP3.CouponSystemP3.Beans.Customer;
import com.CouponSystemP3.CouponSystemP3.Repositories.CompanyRepo;
import com.CouponSystemP3.CouponSystemP3.Repositories.CouponRepo;
import com.CouponSystemP3.CouponSystemP3.Repositories.CustomerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Component
@Order(1)
public class InitData implements CommandLineRunner {

    private final CompanyRepo companyRepo;
    private final CouponRepo couponRepo;
    private final CustomerRepo customerRepo;



    @Override
    public void run(String... args) throws Exception {

        initCompanies();
        initCoupons();
        initCustomers();
        initPurchases();
    }

    public void initCompanies () {
        Company company1 = new Company(0, "RazShitrit", "RazShitrit@gmail.com", "1111", null);
        Company company2 = new Company(0, "RazLevi", "RazLevi@gmail.com", "1234", null);
        companyRepo.saveAll(List.of(company1, company2));
    }

    public void initCoupons () {
        Company company1 = new Company(1, "RazShitrit", "RazShitrit@gmail.com", "1111", null);
        Company company2 = new Company(2, "RazLevi", "RazLevi@gmail.com", "1234", null);

        Coupon coupon1 = new Coupon(1,company1, Category.flights,"Flight1","Flight1", LocalDate.of(2024,5,7),LocalDate.of(2025,5,7),8,1000,"https://www.israelhayom.co.il/wp-content/uploads/2023/12/10/10/KOK56189.jpg");
        Coupon coupon2 = new Coupon(1,company1, Category.food,"KingBurger","1 Meal", LocalDate.of(2024,5,7),LocalDate.of(2025,5,7),50,70,"https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/768px-Burger_King_logo_%281999%29.svg.png");
        Coupon coupon3 = new Coupon(2,company2, Category.restaurant,"AsafGranit","AsafGranit Restaurant", LocalDate.of(2024,5,7),LocalDate.of(2025,5,7),10,120,"https://www.israelhayom.co.il/wp-content/uploads/2023/02/20/20/%D7%90%D7%A1%D7%A3-%D7%92%D7%A8%D7%A0%D7%99%D7%98_%D7%A7%D7%A8%D7%93%D7%99%D7%98-%D7%A6%D7%99%D7%9C%D7%95%D7%9D-%D7%AA%D7%9E%D7%99-%D7%91%D7%A8-%D7%A9%D7%99-4-1280x960.jpeg");
        Coupon coupon4 = new Coupon(2,company2, Category.movies,"YesPlanet","1 Movie", LocalDate.of(2024,5,7),LocalDate.of(2025,5,7),1000,50,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxlhLlwtMS0hDzBbj_b8pqIjA8wgcDDYTrAA&s");
        couponRepo.saveAll(List.of(coupon1, coupon2, coupon3, coupon4));
    }

    public void initCustomers () {
        Customer customer1 = new Customer(1, "Dor", "Miha", "Dor@gmail.com", "1234", null);
        Customer customer2 = new Customer(2, "Nir", "Drori", "Nir@gmail.com", "1111", null);
        customerRepo.saveAll(List.of(customer1, customer2));

    }

    public void initPurchases () {
        couponRepo.purchaseCoupon(1, 1);
        couponRepo.purchaseCoupon(2, 2);
    }


}
