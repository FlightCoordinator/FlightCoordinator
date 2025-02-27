package com.flightcoordinator.dataservice.dto;

public class FlightDTO {
  private String id;
  private Integer passengerCount;
  private Float cargoWeight;
  private String originAirportId;
  private String destinationAirportId;
  private Float distance;
  private String estimatedTakeoffTime;
  private String estimatedLandingTime;
  private Float estimatedFlightDuration;

  public FlightDTO(String id, Integer passengerCount, Float cargoWeight, String originAirportId,
      String destinationAirportId, Float distance, String estimatedTakeoffTime, String estimatedLandingTime,
      Float estimatedFlightDuration) {
    this.id = id;
    this.passengerCount = passengerCount;
    this.cargoWeight = cargoWeight;
    this.originAirportId = originAirportId;
    this.destinationAirportId = destinationAirportId;
    this.distance = distance;
    this.estimatedTakeoffTime = estimatedTakeoffTime;
    this.estimatedLandingTime = estimatedLandingTime;
    this.estimatedFlightDuration = estimatedFlightDuration;
  }

  public FlightDTO() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Integer getPassengerCount() {
    return passengerCount;
  }

  public void setPassengerCount(Integer passengerCount) {
    this.passengerCount = passengerCount;
  }

  public Float getCargoWeight() {
    return cargoWeight;
  }

  public void setCargoWeight(Float cargoWeight) {
    this.cargoWeight = cargoWeight;
  }

  public String getOriginAirportId() {
    return originAirportId;
  }

  public void setOriginAirportId(String originAirportId) {
    this.originAirportId = originAirportId;
  }

  public String getDestinationAirportId() {
    return destinationAirportId;
  }

  public void setDestinationAirportId(String destinationAirportId) {
    this.destinationAirportId = destinationAirportId;
  }

  public Float getDistance() {
    return distance;
  }

  public void setDistance(Float distance) {
    this.distance = distance;
  }

  public String getEstimatedTakeoffTime() {
    return estimatedTakeoffTime;
  }

  public void setEstimatedTakeoffTime(String estimatedTakeoffTime) {
    this.estimatedTakeoffTime = estimatedTakeoffTime;
  }

  public String getEstimatedLandingTime() {
    return estimatedLandingTime;
  }

  public void setEstimatedLandingTime(String estimatedLandingTime) {
    this.estimatedLandingTime = estimatedLandingTime;
  }

  public Float getEstimatedFlightDuration() {
    return estimatedFlightDuration;
  }

  public void setEstimatedFlightDuration(Float estimatedFlightDuration) {
    this.estimatedFlightDuration = estimatedFlightDuration;
  }
}
