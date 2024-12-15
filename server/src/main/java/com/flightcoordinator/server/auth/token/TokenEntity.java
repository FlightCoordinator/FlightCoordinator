package com.flightcoordinator.server.auth.token;

import com.flightcoordinator.server.entity.UserEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "token_table")
public class TokenEntity {
  private String id;
  private String token;
  private UserEntity associatedUser;
  private boolean isExpired;
  private boolean isRevoked;

  public TokenEntity() {
  }

  public TokenEntity(String id, String token, UserEntity associatedUser, boolean isExpired, boolean isRevoked) {
    this.id = id;
    this.token = token;
    this.associatedUser = associatedUser;
    this.isExpired = isExpired;
    this.isRevoked = isRevoked;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public UserEntity getAssociatedUser() {
    return associatedUser;
  }

  public void setAssociatedUser(UserEntity associatedUser) {
    this.associatedUser = associatedUser;
  }

  public boolean isExpired() {
    return isExpired;
  }

  public void setExpired(boolean isExpired) {
    this.isExpired = isExpired;
  }

  public boolean isRevoked() {
    return isRevoked;
  }

  public void setRevoked(boolean isRevoked) {
    this.isRevoked = isRevoked;
  }
}