package com.flightcoordinator.authservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "token_table")
public class TokenEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id")
  private String id;

  @Column(name = "token_value", nullable = false)
  private String tokenValue;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity associatedUser;

  public TokenEntity(String id, String tokenValue, UserEntity associatedUser) {
    this.id = id;
    this.tokenValue = tokenValue;
    this.associatedUser = associatedUser;
  }

  public TokenEntity() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTokenValue() {
    return tokenValue;
  }

  public void setTokenValue(String tokenValue) {
    this.tokenValue = tokenValue;
  }

  public UserEntity getAssociatedUser() {
    return associatedUser;
  }

  public void setAssociatedUser(UserEntity associatedUser) {
    this.associatedUser = associatedUser;
  }
}
