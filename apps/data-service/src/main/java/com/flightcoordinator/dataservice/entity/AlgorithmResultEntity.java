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
@Table(name = "algorithm_result_table")
public class AlgorithmResultEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private String id;

  @OneToOne
  @JoinColumn(name = "result_flight", nullable = false)
  private FlightEntity flight;

  @OneToOne
  @JoinColumn(name = "result_plane", nullable = false)
  private PlaneEntity plane;

  @ManyToMany
  @JoinTable(name = "result_crew_members", joinColumns = @JoinColumn(name = "result_id"), inverseJoinColumns = @JoinColumn(name = "crew_member_id"))
  private List<CrewEntity> crewMembers;

  @OneToOne
  @JoinColumn(name = "result_takeoff_taxiway", nullable = false)
  private TaxiwayEntity takeoffTaxiway;

  @OneToOne
  @JoinColumn(name = "result_takeoff_runway", nullable = false)
  private RunwayEntity takeoffRunway;

  @OneToOne
  @JoinColumn(name = "result_landing_runway", nullable = false)
  private RunwayEntity landingRunway;

  @OneToOne
  @JoinColumn(name = "result_landing_taxiway", nullable = false)
  private TaxiwayEntity landingTaxiway;

  public AlgorithmResultEntity(String id, FlightEntity flight, PlaneEntity plane, List<CrewEntity> crewMembers,
      TaxiwayEntity takeoffTaxiway, RunwayEntity takeoffRunway, RunwayEntity landingRunway,
      TaxiwayEntity landingTaxiway) {
    this.id = id;
    this.flight = flight;
    this.plane = plane;
    this.crewMembers = crewMembers;
    this.takeoffTaxiway = takeoffTaxiway;
    this.takeoffRunway = takeoffRunway;
    this.landingRunway = landingRunway;
    this.landingTaxiway = landingTaxiway;
  }

  public AlgorithmResultEntity() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public FlightEntity getFlight() {
    return flight;
  }

  public void setFlight(FlightEntity flight) {
    this.flight = flight;
  }

  public PlaneEntity getPlane() {
    return plane;
  }

  public void setPlane(PlaneEntity plane) {
    this.plane = plane;
  }

  public List<CrewEntity> getCrewMembers() {
    return crewMembers;
  }

  public void setCrewMembers(List<CrewEntity> crewMembers) {
    this.crewMembers = crewMembers;
  }

  public TaxiwayEntity getTakeoffTaxiway() {
    return takeoffTaxiway;
  }

  public void setTakeoffTaxiway(TaxiwayEntity takeoffTaxiway) {
    this.takeoffTaxiway = takeoffTaxiway;
  }

  public RunwayEntity getTakeoffRunway() {
    return takeoffRunway;
  }

  public void setTakeoffRunway(RunwayEntity takeoffRunway) {
    this.takeoffRunway = takeoffRunway;
  }

  public RunwayEntity getLandingRunway() {
    return landingRunway;
  }

  public void setLandingRunway(RunwayEntity landingRunway) {
    this.landingRunway = landingRunway;
  }

  public TaxiwayEntity getLandingTaxiway() {
    return landingTaxiway;
  }

  public void setLandingTaxiway(TaxiwayEntity landingTaxiway) {
    this.landingTaxiway = landingTaxiway;
  }
}
