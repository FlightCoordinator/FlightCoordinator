package com.flightcoordinator.server.dto;

public class RegisterDetailsDTO {
  private String fullName;
  private String username;
  private String email;
  private String password;
  private String passwordAgain;

  public RegisterDetailsDTO() {
  }

  public RegisterDetailsDTO(String fullName, String username, String email, String password, String passwordAgain) {
    this.fullName = fullName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.passwordAgain = passwordAgain;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
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

  public String getPasswordAgain() {
    return passwordAgain;
  }

  public void setPasswordAgain(String passwordAgain) {
    this.passwordAgain = passwordAgain;
  }
}
