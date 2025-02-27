package com.flightcoordinator.dataservice.enums;

public enum AirportType {
  INTERNATIONAL("International"),
  REGIONAL("Regional"),
  DOMESTIC("Domestic");

  public final String name;

  private AirportType(String name) {
    this.name = name;
  }
}
