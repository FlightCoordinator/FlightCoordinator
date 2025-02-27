package com.flightcoordinator.dataservice.enums;

public enum RunwayStatus {
  OPEN("Open"),
  CLOSED("Closed"),
  MAINTENANCE("Under Maintenance"),
  UNDER_CONSTRUCTION("Under Construction"),
  EMERGENCY_USE_ONLY("Emergency Use Only");

  public final String name;

  private RunwayStatus(String name) {
    this.name = name;
  }
}
