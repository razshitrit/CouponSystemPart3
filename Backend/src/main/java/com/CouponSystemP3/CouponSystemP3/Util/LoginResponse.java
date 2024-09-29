package com.CouponSystemP3.CouponSystemP3.Util;

import com.CouponSystemP3.CouponSystemP3.Enums.ClientType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private UUID token;
    private long id;
    private String email;
    private String name;
    private ClientType clientType;
}
