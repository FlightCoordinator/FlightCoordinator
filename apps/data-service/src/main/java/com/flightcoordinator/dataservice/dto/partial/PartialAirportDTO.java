package com.flightcoordinator.dataservice.dto.partial;

import com.flightcoordinator.dataservice.enums.AirportType;
import com.flightcoordinator.dataservice.enums.CountryCode;
import com.flightcoordinator.dataservice.enums.NoiseCategory;

public class PartialAirportDTO {
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

  public PartialAirportDTO() {
  }

  public PartialAirportDTO(String id, String name, String iataCode, String icaoCode, CountryCode countryCode,
      AirportType type,
      String operationStartTime, String operationStopTime, Float elevation, Float slope,
      NoiseCategory possibleNoiseCategory) {
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
}
