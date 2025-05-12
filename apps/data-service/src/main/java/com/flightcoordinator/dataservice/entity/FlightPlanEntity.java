package com.flightcoordinator.dataservice.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "flight_plan_table")
public class FlightPlanEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private String id;

  @OneToOne
  @JoinColumn(name = "result_flight", nullable = false)
  private FlightEntity basedOnFlight;

  @OneToOne
  @JoinColumn(name = "result_plane", nullable = false)
  private PlaneEntity selectedPlane;

  @ManyToMany
  @JoinTable(name = "result_crew_members", joinColumns = @JoinColumn(name = "result_id"), inverseJoinColumns = @JoinColumn(name = "crew_member_id"))
  private List<CrewEntity> selectedCrewMembers;

  @OneToOne
  @JoinColumn(name = "result_takeoff_taxiway", nullable = false)
  private TaxiwayEntity selectedTakeoffTaxiway;

  @OneToOne
  @JoinColumn(name = "result_landing_taxiway", nullable = false)
  private TaxiwayEntity selectedLandingTaxiway;

  @OneToOne
  @JoinColumn(name = "result_takeoff_runway", nullable = false)
  private RunwayEntity selectedTakeoffRunway;

  @OneToOne
  @JoinColumn(name = "result_landing_runway", nullable = false)
  private RunwayEntity selectedLandingRunway;

  public FlightPlanEntity(String id, FlightEntity flight, PlaneEntity plane, List<CrewEntity> crewMembers,
      TaxiwayEntity takeoffTaxiway, RunwayEntity takeoffRunway, RunwayEntity landingRunway,
      TaxiwayEntity landingTaxiway) {
    this.id = id;
    this.basedOnFlight = flight;
    this.selectedPlane = plane;
    this.selectedCrewMembers = crewMembers;
    this.selectedTakeoffTaxiway = takeoffTaxiway;
    this.selectedTakeoffRunway = takeoffRunway;
    this.selectedLandingRunway = landingRunway;
    this.selectedLandingTaxiway = landingTaxiway;
  }

  public FlightPlanEntity() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public FlightEntity getBasedOnFlight() {
    return basedOnFlight;
  }

  public void setBasedOnFlight(FlightEntity flight) {
    this.basedOnFlight = flight;
  }

  public PlaneEntity getSelectedPlane() {
    return selectedPlane;
  }

  public void setSelectedPlane(PlaneEntity plane) {
    this.selectedPlane = plane;
  }

  public List<CrewEntity> getSelectedCrewMembers() {
    return selectedCrewMembers;
  }

  public void setSelectedCrewMembers(List<CrewEntity> crewMembers) {
    this.selectedCrewMembers = crewMembers;
  }

  public TaxiwayEntity getSelectedTakeoffTaxiway() {
    return selectedTakeoffTaxiway;
  }

  public void setSelectedTakeoffTaxiway(TaxiwayEntity takeoffTaxiway) {
    this.selectedTakeoffTaxiway = takeoffTaxiway;
  }

  public RunwayEntity getSelectedTakeoffRunway() {
    return selectedTakeoffRunway;
  }

  public void setSelectedTakeoffRunway(RunwayEntity takeoffRunway) {
    this.selectedTakeoffRunway = takeoffRunway;
  }

  public RunwayEntity getSelectedLandingRunway() {
    return selectedLandingRunway;
  }

  public void setSelectedLandingRunway(RunwayEntity landingRunway) {
    this.selectedLandingRunway = landingRunway;
  }

  public TaxiwayEntity getSelectedLandingTaxiway() {
    return selectedLandingTaxiway;
  }

  public void setSelectedLandingTaxiway(TaxiwayEntity landingTaxiway) {
    this.selectedLandingTaxiway = landingTaxiway;
  }
}
