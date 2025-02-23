package com.flightcoordinator.authservice.dto;

import jakarta.servlet.http.Cookie;

public class TokenDTO {
  private Cookie accessToken;
  private Cookie refreshToken;

  public TokenDTO(Cookie accessToken, Cookie refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  public TokenDTO() {
  }

  public Cookie getAccessToken() {
    return accessToken;
  }

  public void setAccessToken(Cookie accessToken) {
    this.accessToken = accessToken;
  }

  public Cookie getRefreshToken() {
    return refreshToken;
  }

  public void setRefreshToken(Cookie refreshToken) {
    this.refreshToken = refreshToken;
  }
}
