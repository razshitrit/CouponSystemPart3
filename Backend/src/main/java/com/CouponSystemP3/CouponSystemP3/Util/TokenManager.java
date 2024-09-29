package com.CouponSystemP3.CouponSystemP3.Util;

import com.CouponSystemP3.CouponSystemP3.Enums.ClientType;
import com.CouponSystemP3.CouponSystemP3.Exceptions.CouponSystemException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor

public class TokenManager {
    private final Map<UUID, TokenInformation> tokens;

    public UUID addToken(TokenInformation tokenInformation) {
        deleteToken(tokenInformation);
        UUID newToken = UUID.randomUUID();
        while (tokens.containsKey(newToken)) {
            newToken = UUID.randomUUID();
        }
        tokens.put(newToken, tokenInformation);
        return newToken;
    }

    private void deleteToken(TokenInformation tokenInformation) {
        tokens.entrySet().removeIf((token) -> token.getValue().getId() == tokenInformation.getId());
    }

    public long validateToken(UUID token, ClientType clientType) throws CouponSystemException {
        TokenInformation tokenInformation = tokens.get(token);
        if (token == null || !tokens.containsKey(token)) {
            throw new CouponSystemException("Invalid token");
        }

        if (tokenInformation.getClientType() != clientType) {
            throw new CouponSystemException("Unauthorized action");
        }
        tokenInformation.setExpiration(LocalDateTime.now().plusDays(1));
        return tokenInformation.getId();
    }



    @Scheduled(timeUnit = TimeUnit.HOURS, fixedRate = 1)
    private void deleteExpiredTokens() {
        tokens.entrySet().removeIf((token) -> token.getValue().getExpiration().isBefore(LocalDateTime.now()));
    }



}
