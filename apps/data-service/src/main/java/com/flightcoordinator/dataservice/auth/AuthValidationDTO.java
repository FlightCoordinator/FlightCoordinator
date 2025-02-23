package com.flightcoordinator.dataservice.auth;

public class AuthValidationDTO {
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
