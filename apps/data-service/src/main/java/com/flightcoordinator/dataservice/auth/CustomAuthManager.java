package com.flightcoordinator.dataservice.auth;

import java.util.function.Supplier;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.flightcoordinator.dataservice.constants.AuthConstants;
import com.flightcoordinator.dataservice.dto.misc.AuthValidationDTO;

import jakarta.servlet.http.Cookie;

@Component
public class CustomAuthManager implements AuthorizationManager<RequestAuthorizationContext> {
  private final RestTemplate client = new RestTemplate();

  @SuppressWarnings("null")
  private boolean validate(Cookie at) {
    HttpHeaders headers = new HttpHeaders();

    String cookie = at.getName() + "=" + at.getValue() + ";";

    headers.add("Accept", "application/json");
    headers.add("Cookie", cookie);

    HttpEntity<Object> httpEntity = new HttpEntity<>(null, headers);

    try {
      ResponseEntity<AuthValidationDTO> response = client.exchange(AuthConstants.AUTH_SERVICE_URL, HttpMethod.POST,
          httpEntity, AuthValidationDTO.class);

      return !(response == null || response.getBody() == null
          || (response.getBody() != null && response.getBody().isAuthenticated()));
    } catch (RestClientException e) {
      return false;
    }
  }

  @Override
  @Nullable
  public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext context) {
    Cookie[] cookies = context.getRequest().getCookies();
    Cookie at = null;

    if (cookies == null || cookies.length == 0) {
      return new AuthorizationDecision(false);
    }
    for (Cookie cookie : cookies) {
      if ("fc_at".equals(cookie.getName())) {
        at = cookie;
        break;
      }
    }
    if (at == null) {
      return new AuthorizationDecision(false);
    }
    boolean isAuthenticated = validate(at);

    if (isAuthenticated == false) {
      return new AuthorizationDecision(false);
    }
    return new AuthorizationDecision(true);
  }
}
