package com.flightcoordinator.dataservice.entity;

import java.util.List;

import com.flightcoordinator.dataservice.enums.CrewMemberRole;
import com.flightcoordinator.dataservice.enums.CrewMemberStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "crew_table")
public class CrewEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private String id;

  @NotEmpty(message = "Full name is required")
  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Email(message = "E-Mail is invalid")
  @NotEmpty(message = "E-mail is required")
  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @NotEmpty(message = "Phone number is required")
  @Column(name = "phone_number", nullable = false)
  private String phoneNumber;

  @Enumerated(EnumType.STRING)
  @NotEmpty(message = "Role is required")
  @Column(name = "role", nullable = false)
  private CrewMemberRole role;

  @OneToMany(mappedBy = "assignedCrewMember", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<CertificationEntity> certifications;

  @Min(value = 0, message = "Total flight hours should be >= 1")
  @NotEmpty(message = "Total flight hours is required")
  @Column(name = "total_flight_hours", nullable = false)
  private Integer totalFlightHours;

  @ManyToOne
  @JoinColumn(name = "base_airport", nullable = false)
  private AirportEntity baseAirport;

  @ManyToOne
  @JoinColumn(name = "airport_id", nullable = false)
  private AirportEntity currentAirport;

  @Enumerated(EnumType.STRING)
  @NotEmpty(message = "Status is required")
  @Column(name = "status", nullable = false)
  private CrewMemberStatus status;

  public CrewEntity(String id, @NotEmpty(message = "Full name is required") String fullName,
      @Email(message = "E-Mail is invalid") @NotEmpty(message = "E-mail is required") String email,
      @NotEmpty(message = "Phone number is required") String phoneNumber,
      @NotEmpty(message = "Role is required") CrewMemberRole role, List<CertificationEntity> certifications,
      @Min(value = 0, message = "Total flight hours should be >= 1") @NotEmpty(message = "Total flight hours is required") Integer totalFlightHours,
      AirportEntity baseAirport, AirportEntity currentAirport,
      @NotEmpty(message = "Status is required") CrewMemberStatus status) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.certifications = certifications;
    this.totalFlightHours = totalFlightHours;
    this.baseAirport = baseAirport;
    this.currentAirport = currentAirport;
    this.status = status;
  }

  public CrewEntity() {
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

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public CrewMemberRole getRole() {
    return role;
  }

  public void setRole(CrewMemberRole role) {
    this.role = role;
  }

  public List<CertificationEntity> getCertifications() {
    return certifications;
  }

  public void setCertifications(List<CertificationEntity> certifications) {
    this.certifications = certifications;
  }

  public Integer getTotalFlightHours() {
    return totalFlightHours;
  }

  public void setTotalFlightHours(Integer totalFlightHours) {
    this.totalFlightHours = totalFlightHours;
  }

  public AirportEntity getBaseAirport() {
    return baseAirport;
  }

  public void setBaseAirport(AirportEntity baseAirport) {
    this.baseAirport = baseAirport;
  }

  public AirportEntity getCurrentAirport() {
    return currentAirport;
  }

  public void setCurrentAirport(AirportEntity currentAirport) {
    this.currentAirport = currentAirport;
  }

  public CrewMemberStatus getStatus() {
    return status;
  }

  public void setStatus(CrewMemberStatus status) {
    this.status = status;
  }
}
