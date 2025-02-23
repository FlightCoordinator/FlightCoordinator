package com.flightcoordinator.authservice.dto;

public class UserDetailsDTO {
  private String fullName;
  private String email;
  private Boolean isActive;
  private Boolean isLocked;

  public UserDetailsDTO(String fullName, String email, Boolean isActive, Boolean isLocked) {
    this.fullName = fullName;
    this.email = email;
    this.isActive = isActive;
    this.isLocked = isLocked;
  }

  public UserDetailsDTO() {
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

  public Boolean getIsActive() {
    return isActive;
  }

  public void setIsActive(Boolean isActive) {
    this.isActive = isActive;
  }

  public Boolean getIsLocked() {
    return isLocked;
  }

  public void setIsLocked(Boolean isLocked) {
    this.isLocked = isLocked;
  }

}
