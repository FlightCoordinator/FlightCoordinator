package com.flightcoordinator.server.dto.create_update;

import java.util.Date;

import com.flightcoordinator.server.enums.CertificationIssuer;
import com.flightcoordinator.server.enums.CertificationIssuingCountry;
import com.flightcoordinator.server.enums.CrewRole;

public class CertificationCreateUpdateDTO {
  private String id;
  private String name;
  private CertificationIssuer issuer;
  private CertificationIssuingCountry issuingCountry;
  private Date expirationDate;
  private Integer validityPeriod;
  private CrewRole assignableRole;
  private String description;

  public CertificationCreateUpdateDTO() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public CertificationIssuer getIssuer() {
    return issuer;
  }

  public void setIssuer(CertificationIssuer issuer) {
    this.issuer = issuer;
  }

  public CertificationIssuingCountry getIssuingCountry() {
    return issuingCountry;
  }

  public void setIssuingCountry(CertificationIssuingCountry issuingCountry) {
    this.issuingCountry = issuingCountry;
  }

  public Date getExpirationDate() {
    return expirationDate;
  }

  public void setExpirationDate(Date expirationDate) {
    this.expirationDate = expirationDate;
  }

  public Integer getValidityPeriod() {
    return validityPeriod;
  }

  public void setValidityPeriod(Integer validityPeriod) {
    this.validityPeriod = validityPeriod;
  }

  public CrewRole getAssignableRole() {
    return assignableRole;
  }

  public void setAssignableRoles(CrewRole assignableRole) {
    this.assignableRole = assignableRole;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
