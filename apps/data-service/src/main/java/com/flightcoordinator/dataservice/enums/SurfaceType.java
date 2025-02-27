package com.flightcoordinator.dataservice.enums;

public enum SurfaceType {
  ASPHALT("Asphalt"),
  CONCRETE("Concrete"),
  GRASS("Grass"),
  GRAVEL("Gravel"),
  DIRT("Dirt"),
  COMP_MATERIAL("Composite Materials");

  public final String name;

  private SurfaceType(String name) {
    this.name = name;
  }
}
