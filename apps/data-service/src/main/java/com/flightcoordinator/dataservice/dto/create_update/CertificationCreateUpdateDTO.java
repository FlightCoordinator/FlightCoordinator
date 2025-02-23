package com.flightcoordinator.dataservice.dto.create_update;

import java.util.Date;

import com.flightcoordinator.dataservice.enums.CertificationIssuer;
import com.flightcoordinator.dataservice.enums.CrewRole;

public class CertificationCreateUpdateDTO {
  private String id;
  private String name;
  private Integer certificationNumber;
  private CertificationIssuer issuer;
  private Date expirationDate;
  private Integer validityPeriod;
  private CrewRole assignableRole;
  private String assignedCrewMemberId;

  public String getAssignedCrewMemberId() {
    return assignedCrewMemberId;
  }

  public void setAssignedCrewMemberId(String assignedCrewMemberId) {
    this.assignedCrewMemberId = assignedCrewMemberId;
  }

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

  public Integer getCertificationNumber() {
    return certificationNumber;
  }

  public void setCertificationNumber(Integer certificationNumber) {
    this.certificationNumber = certificationNumber;
  }

  public CertificationIssuer getIssuer() {
    return issuer;
  }

  public void setIssuer(CertificationIssuer issuer) {
    this.issuer = issuer;
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
