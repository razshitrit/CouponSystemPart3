package com.CouponSystemP3.CouponSystemP3.Repositories;

import com.CouponSystemP3.CouponSystemP3.Beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepo extends JpaRepository<Company, Long> {

    Optional<Company> findByEmailAndPassword(String email, String password);

    boolean existsByName(String name);

    boolean existsByEmail(String email);
}
