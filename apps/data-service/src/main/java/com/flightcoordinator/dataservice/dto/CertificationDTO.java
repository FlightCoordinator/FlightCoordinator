package com.flightcoordinator.dataservice.dto;

import java.util.Date;

import com.flightcoordinator.dataservice.enums.Certifier;

public class CertificationDTO {
  private String id;
  private String name;
  private String certificationNumber;
  private Certifier issuer;
  private Date expirationDate;
  private Integer validityPeriod;
  private String description;
  private String assignedCrewMemberId;

  public CertificationDTO(String id, String name, String certificationNumber, Certifier issuer, Date expirationDate,
      Integer validityPeriod, String description, String assignedCrewMemberId) {
    this.id = id;
    this.name = name;
    this.certificationNumber = certificationNumber;
    this.issuer = issuer;
    this.expirationDate = expirationDate;
    this.validityPeriod = validityPeriod;
    this.description = description;
    this.assignedCrewMemberId = assignedCrewMemberId;
  }

  public CertificationDTO() {
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

  public String getCertificationNumber() {
    return certificationNumber;
  }

  public void setCertificationNumber(String certificationNumber) {
    this.certificationNumber = certificationNumber;
  }

  public Certifier getIssuer() {
    return issuer;
  }

  public void setIssuer(Certifier issuer) {
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

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getAssignedCrewMemberId() {
    return assignedCrewMemberId;
  }

  public void setAssignedCrewMemberId(String assignedCrewMemberId) {
    this.assignedCrewMemberId = assignedCrewMemberId;
  }
}
