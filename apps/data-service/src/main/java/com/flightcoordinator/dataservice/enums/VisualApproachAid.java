package com.flightcoordinator.dataservice.enums;

public enum VisualApproachAid {
  PAPI("Precision Approach Path Indicator"),
  VASI("Visual Approach Slope Indicator"),
  ALSF1("Approach Lighting System with Sequenced Flashers I"),
  ALSF2("Approach Lighting System with Sequenced Flashers II"),
  ODALS("Omni-Directional Approach Lighting System"),
  MALSR("Medium Intensity Approach Lighting System with Runway Alignment Indicator Lights"),
  SSALR("Simplified Short Approach Lighting System with Runway Alignment Indicator Lights"),
  MALS("Medium Intensity Approach Lighting System"),
  REIL("Runway End Identifier Lights"),
  HIRL("High Intensity Runway Lights"),
  MIRL("Medium Intensity Runway Lights"),
  LIR("Low Intensity Runway Lights"),
  NONE("None");

  public final String name;

  private VisualApproachAid(String name) {
    this.name = name;
  }
}
