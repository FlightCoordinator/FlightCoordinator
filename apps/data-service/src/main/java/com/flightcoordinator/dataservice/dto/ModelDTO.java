package com.flightcoordinator.dataservice.dto;

import com.flightcoordinator.dataservice.enums.CertificationStatus;
import com.flightcoordinator.dataservice.enums.Certifier;
import com.flightcoordinator.dataservice.enums.EngineType;
import com.flightcoordinator.dataservice.enums.NoiseCategory;

public class ModelDTO {
  private String id;
  private String manufacturer;
  private String planeIdentifier;
  private String modelName;
  private Certifier certifier;
  private CertificationStatus certificationStatus;
  private NoiseCategory noiseCategory;
  private Float fuelCapacity;
  private Float fuelEfficiency; // per passenger per km
  private Integer maxPassengerCapacity;
  private Float maxCargoCapacity;
  private Float emptyWeight;
  private Float tailHeight;
  private Float wingspan;
  private EngineType engineType;
  private Integer engineCount;
  private Float thrustPerEngine;
  private Float maxCrosswindComp;
  private Float requiredRunwayLength;
  private Float requiredRunwayWidth;
  private Float minRotationRadius;
  private Float cruiseSpeed;
  private Float maxSpeed;
  private Float stallSpeed;
  private Float maxAltitude;
  private Float climbRate;
  private Float descentRate;
  private Float maxFlightRange;
  private Boolean hasWeatherRadar;
  private Boolean hasAutopilot;
  private Boolean hasFlyByWire;
  private Boolean hasFireSupression;
  private Boolean gpsEnabled;

  public ModelDTO() {
  }

  public ModelDTO(String id, String manufacturer, String planeIdentifier, String modelName, Certifier certifier,
      CertificationStatus certificationStatus, NoiseCategory noiseCategory, Float fuelCapacity, Float fuelEfficiency,
      Integer maxPassengerCapacity, Float maxCargoCapacity, Float emptyWeight, Float tailHeight, Float wingspan,
      EngineType engineType, Integer engineCount, Float thrustPerEngine, Float maxCrosswindComp,
      Float requiredRunwayLength, Float requiredRunwayWidth, Float minRotationRadius, Float cruiseSpeed, Float maxSpeed,
      Float stallSpeed, Float maxAltitude, Float climbRate, Float descentRate, Float maxFlightRange,
      Boolean hasWeatherRadar, Boolean hasAutopilot, Boolean hasFlyByWire, Boolean hasFireSupression,
      Boolean gpsEnabled) {
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
