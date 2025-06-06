package com.flightcoordinator.authservice.dto;

public class RegisterDTO {
  private String fullName;
  private String email;
  private String password;

  public RegisterDTO() {
  }

  public RegisterDTO(String fullName, String email, String password) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
