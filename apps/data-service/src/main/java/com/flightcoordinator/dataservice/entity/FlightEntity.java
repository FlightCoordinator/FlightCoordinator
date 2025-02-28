package com.flightcoordinator.dataservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "flight_table")
public class FlightEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private String id;

  @Min(value = 1, message = "Passenger count should be >= 1")
  @Column(name = "passenger_count", nullable = false)
  private Integer passengerCount;

  @Min(value = 0, message = "Passenger count should be >= 1")
  @Column(name = "cargo_weight", nullable = false)
  private Float cargoWeight;

  @ManyToOne
  @JoinColumn(name = "flight_origin_airport_id", nullable = false)
  private AirportEntity originAirport;

  @ManyToOne
  @JoinColumn(name = "flight_destination_airport_id", nullable = false)
  private AirportEntity destinationAirport;

  @Min(value = 1, message = "Distance should be >=1")
  @Column(name = "distance", nullable = false)
  private Float distance;

  @NotBlank(message = "Estimated takeoff time is required")
  @Column(name = "estimated_takeoff_time", nullable = false)
  private String estimatedTakeoffTime;

  @NotBlank(message = "Estimated landing Time is required")
  @Column(name = "estimated_landing_time", nullable = false)
  private String estimatedLandingTime;

  @Min(value = 1, message = "Estimated flight duration should be >= 1")
  @Column(name = "estimated_flight_duration", nullable = false)
  private Float estimatedFlightDuration;

  public FlightEntity() {
  }

  public FlightEntity(String id, @Min(value = 1, message = "Passenger count should be >= 1") Integer passengerCount,
      @Min(value = 0, message = "Passenger count should be >= 1") Float cargoWeight, AirportEntity originAirport,
      AirportEntity destinationAirport, @Min(value = 1, message = "Distance should be >=1") Float distance,
      @NotBlank(message = "Estimated takeoff time is required") String estimatedTakeoffTime,
      @NotBlank(message = "Estimated landing Time is required") String estimatedLandingTime,
      @Min(value = 1, message = "Estimated flight duration should be >= 1") Float estimatedFlightDuration) {
    this.id = id;
    this.passengerCount = passengerCount;
    this.cargoWeight = cargoWeight;
    this.originAirport = originAirport;
    this.destinationAirport = destinationAirport;
    this.distance = distance;
    this.estimatedTakeoffTime = estimatedTakeoffTime;
    this.estimatedLandingTime = estimatedLandingTime;
    this.estimatedFlightDuration = estimatedFlightDuration;
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

  public AirportEntity getOriginAirport() {
    return originAirport;
  }

  public void setOriginAirport(AirportEntity originAirport) {
    this.originAirport = originAirport;
  }

  public AirportEntity getDestinationAirport() {
    return destinationAirport;
  }

  public void setDestinationAirport(AirportEntity destinationAirport) {
    this.destinationAirport = destinationAirport;
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
