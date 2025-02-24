package com.flightcoordinator.dataservice.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthValidationDTO {
  @JsonProperty("isAuthenticated")
  private boolean isAuthenticated;

  public AuthValidationDTO(boolean isAuthenticated) {
    this.isAuthenticated = isAuthenticated;
  }

  public AuthValidationDTO() {
  }

  public boolean isAuthenticated() {
    return isAuthenticated;
  }

  public void setAuthenticated(boolean isAuthenticated) {
    this.isAuthenticated = isAuthenticated;
  }
}
