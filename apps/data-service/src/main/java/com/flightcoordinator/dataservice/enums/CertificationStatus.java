package com.flightcoordinator.dataservice.enums;

public enum CertificationStatus {
  CERTIFIED("Certified"),
  PENDING_APPROVAL("Pending Approval"),
  REVOKED("Revoked"),
  UNDER_REVIEW("Under Review"),
  EXPIRED("Expired");

  public final String name;

  private CertificationStatus(String name) {
    this.name = name;
  }
}
