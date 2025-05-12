package com.flightcoordinator.dataservice.automation;

import java.util.List;

import com.flightcoordinator.dataservice.automation.selectors.CrewSelector;
import com.flightcoordinator.dataservice.automation.selectors.PlaneSelector;
import com.flightcoordinator.dataservice.automation.selectors.RunwaySelector;
import com.flightcoordinator.dataservice.automation.selectors.TaxiwaySelector;
import com.flightcoordinator.dataservice.entity.CertificationEntity;
import com.flightcoordinator.dataservice.entity.CrewEntity;
import com.flightcoordinator.dataservice.entity.FlightEntity;
import com.flightcoordinator.dataservice.entity.ModelEntity;
import com.flightcoordinator.dataservice.entity.PlaneEntity;
import com.flightcoordinator.dataservice.entity.RunwayEntity;
import com.flightcoordinator.dataservice.entity.TaxiwayEntity;

public class AutomationEngine {
  private final FlightEntity flight;
  private final List<PlaneEntity> planes;
  private final List<ModelEntity> planeModels;
  private final List<RunwayEntity> runways;
  private final List<TaxiwayEntity> taxiways;
  private final List<CrewEntity> crewMembers;
  private final List<CertificationEntity> certifications;

  public AutomationEngine(
      FlightEntity flight,
      List<PlaneEntity> planes,
      List<ModelEntity> planeModels,
      List<RunwayEntity> runways,
      List<TaxiwayEntity> taxiways,
      List<CrewEntity> crewMembers,
      List<CertificationEntity> certifications) {
    this.flight = flight;
    this.planes = planes;
    this.planeModels = planeModels;
    this.runways = runways;
    this.taxiways = taxiways;
    this.crewMembers = crewMembers;
    this.certifications = certifications;
  }

  public GeneratedFlightPlan generateFlightPlan() {
    PlaneSelector planeSelector = new PlaneSelector(flight, planeModels, planes);
    PlaneEntity selectedPlane = planeSelector.select();

    RunwaySelector takeoffRunwaySelector = new RunwaySelector(
        flight.getOriginAirport().getId(),
        selectedPlane,
        selectedPlane.getModel(),
        runways);
    RunwayEntity takeoffRunway = takeoffRunwaySelector.select();

    RunwaySelector landingRunwaySelector = new RunwaySelector(
        flight.getDestinationAirport().getId(),
        selectedPlane,
        selectedPlane.getModel(),
        runways);
    RunwayEntity landingRunway = landingRunwaySelector.select();

    TaxiwaySelector takeoffTaxiwaySelector = new TaxiwaySelector(
        flight.getOriginAirport().getId(),
        selectedPlane.getModel(),
        landingRunway,
        taxiways);
    TaxiwayEntity takeoffTaxiway = takeoffTaxiwaySelector.select();

    TaxiwaySelector landingTaxiwaySelector = new TaxiwaySelector(
        flight.getDestinationAirport().getId(),
        selectedPlane.getModel(),
        landingRunway,
        taxiways);
    TaxiwayEntity landingTaxiway = landingTaxiwaySelector.select();

    CrewSelector crewSelector = new CrewSelector(
        crewMembers,
        certifications,
        flight.getOriginAirport(),
        flight.getDestinationAirport(),
        selectedPlane.getModel());
    List<CrewEntity> selectedCrewMembers = crewSelector.select();

    return new GeneratedFlightPlan(
        flight,
        selectedPlane,
        takeoffRunway,
        landingRunway,
        takeoffTaxiway,
        landingTaxiway,
        selectedCrewMembers);
  }
}
