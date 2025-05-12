package com.flightcoordinator.dataservice.automation;

import java.util.List;

import com.flightcoordinator.dataservice.entity.CrewEntity;
import com.flightcoordinator.dataservice.entity.FlightEntity;
import com.flightcoordinator.dataservice.entity.PlaneEntity;
import com.flightcoordinator.dataservice.entity.RunwayEntity;
import com.flightcoordinator.dataservice.entity.TaxiwayEntity;

public class GeneratedFlightPlan {
  private FlightEntity basedOnFlight;
  private PlaneEntity selectedPlane;
  private RunwayEntity selectedTakeoffRunway;
  private RunwayEntity selectedLandingRunway;
  private TaxiwayEntity selectedTakeoffTaxiway;
  private TaxiwayEntity selectedLandingTaxiway;
  private List<CrewEntity> selectedCrewMembers;

  public GeneratedFlightPlan() {
  }

  public GeneratedFlightPlan(FlightEntity basedOnFlight, PlaneEntity selectedPlane,
      RunwayEntity selectedTakeoffRunway,
      RunwayEntity selectedLandingRunway, TaxiwayEntity selectedTakeoffTaxiway, TaxiwayEntity selectedLandingTaxiway,
      List<CrewEntity> selectedCrewMembers) {
    this.basedOnFlight = basedOnFlight;
    this.selectedPlane = selectedPlane;
    this.selectedTakeoffRunway = selectedTakeoffRunway;
    this.selectedLandingRunway = selectedLandingRunway;
    this.selectedTakeoffTaxiway = selectedTakeoffTaxiway;
    this.selectedLandingTaxiway = selectedLandingTaxiway;
    this.selectedCrewMembers = selectedCrewMembers;
  }

  public FlightEntity getBasedOnFlight() {
    return basedOnFlight;
  }

  public void setBasedOnFlight(FlightEntity basedOnFlight) {
    this.basedOnFlight = basedOnFlight;
  }

  public PlaneEntity getSelectedPlane() {
    return selectedPlane;
  }

  public void setSelectedPlane(PlaneEntity selectedPlane) {
    this.selectedPlane = selectedPlane;
  }

  public RunwayEntity getSelectedTakeoffRunway() {
    return selectedTakeoffRunway;
  }

  public void setSelectedTakeoffRunway(RunwayEntity selectedTakeoffRunway) {
    this.selectedTakeoffRunway = selectedTakeoffRunway;
  }

  public RunwayEntity getSelectedLandingRunway() {
    return selectedLandingRunway;
  }

  public void setSelectedLandingRunway(RunwayEntity selectedLandingRunway) {
    this.selectedLandingRunway = selectedLandingRunway;
  }

  public TaxiwayEntity getSelectedTakeoffTaxiway() {
    return selectedTakeoffTaxiway;
  }

  public void setSelectedTakeoffTaxiway(TaxiwayEntity selectedTakeoffTaxiway) {
    this.selectedTakeoffTaxiway = selectedTakeoffTaxiway;
  }

  public TaxiwayEntity getSelectedLandingTaxiway() {
    return selectedLandingTaxiway;
  }

  public void setSelectedLandingTaxiway(TaxiwayEntity selectedLandingTaxiway) {
    this.selectedLandingTaxiway = selectedLandingTaxiway;
  }

  public List<CrewEntity> getSelectedCrewMembers() {
    return selectedCrewMembers;
  }

  public void setSelectedCrewMembers(List<CrewEntity> selectedCrewMembers) {
    this.selectedCrewMembers = selectedCrewMembers;
  }
}
