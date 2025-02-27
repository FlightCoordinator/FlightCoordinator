package com.flightcoordinator.dataservice.enums;

public enum EngineType {
  TURBOJET("Turbo Jet"),
  TURBOPROP("Turbo Propeller"),
  TURBOFAN("Turbo Fan"),
  RAMJET("Ram Jet"),
  SCRAMJET("Scram Jet"),
  PISTON("Piston"),
  ELECTRIC("Electric"),
  HYBRID_ELECTRIC("Hybric Electric"),
  HYDROGEN_FUEL_CELL("Hydrogen Fuel Cell");

  public final String name;

  private EngineType(String name) {
    this.name = name;
  }
}
