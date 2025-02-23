package com.flightcoordinator.dataservice.auth;

import java.util.function.Supplier;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.flightcoordinator.dataservice.constants.AuthConstants;
import com.flightcoordinator.dataservice.exception.AppError;

import jakarta.servlet.http.Cookie;

@Component
public class CustomAuthManager implements AuthorizationManager<RequestAuthorizationContext> {
  private final RestTemplate client = new RestTemplate();

  private boolean validate(String accessToken) {
    HttpHeaders headers = new HttpHeaders();

    headers.add("Authorization", accessToken);
    headers.add("Accept", "application/json");

    HttpEntity<Object> httpEntity = new HttpEntity<>(null, headers);

    AuthValidationDTO response = client.postForObject(AuthConstants.AUTH_SERVICE_URL, httpEntity,
        AuthValidationDTO.class);
    if (response == null || !response.isAuthenticated()) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    } else {
      return response.isAuthenticated() == true;
    }
  }

  @Override
  @Nullable
  public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext context) {
    Cookie[] cookies = context.getRequest().getCookies();
    String target = null;

    if (cookies == null || cookies.length == 0) {
      return new AuthorizationDecision(false);
    }
    for (Cookie cookie : cookies) {
      if ("fc_at".equals(cookie.getName()) && cookie.isHttpOnly()) {
        target = cookie.getValue();
        break;
      }
    }
    if (target == null) {
      return new AuthorizationDecision(false);
    }
    boolean isAuthenticated = validate(target);

    if (!isAuthenticated) {
      return new AuthorizationDecision(false);
    }
    return new AuthorizationDecision(true);
  }
}
