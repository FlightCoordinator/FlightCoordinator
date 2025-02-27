package com.flightcoordinator.dataservice.dto;

import java.util.List;

import com.flightcoordinator.dataservice.enums.AirportType;
import com.flightcoordinator.dataservice.enums.CountryCode;
import com.flightcoordinator.dataservice.enums.NoiseCategory;

public class AirportDTO {
  private String id;
  private String name;
  private String iataCode;
  private String icaoCode;
  private CountryCode countryCode;
  private AirportType type;
  private String operationStartTime;
  private String operationStopTime;
  private Float elevation;
  private Float slope;
  private NoiseCategory possibleNoiseCategory;
  private List<String> runwayIds;
  private List<String> taxiwayIds;
  private List<String> planesPresentIds;
  private List<String> flightFromAirportIds;
  private List<String> flightToAirportIds;
  private List<String> crewMembersPresentIds;

  public AirportDTO(String id, String name, String iataCode, String icaoCode, CountryCode countryCode, AirportType type,
      String operationStartTime, String operationStopTime, Float elevation, Float slope,
      NoiseCategory possibleNoiseCategory, List<String> runwayIds, List<String> taxiwayIds,
      List<String> planesPresentId, List<String> flightFromAirportIds, List<String> flightToAirportIds,
      List<String> crewMembersPresentIds) {
    this.id = id;
    this.name = name;
    this.iataCode = iataCode;
    this.icaoCode = icaoCode;
    this.countryCode = countryCode;
    this.type = type;
    this.operationStartTime = operationStartTime;
    this.operationStopTime = operationStopTime;
    this.elevation = elevation;
    this.slope = slope;
    this.possibleNoiseCategory = possibleNoiseCategory;
    this.runwayIds = runwayIds;
    this.taxiwayIds = taxiwayIds;
    this.planesPresentIds = planesPresentId;
    this.flightFromAirportIds = flightFromAirportIds;
    this.flightToAirportIds = flightToAirportIds;
    this.crewMembersPresentIds = crewMembersPresentIds;
  }

  public AirportDTO() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getIataCode() {
    return iataCode;
  }

  public void setIataCode(String iataCode) {
    this.iataCode = iataCode;
  }

  public String getIcaoCode() {
    return icaoCode;
  }

  public void setIcaoCode(String icaoCode) {
    this.icaoCode = icaoCode;
  }

  public CountryCode getCountryCode() {
    return countryCode;
  }

  public void setCountryCode(CountryCode countryCode) {
    this.countryCode = countryCode;
  }

  public AirportType getType() {
    return type;
  }

  public void setType(AirportType type) {
    this.type = type;
  }

  public String getOperationStartTime() {
    return operationStartTime;
  }

  public void setOperationStartTime(String operationStartTime) {
    this.operationStartTime = operationStartTime;
  }

  public String getOperationStopTime() {
    return operationStopTime;
  }

  public void setOperationStopTime(String operationStopTime) {
    this.operationStopTime = operationStopTime;
  }

  public Float getElevation() {
    return elevation;
  }

  public void setElevation(Float elevation) {
    this.elevation = elevation;
  }

  public Float getSlope() {
    return slope;
  }

  public void setSlope(Float slope) {
    this.slope = slope;
  }

  public NoiseCategory getPossibleNoiseCategory() {
    return possibleNoiseCategory;
  }

  public void setPossibleNoiseCategory(NoiseCategory possibleNoiseCategory) {
    this.possibleNoiseCategory = possibleNoiseCategory;
  }

  public List<String> getRunwayIds() {
    return runwayIds;
  }

  public void setRunwayIds(List<String> runwayIds) {
    this.runwayIds = runwayIds;
  }

  public List<String> getTaxiwayIds() {
    return taxiwayIds;
  }

  public void setTaxiwayIds(List<String> taxiwayIds) {
    this.taxiwayIds = taxiwayIds;
  }

  public List<String> getPlanesPresentIds() {
    return planesPresentIds;
  }

  public void setPlanesPresentIds(List<String> planesPresentId) {
    this.planesPresentIds = planesPresentId;
  }

  public List<String> getFlightFromAirportIds() {
    return flightFromAirportIds;
  }

  public void setFlightFromAirportIds(List<String> flightFromAirportIds) {
    this.flightFromAirportIds = flightFromAirportIds;
  }

  public List<String> getFlightToAirportIds() {
    return flightToAirportIds;
  }

  public void setFlightToAirportIds(List<String> flightToAirportIds) {
    this.flightToAirportIds = flightToAirportIds;
  }

  public List<String> getCrewMembersPresentIds() {
    return crewMembersPresentIds;
  }

  public void setCrewMembersPresentIds(List<String> crewMembersPresentIds) {
    this.crewMembersPresentIds = crewMembersPresentIds;
  }
}
