package com.CouponSystemP3.CouponSystemP3.Services;

import com.CouponSystemP3.CouponSystemP3.Beans.Company;
import com.CouponSystemP3.CouponSystemP3.Beans.Customer;
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
public class AdminService extends ClientService {


    @Override
    public LoginResponse  login(String email, String password) throws CouponSystemException {
        if (!email.equalsIgnoreCase("admin@admin.com") || !password.equals("admin")) {
            throw new CouponSystemException("Email or password is wrong");
        }
        TokenInformation tokenInformation = new TokenInformation(-1, email, LocalDateTime.now().plusDays(1), ClientType.ADMIN);
        UUID token = tokenManager.addToken(tokenInformation);
        return new LoginResponse(token, -1,  email, "Admin", ClientType.ADMIN);
    }

    @Transactional
    public Company addCompany(UUID token, Company company) throws CouponSystemException {
        tokenManager.validateToken(token, ClientType.ADMIN);

        if (companyRepo.existsByName(company.getName())) {
            throw new CouponSystemException("Company name already exists");
        }

        if (companyRepo.existsByEmail(company.getEmail())) {
            throw new CouponSystemException("Company email already exists");
        }

        return companyRepo.save(company);
    }

    @Transactional
    public void updateCompany(UUID token, Company company) throws CouponSystemException {
        tokenManager.validateToken(token, ClientType.ADMIN);

        Company companyFromDb = companyRepo.findById(company.getId()).orElseThrow(() -> new CouponSystemException("Company does not exist"));

        if (!companyFromDb.getName().equals(company.getName())) {
            throw new CouponSystemException("Company name cannot be changed");
        }
        companyFromDb.setEmail(company.getEmail());
        companyFromDb.setPassword(company.getPassword());
        companyRepo.save(company);
    }

    @Transactional
    public void deleteCompany(UUID token, long companyId) throws CouponSystemException {
        tokenManager.validateToken(token, ClientType.ADMIN);

        if (!companyRepo.existsById(companyId)) {
            throw new CouponSystemException("Company does not exist");
        }

        couponRepo.deletePurchasedCoupons(companyId);
        companyRepo.deleteById(companyId);
    }

    public List<Company> getAllCompanies(UUID token) throws CouponSystemException {
        tokenManager.validateToken(token, ClientType.ADMIN);
        return companyRepo.findAll();

    }

    public Company getOneCompany(UUID token, long companyId) throws CouponSystemException {
        tokenManager.validateToken(token, ClientType.ADMIN);
        return companyRepo.findById(companyId).orElseThrow(() ->  new CouponSystemException("Company does not exist"));
    }

    @Transactional
    public Customer addCustomer(UUID token, Customer customer) throws CouponSystemException {
        tokenManager.validateToken(token, ClientType.ADMIN);
        if (customerRepo.existsByEmail(customer.getEmail())) {
            throw new CouponSystemException("Customer email already exist");
        }
       return customerRepo.save(customer);
    }


    @Transactional
    public void updateCustomer(UUID token, Customer customer) throws CouponSystemException {
        tokenManager.validateToken(token, ClientType.ADMIN);
        Customer customerFromDb = customerRepo.findById(customer.getId()).orElseThrow(() -> new CouponSystemException("Customer not found"));
        if (!customerFromDb.getEmail().equalsIgnoreCase(customer.getEmail())) {
            if(customerRepo.existsByEmailAndIdNot(customer.getEmail(), customer.getId())) {
                throw new CouponSystemException("Email already exists");
            }
        }
        customerFromDb.setFirstName(customer.getFirstName());
        customerFromDb.setLastName(customer.getLastName());
        customerFromDb.setEmail(customer.getEmail());
        customerFromDb.setPassword(customer.getPassword());
        customerRepo.save(customerFromDb);
    }


    @Transactional
    public void deleteCustomer(UUID token, long customerId) throws CouponSystemException {
        tokenManager.validateToken(token, ClientType.ADMIN);

        if (!customerRepo.existsById(customerId)) {
            throw new CouponSystemException("Customer does not exist");
        }
        couponRepo.deletePurchasedCouponsByCustomerId(customerId);
        customerRepo.deleteById(customerId);
    }

    public List<Customer> getAllCustomers(UUID token) throws CouponSystemException {
        tokenManager.validateToken(token, ClientType.ADMIN);
        return customerRepo.findAll();
    }

    public Customer getOneCustomer(UUID token, long customerId) throws CouponSystemException {
        tokenManager.validateToken(token, ClientType.ADMIN);
        return customerRepo.findById(customerId).orElseThrow(() -> new CouponSystemException("Customer does not exist"));
    }

}
