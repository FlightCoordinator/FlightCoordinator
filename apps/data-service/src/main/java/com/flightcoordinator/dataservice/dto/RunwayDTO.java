package com.flightcoordinator.dataservice.dto;

import com.flightcoordinator.dataservice.enums.RunwayStatus;
import com.flightcoordinator.dataservice.enums.SurfaceType;
import com.flightcoordinator.dataservice.enums.VisualApproachAid;

public class RunwayDTO {
  private String id;
  private String runwayNumber;
  private String airportId;
  private Float length;
  private Float width;
  private SurfaceType surfaceType;
  private Float maxWeightCapacity;
  private Boolean hasMarkings;
  private Boolean hasLighting;
  private Boolean hasILS;
  private Boolean hasSafetyArea;
  private VisualApproachAid visualApproachAid;
  private Float altitude;
  private RunwayStatus status;
  private Float crosswindLimit;

  public RunwayDTO(String id, String runwayNumber, String airportId, Float length, Float width, SurfaceType surfaceType,
      Float maxWeightCapacity, Boolean hasMarkings, Boolean hasLighting, Boolean hasILS, Boolean hasSafetyArea,
      VisualApproachAid visualApproachAid, Float altitude, RunwayStatus status, Float crosswindLimit) {
    this.id = id;
    this.runwayNumber = runwayNumber;
    this.airportId = airportId;
    this.length = length;
    this.width = width;
    this.surfaceType = surfaceType;
    this.maxWeightCapacity = maxWeightCapacity;
    this.hasMarkings = hasMarkings;
    this.hasLighting = hasLighting;
    this.hasILS = hasILS;
    this.hasSafetyArea = hasSafetyArea;
    this.visualApproachAid = visualApproachAid;
    this.altitude = altitude;
    this.status = status;
    this.crosswindLimit = crosswindLimit;
  }

  public RunwayDTO() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getRunwayNumber() {
    return runwayNumber;
  }

  public void setRunwayNumber(String runwayNumber) {
    this.runwayNumber = runwayNumber;
  }

  public String getAirportId() {
    return airportId;
  }

  public void setAirportId(String airportId) {
    this.airportId = airportId;
  }

  public Float getLength() {
    return length;
  }

  public void setLength(Float length) {
    this.length = length;
  }

  public Float getWidth() {
    return width;
  }

  public void setWidth(Float width) {
    this.width = width;
  }

  public SurfaceType getSurfaceType() {
    return surfaceType;
  }

  public void setSurfaceType(SurfaceType surfaceType) {
    this.surfaceType = surfaceType;
  }

  public Float getMaxWeightCapacity() {
    return maxWeightCapacity;
  }

  public void setMaxWeightCapacity(Float maxWeightCapacity) {
    this.maxWeightCapacity = maxWeightCapacity;
  }

  public Boolean getHasMarkings() {
    return hasMarkings;
  }

  public void setHasMarkings(Boolean hasMarkings) {
    this.hasMarkings = hasMarkings;
  }

  public Boolean getHasLighting() {
    return hasLighting;
  }

  public void setHasLighting(Boolean hasLighting) {
    this.hasLighting = hasLighting;
  }

  public Boolean getHasILS() {
    return hasILS;
  }

  public void setHasILS(Boolean hasILS) {
    this.hasILS = hasILS;
  }

  public Boolean getHasSafetyArea() {
    return hasSafetyArea;
  }

  public void setHasSafetyArea(Boolean hasSafetyArea) {
    this.hasSafetyArea = hasSafetyArea;
  }

  public VisualApproachAid getVisualApproachAid() {
    return visualApproachAid;
  }

  public void setVisualApproachAid(VisualApproachAid visualApproachAid) {
    this.visualApproachAid = visualApproachAid;
  }

  public Float getAltitude() {
    return altitude;
  }

  public void setAltitude(Float altitude) {
    this.altitude = altitude;
  }

  public RunwayStatus getStatus() {
    return status;
  }

  public void setStatus(RunwayStatus status) {
    this.status = status;
  }

  public Float getCrosswindLimit() {
    return crosswindLimit;
  }

  public void setCrosswindLimit(Float crosswindLimit) {
    this.crosswindLimit = crosswindLimit;
  }
}
