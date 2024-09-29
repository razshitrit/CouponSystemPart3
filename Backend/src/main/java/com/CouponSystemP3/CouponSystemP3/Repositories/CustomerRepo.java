package com.CouponSystemP3.CouponSystemP3.Repositories;

import com.CouponSystemP3.CouponSystemP3.Beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, long id);

}
