package com.flightcoordinator.server.enums;

// TODO turn into an endpoint

public enum CrewRoles {
  CAPTAIN("Captain"),
  FIRST_OFFICER("First Officer"),
  SECOND_OFFICER("Seconds Officer"),
  THIRD_OFFICER("Third Officer"),
  RELIEF_CREW_MEMBER("Relief Crew Member"),
  FLIGHT_ENGINEER("Flight Engineer"),
  AIRBORNE_SENSOR_OPR("Airborne Sensor Opr."),
  PURSER("Purser"),
  FLIGHT_ATTENDANT("Flight Attendant"),
  FLIGHT_MEDIC("Flight Medic"),
  LOADMASTER("Loadmaster");

  public final String role;

  private CrewRoles(String role) {
    this.role = role;
  }
}
