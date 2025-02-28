package com.flightcoordinator.dataservice.entity;

import com.flightcoordinator.dataservice.enums.CertificationStatus;
import com.flightcoordinator.dataservice.enums.Certifier;
import com.flightcoordinator.dataservice.enums.EngineType;
import com.flightcoordinator.dataservice.enums.NoiseCategory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "model_table")
public class ModelEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private String id;

  @NotBlank(message = "Manufacturer is required")
  @Column(name = "manufacturer", nullable = false)
  private String manufacturer;

  @NotBlank(message = "Plane identifier is required")
  @Column(name = "plane_identifier", nullable = false)
  private String planeIdentifier;

  @NotBlank(message = "Model name is required")
  @Column(name = "model_name", nullable = false)
  private String modelName;

  @Enumerated(EnumType.STRING)
  @Column(name = "certifier", nullable = false)
  private Certifier certifier;

  @Enumerated(EnumType.STRING)
  @Column(name = "certification_status", nullable = false)
  private CertificationStatus certificationStatus;

  @Enumerated(EnumType.STRING)
  @Column(name = "noise_category", nullable = false)
  private NoiseCategory noiseCategory;

  @Min(value = 1, message = "Fuel capacity should be >= 1")
  @Column(name = "fuel_capacity", nullable = false)
  private Float fuelCapacity;

  @Min(value = 0, message = "Fuel efficiency should be >= 1")
  @Column(name = "fuel_efficiency", nullable = false)
  private Float fuelEfficiency; // per passenger per km

  @Min(value = 1, message = "Max passenger capacity should be >= 1")
  @Column(name = "max_passenger_capacity", nullable = false)
  private Integer maxPassengerCapacity;

  @Min(value = 0, message = "Max cargo capacity should be >= 1")
  @Column(name = "max_cargo_capacity", nullable = false)
  private Float maxCargoCapacity;

  @Min(value = 1, message = "Empty weight should be >= 1")
  @Column(name = "empty_weight", nullable = false)
  private Float emptyWeight;

  @Min(value = 1, message = "Tail height should be >= 1")
  @Column(name = "tail_height", nullable = false)
  private Float tailHeight;

  @Min(value = 1, message = "Wing span should be >= 1")
  @Column(name = "wing_span", nullable = false)
  private Float wingspan;

  @Enumerated(EnumType.STRING)
  @Column(name = "engine_type", nullable = false)
  private EngineType engineType;

  @Min(value = 1, message = "Engine count should be >= 1")
  @Column(name = "engine_count", nullable = false)
  private Integer engineCount;

  @Min(value = 1, message = "Thrust per engine should be >= 1")
  @Column(name = "thrust_per_engine", nullable = false)
  private Float thrustPerEngine;

  @Min(value = 1, message = "Max crosswind component should be >= 1")
  @Column(name = "max_crosswind_comp", nullable = false)
  private Float maxCrosswindComp;

  @Min(value = 1, message = "Required runway length should be >= 1")
  @Column(name = "required_runway_length", nullable = false)
  private Float requiredRunwayLength;

  @Min(value = 1, message = "Required runway width should be >= 1")
  @Column(name = "required_runway_width", nullable = false)
  private Float requiredRunwayWidth;

  @Min(value = 1, message = "Min rotation radius should be >= 1")
  @Column(name = "min_rotation_radius", nullable = false)
  private Float minRotationRadius;

  @Min(value = 1, message = "Cruise speed should be >= 1")
  @Column(name = "cruise_speed", nullable = false)
  private Float cruiseSpeed;

  @Min(value = 1, message = "Max speed should be >= 1")
  @Column(name = "max_speed", nullable = false)
  private Float maxSpeed;

  @Min(value = 1, message = "Stall speed should be >= 1")
  @Column(name = "stall_speed", nullable = false)
  private Float stallSpeed;

  @Min(value = 1, message = "Max altitude should be >= 1")
  @Column(name = "max_altitude", nullable = false)
  private Float maxAltitude;

  @Min(value = 1, message = "Climb rate should be >= 1")
  @Column(name = "climb_rate", nullable = false)
  private Float climbRate;

  @Min(value = 1, message = "Descent rate should be >= 1")
  @Column(name = "descent_rate", nullable = false)
  private Float descentRate;

  @Min(value = 1, message = "Max flight range should be >= 1")
  @Column(name = "max_flight_range", nullable = false)
  private Float maxFlightRange;

  @Column(name = "has_weather_radar", nullable = false)
  private Boolean hasWeatherRadar;

  @Column(name = "has_autopilot", nullable = false)
  private Boolean hasAutopilot;

  @Column(name = "has_fly_by_wire", nullable = false)
  private Boolean hasFlyByWire;

  @Column(name = "has_fire_supression", nullable = false)
  private Boolean hasFireSupression;

  @Column(name = "gps_enabled", nullable = false)
  private Boolean gpsEnabled;

  public ModelEntity() {
  }

  public ModelEntity(String id, @NotBlank(message = "Manufacturer is required") String manufacturer,
      @NotBlank(message = "Plane identifier is required") String planeIdentifier,
      @NotBlank(message = "Model name is required") String modelName, Certifier certifier,
      CertificationStatus certificationStatus, NoiseCategory noiseCategory,
      @Min(value = 1, message = "Fuel capacity should be >= 1") Float fuelCapacity,
      @Min(value = 1, message = "Fuel efficiency should be >= 1") Float fuelEfficiency,
      @Min(value = 1, message = "Max passenger capacity should be >= 1") Integer maxPassengerCapacity,
      @Min(value = 1, message = "Max cargo capacity should be >= 1") Float maxCargoCapacity,
      @Min(value = 1, message = "Empty weight should be >= 1") Float emptyWeight,
      @Min(value = 1, message = "Tail height should be >= 1") Float tailHeight,
      @Min(value = 1, message = "Wing span should be >= 1") Float wingspan, EngineType engineType,
      @Min(value = 1, message = "Engine count should be >= 1") Integer engineCount,
      @Min(value = 1, message = "Thrust per engine should be >= 1") Float thrustPerEngine,
      @Min(value = 1, message = "Max crosswind component should be >= 1") Float maxCrosswindComp,
      @Min(value = 1, message = "Required runway length should be >= 1") Float requiredRunwayLength,
      @Min(value = 1, message = "Required runway width should be >= 1") Float requiredRunwayWidth,
      @Min(value = 1, message = "Min rotation radius should be >= 1") Float minRotationRadius,
      @Min(value = 1, message = "Cruise speed should be >= 1") Float cruiseSpeed,
      @Min(value = 1, message = "Max speed should be >= 1") Float maxSpeed,
      @Min(value = 1, message = "Stall speed should be >= 1") Float stallSpeed,
      @Min(value = 1, message = "Max altitude should be >= 1") Float maxAltitude,
      @Min(value = 1, message = "Climb rate should be >= 1") Float climbRate,
      @Min(value = 1, message = "Descent rate should be >= 1") Float descentRate,
      @Min(value = 1, message = "Max flight range should be >= 1") Float maxFlightRange, Boolean hasWeatherRadar,
      Boolean hasAutopilot, Boolean hasFlyByWire, Boolean hasFireSupression, Boolean gpsEnabled) {
    this.id = id;
    this.manufacturer = manufacturer;
    this.planeIdentifier = planeIdentifier;
    this.modelName = modelName;
    this.certifier = certifier;
    this.certificationStatus = certificationStatus;
    this.noiseCategory = noiseCategory;
    this.fuelCapacity = fuelCapacity;
    this.fuelEfficiency = fuelEfficiency;
    this.maxPassengerCapacity = maxPassengerCapacity;
    this.maxCargoCapacity = maxCargoCapacity;
    this.emptyWeight = emptyWeight;
    this.tailHeight = tailHeight;
    this.wingspan = wingspan;
    this.engineType = engineType;
    this.engineCount = engineCount;
    this.thrustPerEngine = thrustPerEngine;
    this.maxCrosswindComp = maxCrosswindComp;
    this.requiredRunwayLength = requiredRunwayLength;
    this.requiredRunwayWidth = requiredRunwayWidth;
    this.minRotationRadius = minRotationRadius;
    this.cruiseSpeed = cruiseSpeed;
    this.maxSpeed = maxSpeed;
    this.stallSpeed = stallSpeed;
    this.maxAltitude = maxAltitude;
    this.climbRate = climbRate;
    this.descentRate = descentRate;
    this.maxFlightRange = maxFlightRange;
    this.hasWeatherRadar = hasWeatherRadar;
    this.hasAutopilot = hasAutopilot;
    this.hasFlyByWire = hasFlyByWire;
    this.hasFireSupression = hasFireSupression;
    this.gpsEnabled = gpsEnabled;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getManufacturer() {
    return manufacturer;
  }

  public void setManufacturer(String manufacturer) {
    this.manufacturer = manufacturer;
  }

  public String getPlaneIdentifier() {
    return planeIdentifier;
  }

  public void setPlaneIdentifier(String planeIdentifier) {
    this.planeIdentifier = planeIdentifier;
  }

  public String getModelName() {
    return modelName;
  }

  public void setModelName(String modelName) {
    this.modelName = modelName;
  }

  public Certifier getCertifier() {
    return certifier;
  }

  public void setCertifier(Certifier certifier) {
    this.certifier = certifier;
  }

  public CertificationStatus getCertificationStatus() {
    return certificationStatus;
  }

  public void setCertificationStatus(CertificationStatus certificationStatus) {
    this.certificationStatus = certificationStatus;
  }

  public NoiseCategory getNoiseCategory() {
    return noiseCategory;
  }

  public void setNoiseCategory(NoiseCategory noiseCategory) {
    this.noiseCategory = noiseCategory;
  }

  public Float getFuelCapacity() {
    return fuelCapacity;
  }

  public void setFuelCapacity(Float fuelCapacity) {
    this.fuelCapacity = fuelCapacity;
  }

  public Float getFuelEfficiency() {
    return fuelEfficiency;
  }

  public void setFuelEfficiency(Float fuelEfficiency) {
    this.fuelEfficiency = fuelEfficiency;
  }

  public Integer getMaxPassengerCapacity() {
    return maxPassengerCapacity;
  }

  public void setMaxPassengerCapacity(Integer maxPassengerCapacity) {
    this.maxPassengerCapacity = maxPassengerCapacity;
  }

  public Float getMaxCargoCapacity() {
    return maxCargoCapacity;
  }

  public void setMaxCargoCapacity(Float maxCargoCapacity) {
    this.maxCargoCapacity = maxCargoCapacity;
  }

  public Float getEmptyWeight() {
    return emptyWeight;
  }

  public void setEmptyWeight(Float emptyWeight) {
    this.emptyWeight = emptyWeight;
  }

  public Float getTailHeight() {
    return tailHeight;
  }

  public void setTailHeight(Float tailHeight) {
    this.tailHeight = tailHeight;
  }

  public Float getWingspan() {
    return wingspan;
  }

  public void setWingspan(Float wingspan) {
    this.wingspan = wingspan;
  }

  public EngineType getEngineType() {
    return engineType;
  }

  public void setEngineType(EngineType engineType) {
    this.engineType = engineType;
  }

  public Integer getEngineCount() {
    return engineCount;
  }

  public void setEngineCount(Integer engineCount) {
    this.engineCount = engineCount;
  }

  public Float getThrustPerEngine() {
    return thrustPerEngine;
  }

  public void setThrustPerEngine(Float thrustPerEngine) {
    this.thrustPerEngine = thrustPerEngine;
  }

  public Float getMaxCrosswindComp() {
    return maxCrosswindComp;
  }

  public void setMaxCrosswindComp(Float maxCrosswindComp) {
    this.maxCrosswindComp = maxCrosswindComp;
  }

  public Float getRequiredRunwayLength() {
    return requiredRunwayLength;
  }

  public void setRequiredRunwayLength(Float requiredRunwayLength) {
    this.requiredRunwayLength = requiredRunwayLength;
  }

  public Float getRequiredRunwayWidth() {
    return requiredRunwayWidth;
  }

  public void setRequiredRunwayWidth(Float requiredRunwayWidth) {
    this.requiredRunwayWidth = requiredRunwayWidth;
  }

  public Float getMinRotationRadius() {
    return minRotationRadius;
  }

  public void setMinRotationRadius(Float minRotationRadius) {
    this.minRotationRadius = minRotationRadius;
  }

  public Float getCruiseSpeed() {
    return cruiseSpeed;
  }

  public void setCruiseSpeed(Float cruiseSpeed) {
    this.cruiseSpeed = cruiseSpeed;
  }

  public Float getMaxSpeed() {
    return maxSpeed;
  }

  public void setMaxSpeed(Float maxSpeed) {
    this.maxSpeed = maxSpeed;
  }

  public Float getStallSpeed() {
    return stallSpeed;
  }

  public void setStallSpeed(Float stallSpeed) {
    this.stallSpeed = stallSpeed;
  }

  public Float getMaxAltitude() {
    return maxAltitude;
  }

  public void setMaxAltitude(Float maxAltitude) {
    this.maxAltitude = maxAltitude;
  }

  public Float getClimbRate() {
    return climbRate;
  }

  public void setClimbRate(Float climbRate) {
    this.climbRate = climbRate;
  }

  public Float getDescentRate() {
    return descentRate;
  }

  public void setDescentRate(Float descentRate) {
    this.descentRate = descentRate;
  }

  public Float getMaxFlightRange() {
    return maxFlightRange;
  }

  public void setMaxFlightRange(Float maxFlightRange) {
    this.maxFlightRange = maxFlightRange;
  }

  public Boolean getHasWeatherRadar() {
    return hasWeatherRadar;
  }

  public void setHasWeatherRadar(Boolean hasWeatherRadar) {
    this.hasWeatherRadar = hasWeatherRadar;
  }

  public Boolean getHasAutopilot() {
    return hasAutopilot;
  }

  public void setHasAutopilot(Boolean hasAutopilot) {
    this.hasAutopilot = hasAutopilot;
  }

  public Boolean getHasFlyByWire() {
    return hasFlyByWire;
  }

  public void setHasFlyByWire(Boolean hasFlyByWire) {
    this.hasFlyByWire = hasFlyByWire;
  }

  public Boolean getHasFireSupression() {
    return hasFireSupression;
  }

  public void setHasFireSupression(Boolean hasFireSupression) {
    this.hasFireSupression = hasFireSupression;
  }

  public Boolean getGpsEnabled() {
    return gpsEnabled;
  }

  public void setGpsEnabled(Boolean gpsEnabled) {
    this.gpsEnabled = gpsEnabled;
  }
}
