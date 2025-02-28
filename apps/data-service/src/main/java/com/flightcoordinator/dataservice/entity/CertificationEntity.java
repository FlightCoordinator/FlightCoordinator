package com.flightcoordinator.dataservice.entity;

import java.util.Date;

import com.flightcoordinator.dataservice.enums.Certifier;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "certification_table")
public class CertificationEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private String id;

  @NotBlank(message = "Name is required")
  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "certification_number", nullable = false)
  @NotBlank(message = "Certification number is required")
  private String certificationNumber;

  @Enumerated(EnumType.STRING)
  @Column(name = "issuer", nullable = false)
  private Certifier issuer;

  @Column(name = "expiration_date", nullable = false)
  private Date expirationDate;

  @Min(value = 1, message = "Validity period should be >= 1")
  @Column(name = "validity_period", nullable = false)
  private Integer validityPeriod;

  @NotBlank(message = "Description is required")
  @Column(name = "description", nullable = false)
  private String description;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "assigned_crew_member", nullable = false)
  private CrewEntity assignedCrewMember;

  public CertificationEntity() {
  }

  public CertificationEntity(String id, @NotBlank(message = "Name is required") String name,
      @NotBlank(message = "Certification number is required") String certificationNumber, Certifier issuer,
      Date expirationDate, @Min(value = 1, message = "Validity period should be >= 1") Integer validityPeriod,
      @NotBlank(message = "Description is required") String description, CrewEntity assignedCrewMember) {
    this.id = id;
    this.name = name;
    this.certificationNumber = certificationNumber;
    this.issuer = issuer;
    this.expirationDate = expirationDate;
    this.validityPeriod = validityPeriod;
    this.description = description;
    this.assignedCrewMember = assignedCrewMember;
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

  public CrewEntity getAssignedCrewMember() {
    return assignedCrewMember;
  }

  public void setAssignedCrewMember(CrewEntity assignedCrewMember) {
    this.assignedCrewMember = assignedCrewMember;
  }
}
