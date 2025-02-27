package com.flightcoordinator.dataservice.dto;

import java.util.List;

import com.flightcoordinator.dataservice.enums.CrewMemberRole;
import com.flightcoordinator.dataservice.enums.CrewMemberStatus;

public class CrewDTO {
  private String id;
  private String fullName;
  private String email;
  private String phoneNumber;
  private CrewMemberRole role;
  private List<String> certificationIds;
  private Integer totalFlightHours;
  private String baseAirportId;
  private String currentAirportId;
  private CrewMemberStatus status;

  public CrewDTO(String id, String fullName, String email, String phoneNumber, CrewMemberRole role,
      List<String> certificationIds, Integer totalFlightHours, String baseAirportId, String currentAirportId,
      CrewMemberStatus status) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.certificationIds = certificationIds;
    this.totalFlightHours = totalFlightHours;
    this.baseAirportId = baseAirportId;
    this.currentAirportId = currentAirportId;
    this.status = status;
  }

  public CrewDTO() {
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

  public List<String> getCertificationIds() {
    return certificationIds;
  }

  public void setCertificationIds(List<String> certificationIds) {
    this.certificationIds = certificationIds;
  }

  public Integer getTotalFlightHours() {
    return totalFlightHours;
  }

  public void setTotalFlightHours(Integer totalFlightHours) {
    this.totalFlightHours = totalFlightHours;
  }

  public String getBaseAirportId() {
    return baseAirportId;
  }

  public void setBaseAirportId(String baseAirportId) {
    this.baseAirportId = baseAirportId;
  }

  public String getCurrentAirportId() {
    return currentAirportId;
  }

  public void setCurrentAirportId(String currentAirportId) {
    this.currentAirportId = currentAirportId;
  }

  public CrewMemberStatus getStatus() {
    return status;
  }

  public void setStatus(CrewMemberStatus status) {
    this.status = status;
  }
}
