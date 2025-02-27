package com.flightcoordinator.dataservice.dto;

import java.util.List;

public class AlgorithmResultDTO {
  private String id;
  private String flightId;
  private String planeId;
  private List<String> crewMemberIds;
  private String takeoffTaxiwayId;
  private String takeoffRunwayId;
  private String landingRunwayId;
  private String landingTaxiwayId;

  public AlgorithmResultDTO(String id, String flightId, String planeId, List<String> crewMembersIds,
      String takeoffTaxiwayId, String takeoffRunwayId, String landingRunwayId, String landingTaxiwayId) {
    this.id = id;
    this.flightId = flightId;
    this.planeId = planeId;
    this.crewMemberIds = crewMembersIds;
    this.takeoffTaxiwayId = takeoffTaxiwayId;
    this.takeoffRunwayId = takeoffRunwayId;
    this.landingRunwayId = landingRunwayId;
    this.landingTaxiwayId = landingTaxiwayId;
  }

  public AlgorithmResultDTO() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getFlightId() {
    return flightId;
  }

  public void setFlightId(String flightId) {
    this.flightId = flightId;
  }

  public String getPlaneId() {
    return planeId;
  }

  public void setPlaneId(String planeId) {
    this.planeId = planeId;
  }

  public List<String> getCrewMemberIds() {
    return crewMemberIds;
  }

  public void setCrewMemberIds(List<String> crewMembersIds) {
    this.crewMemberIds = crewMembersIds;
  }

  public String getTakeoffTaxiwayId() {
    return takeoffTaxiwayId;
  }

  public void setTakeoffTaxiwayId(String takeoffTaxiwayId) {
    this.takeoffTaxiwayId = takeoffTaxiwayId;
  }

  public String getTakeoffRunwayId() {
    return takeoffRunwayId;
  }

  public void setTakeoffRunwayId(String takeoffRunwayId) {
    this.takeoffRunwayId = takeoffRunwayId;
  }

  public String getLandingRunwayId() {
    return landingRunwayId;
  }

  public void setLandingRunwayId(String landingRunwayId) {
    this.landingRunwayId = landingRunwayId;
  }

  public String getLandingTaxiwayId() {
    return landingTaxiwayId;
  }

  public void setLandingTaxiwayId(String landingTaxiwayId) {
    this.landingTaxiwayId = landingTaxiwayId;
  }
}
