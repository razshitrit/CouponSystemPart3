package com.CouponSystemP3.CouponSystemP3.Util;

import com.CouponSystemP3.CouponSystemP3.Enums.ClientType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
    private ClientType clientType;
}
