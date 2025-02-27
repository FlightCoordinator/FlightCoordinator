package com.flightcoordinator.dataservice.enums;

public enum CrewMemberRole {
  CAPTAIN("Captain"),
  FIRST_OFFICER("First Officer"),
  SECOND_OFFICER("Second Officer"),
  RELIEF_CREW_MEMBER("Relief Crew Member"),
  PURSER("Purser"),
  CABIN_SUPERVISOR("Cabin Supervisor"),
  FLIGHT_ATTENDANT("Flight Attendant"),
  FLIGHT_MEDIC("Flight Medic");

  public final String name;

  private CrewMemberRole(String name) {
    this.name = name;
  }
}
