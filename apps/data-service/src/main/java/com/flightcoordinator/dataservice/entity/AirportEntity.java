package com.flightcoordinator.dataservice.entity;

import java.util.List;

import com.flightcoordinator.dataservice.enums.AirportType;
import com.flightcoordinator.dataservice.enums.CountryCode;
import com.flightcoordinator.dataservice.enums.NoiseCategory;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "airport_table")
public class AirportEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private String id;

  @NotEmpty(message = "Name is required")
  @Column(name = "name", nullable = false)
  private String name;

  @NotEmpty(message = "IATA code is required")
  @Column(name = "iata_code", nullable = false)
  private String iataCode;

  @NotEmpty(message = "ICAO code is required")
  @Column(name = "icao_code", nullable = false)
  private String icaoCode;

  @Enumerated(EnumType.STRING)
  @NotEmpty(message = "Country is required")
  @Column(name = "country_code", nullable = false)
  private CountryCode countryCode;

  @Enumerated(EnumType.STRING)
  @NotEmpty(message = "Type is required")
  @Column(name = "type", nullable = false)
  private AirportType type;

  @NotEmpty(message = "Operation start time is required")
  @Column(name = "operation_start_time", nullable = false)
  private String operationStartTime;

  @NotEmpty(message = "Operation stop time is required")
  @Column(name = "operation_end_time", nullable = false)
  private String operationStopTime;

  @NotEmpty(message = "Elevation is required")
  @Min(value = 1, message = "Elevation should be >= 1")
  @Column(name = "elevation", nullable = false)
  private Float elevation;

  @NotEmpty(message = "Slope is required")
  @Min(value = 1, message = "Slope should be >= 1")
  @Column(name = "slope", nullable = false)
  private Float slope;

  @Enumerated(EnumType.STRING)
  @NotEmpty(message = "Possible noise category is required")
  @Column(name = "possible_noise_category", nullable = false)
  private NoiseCategory possibleNoiseCategory;

  @OneToMany(mappedBy = "airport", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<RunwayEntity> runways;

  @OneToMany(mappedBy = "airport", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<TaxiwayEntity> taxiways;

  @OneToMany(mappedBy = "currentLocation", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<PlaneEntity> planesPresent;

  @OneToMany(mappedBy = "originAirport", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<FlightEntity> flightFromAirport;

  @OneToMany(mappedBy = "destinationAirport", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<FlightEntity> flightToAirport;

  @OneToMany(mappedBy = "currentAirport", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<CrewEntity> crewMembersPresent;

  public AirportEntity() {
  }

  public AirportEntity(String id, @NotEmpty(message = "Name is required") String name,
      @NotEmpty(message = "IATA code is required") String iataCode,
      @NotEmpty(message = "ICAO code is required") String icaoCode,
      @NotEmpty(message = "Country is required") CountryCode countryCode,
      @NotEmpty(message = "Type is required") AirportType type,
      @NotEmpty(message = "Operation start time is required") String operationStartTime,
      @NotEmpty(message = "Operation stop time is required") String operationStopTime,
      @NotEmpty(message = "Elevation is required") @Min(value = 1, message = "Elevation should be >= 1") Float elevation,
      @NotEmpty(message = "Slope is required") @Min(value = 1, message = "Slope should be >= 1") Float slope,
      @NotEmpty(message = "Possible noise category is required") NoiseCategory possibleNoiseCategory,
      List<RunwayEntity> runways, List<TaxiwayEntity> taxiways, List<PlaneEntity> planesPresent,
      List<FlightEntity> flightFromAirport, List<FlightEntity> flightToAirport, List<CrewEntity> crewMembersPresent) {
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
    this.runways = runways;
    this.taxiways = taxiways;
    this.planesPresent = planesPresent;
    this.flightFromAirport = flightFromAirport;
    this.flightToAirport = flightToAirport;
    this.crewMembersPresent = crewMembersPresent;
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

  public List<RunwayEntity> getRunways() {
    return runways;
  }

  public void setRunways(List<RunwayEntity> runways) {
    this.runways = runways;
  }

  public List<TaxiwayEntity> getTaxiways() {
    return taxiways;
  }

  public void setTaxiways(List<TaxiwayEntity> taxiways) {
    this.taxiways = taxiways;
  }

  public List<PlaneEntity> getPlanesPresent() {
    return planesPresent;
  }

  public void setPlanesPresent(List<PlaneEntity> planesPresent) {
    this.planesPresent = planesPresent;
  }

  public List<FlightEntity> getFlightFromAirport() {
    return flightFromAirport;
  }

  public void setFlightFromAirport(List<FlightEntity> flightFromAirport) {
    this.flightFromAirport = flightFromAirport;
  }

  public List<FlightEntity> getFlightToAirport() {
    return flightToAirport;
  }

  public void setFlightToAirport(List<FlightEntity> flightToAirport) {
    this.flightToAirport = flightToAirport;
  }

  public List<CrewEntity> getCrewMembersPresent() {
    return crewMembersPresent;
  }

  public void setCrewMembersPresent(List<CrewEntity> crewMembersPresent) {
    this.crewMembersPresent = crewMembersPresent;
  }
}
