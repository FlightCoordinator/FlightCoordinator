package com.flightcoordinator.dataservice.enums;

public enum PlaneStatus {
  ACTIVE("Active"),
  UNDER_MAINTENANCE("Under-Maintenance"),
  INACTIVE("Inactive"),
  RETIRED("Retired");

  public final String name;

  private PlaneStatus(String name) {
    this.name = name;
  }
}
