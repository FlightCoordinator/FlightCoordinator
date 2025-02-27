package com.flightcoordinator.dataservice.enums;

public enum CrewMemberStatus {
  ACTIVE("Active"),
  INACTIVE("Inactive"),
  ON_LEAVE("On-Leave"),
  RETIRED("Retired");

  public final String name;

  private CrewMemberStatus(String name) {
    this.name = name;
  }
}
