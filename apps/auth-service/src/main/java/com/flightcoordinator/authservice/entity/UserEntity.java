package com.flightcoordinator.authservice.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_table")
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "password", nullable = false)
  private String password;

  @OneToMany(mappedBy = "associatedUser", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<TokenEntity> tokens;

  @Column(name = "is_active", nullable = false)
  private Boolean isActive;

  @Column(name = "is_locked", nullable = false)
  private Boolean isLocked;

  public UserEntity() {
  }

  public UserEntity(String id, String fullName, String email, String password, List<TokenEntity> tokens,
      Boolean isActive, Boolean isLocked) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.tokens = tokens;
    this.isActive = isActive;
    this.isLocked = isLocked;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
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

  public List<TokenEntity> getTokens() {
    return tokens;
  }

  public void setTokens(List<TokenEntity> tokens) {
    this.tokens = tokens;
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
