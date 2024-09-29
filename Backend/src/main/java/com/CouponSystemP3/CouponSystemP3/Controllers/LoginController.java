package com.CouponSystemP3.CouponSystemP3.Controllers;

import com.CouponSystemP3.CouponSystemP3.Exceptions.CouponSystemException;
import com.CouponSystemP3.CouponSystemP3.Util.LoginRequest;
import com.CouponSystemP3.CouponSystemP3.Util.LoginResponse;
import com.CouponSystemP3.CouponSystemP3.Services.LoginManager;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/login")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LoginController {
    private final LoginManager loginManager;

    @PostMapping
    public LoginResponse login(@RequestBody LoginRequest loginRequest) throws CouponSystemException {
        return loginManager.manageLogin(loginRequest.getEmail(), loginRequest.getPassword(), loginRequest.getClientType());
    }
}
