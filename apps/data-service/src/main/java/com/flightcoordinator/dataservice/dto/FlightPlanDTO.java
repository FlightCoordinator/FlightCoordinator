package com.flightcoordinator.dataservice.dto;

import java.util.List;

public class FlightPlanDTO {
  private String id;
  private String basedOnFlightId;
  private String selectedPlaneId;
  private String selectedTakeoffRunwayId;
  private String selectedLandingRunwayId;
  private String selectedTakeoffTaxiwayId;
  private String selectedLandingTaxiwayId;
  private List<String> selectedCrewMemberIds;

  public FlightPlanDTO() {
  }

  public FlightPlanDTO(String id, String basedOnFlightId, String selectedPlaneId, String selectedTakeoffRunwayId,
      String selectedLandingRunwayId, String selectedTakeoffTaxiwayId, String selectedLandingTaxiwayId,
      List<String> selectedCrewMemberIds) {
    this.id = id;
    this.basedOnFlightId = basedOnFlightId;
    this.selectedPlaneId = selectedPlaneId;
    this.selectedTakeoffRunwayId = selectedTakeoffRunwayId;
    this.selectedLandingRunwayId = selectedLandingRunwayId;
    this.selectedTakeoffTaxiwayId = selectedTakeoffTaxiwayId;
    this.selectedLandingTaxiwayId = selectedLandingTaxiwayId;
    this.selectedCrewMemberIds = selectedCrewMemberIds;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getBasedOnFlightId() {
    return basedOnFlightId;
  }

  public void setBasedOnFlightId(String basedOnFlightId) {
    this.basedOnFlightId = basedOnFlightId;
  }

  public String getSelectedPlaneId() {
    return selectedPlaneId;
  }

  public void setSelectedPlaneId(String selectedPlaneId) {
    this.selectedPlaneId = selectedPlaneId;
  }

  public String getSelectedTakeoffRunwayId() {
    return selectedTakeoffRunwayId;
  }

  public void setSelectedTakeoffRunwayId(String selectedTakeoffRunwayId) {
    this.selectedTakeoffRunwayId = selectedTakeoffRunwayId;
  }

  public String getSelectedLandingRunwayId() {
    return selectedLandingRunwayId;
  }

  public void setSelectedLandingRunwayId(String selectedLandingRunwayId) {
    this.selectedLandingRunwayId = selectedLandingRunwayId;
  }

  public String getSelectedTakeoffTaxiwayId() {
    return selectedTakeoffTaxiwayId;
  }

  public void setSelectedTakeoffTaxiwayId(String selectedTakeoffTaxiwayId) {
    this.selectedTakeoffTaxiwayId = selectedTakeoffTaxiwayId;
  }

  public String getSelectedLandingTaxiwayId() {
    return selectedLandingTaxiwayId;
  }

  public void setSelectedLandingTaxiwayId(String selectedLandingTaxiwayId) {
    this.selectedLandingTaxiwayId = selectedLandingTaxiwayId;
  }

  public List<String> getSelectedCrewMemberIds() {
    return selectedCrewMemberIds;
  }

  public void setSelectedCrewMemberIds(List<String> selectedCrewMemberIds) {
    this.selectedCrewMemberIds = selectedCrewMemberIds;
  }
}
