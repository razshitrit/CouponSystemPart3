package com.CouponSystemP3.CouponSystemP3.Services;

import com.CouponSystemP3.CouponSystemP3.Exceptions.CouponSystemException;
import com.CouponSystemP3.CouponSystemP3.Enums.ClientType;
import com.CouponSystemP3.CouponSystemP3.Util.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LoginManager {

    private final AdminService adminService;
    private final CompanyService companyService;
    private final CustomerService customerService;

    public LoginResponse manageLogin(String email, String password, ClientType clientType) throws CouponSystemException {
        LoginResponse loginResponse = null;
        switch (clientType) {
            case ADMIN: {
                loginResponse = adminService.login(email, password);
                break;
            }
            case COMPANY: {
                loginResponse = companyService.login(email, password);
                break;

            }
            case CUSTOMER:{
                loginResponse = customerService.login(email, password);
                break;
            }
            default: {
                throw new CouponSystemException("Invalid Client Type");
            }
        }
        return loginResponse;
    }

}
