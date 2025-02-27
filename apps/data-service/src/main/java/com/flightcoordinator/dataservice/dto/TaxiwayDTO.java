package com.flightcoordinator.dataservice.dto;

public class TaxiwayDTO {
  private String id;
  private String name;
  private String airportId;
  private Float loadCapacity;
  private Boolean hasHoldingPoint;
  private Boolean hasHighSpeedExit;
  private Float width;
  private Float length;
  private Float maxTurningRadius;
  private Float maxWeightCapacity;
  private Boolean hasLighting;
  private Boolean hasSignage;
  private String connectedRunwayId;

  public TaxiwayDTO() {
  }

  public TaxiwayDTO(String id, String name, String airportId, Float loadCapacity, Boolean hasHoldingPoint,
      Boolean hasHighSpeedExit, Float width, Float length, Float maxTurningRadius, Float maxWeightCapacity,
      Boolean hasLighting, Boolean hasSignage, String connectedToRunwayId) {
    this.id = id;
    this.name = name;
    this.airportId = airportId;
    this.loadCapacity = loadCapacity;
    this.hasHoldingPoint = hasHoldingPoint;
    this.hasHighSpeedExit = hasHighSpeedExit;
    this.width = width;
    this.length = length;
    this.maxTurningRadius = maxTurningRadius;
    this.maxWeightCapacity = maxWeightCapacity;
    this.hasLighting = hasLighting;
    this.hasSignage = hasSignage;
    this.connectedRunwayId = connectedToRunwayId;
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

  public String getAirportId() {
    return airportId;
  }

  public void setAirportId(String airportId) {
    this.airportId = airportId;
  }

  public Float getLoadCapacity() {
    return loadCapacity;
  }

  public void setLoadCapacity(Float loadCapacity) {
    this.loadCapacity = loadCapacity;
  }

  public Boolean getHasHoldingPoint() {
    return hasHoldingPoint;
  }

  public void setHasHoldingPoint(Boolean hasHoldingPoint) {
    this.hasHoldingPoint = hasHoldingPoint;
  }

  public Boolean getHasHighSpeedExit() {
    return hasHighSpeedExit;
  }

  public void setHasHighSpeedExit(Boolean hasHighSpeedExit) {
    this.hasHighSpeedExit = hasHighSpeedExit;
  }

  public Float getWidth() {
    return width;
  }

  public void setWidth(Float width) {
    this.width = width;
  }

  public Float getLength() {
    return length;
  }

  public void setLength(Float length) {
    this.length = length;
  }

  public Float getMaxTurningRadius() {
    return maxTurningRadius;
  }

  public void setMaxTurningRadius(Float maxTurningRadius) {
    this.maxTurningRadius = maxTurningRadius;
  }

  public Float getMaxWeightCapacity() {
    return maxWeightCapacity;
  }

  public void setMaxWeightCapacity(Float maxWeightCapacity) {
    this.maxWeightCapacity = maxWeightCapacity;
  }

  public Boolean getHasLighting() {
    return hasLighting;
  }

  public void setHasLighting(Boolean hasLighting) {
    this.hasLighting = hasLighting;
  }

  public Boolean getHasSignage() {
    return hasSignage;
  }

  public void setHasSignage(Boolean hasSignage) {
    this.hasSignage = hasSignage;
  }

  public String getConnectedRunwayId() {
    return connectedRunwayId;
  }

  public void setConnectedRunwayId(String connectedToRunwayId) {
    this.connectedRunwayId = connectedToRunwayId;
  }
}
