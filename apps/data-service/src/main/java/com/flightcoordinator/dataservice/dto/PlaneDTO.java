package com.flightcoordinator.dataservice.dto;

import java.util.Date;

import com.flightcoordinator.dataservice.enums.PlaneStatus;

public class PlaneDTO {
  private String id;
  private String modelId;
  private String tailNumber;
  private Date nextMaintenanceDate;
  private Integer cyclesSinceLastMaintenance;
  private Date retirementDate;
  private Float engineHours;
  private Float currentWearLevel;
  private Float totalFlightHours;
  private Float fuelAmount;
  private PlaneStatus planeStatus;
  private String currentLocationId;
  private String aircraftOperator;

  public PlaneDTO(String id, String modelId, String tailNumber, Date nextMaintenanceDate,
      Integer cyclesSinceLastMaintenance, Date retirementDate, Float engineHours, Float currentWearLevel,
      Float totalFlightHours, Float fuelAmount, PlaneStatus planeStatus, String currentLocationId,
      String aircraftOperator) {
    this.id = id;
    this.modelId = modelId;
    this.tailNumber = tailNumber;
    this.nextMaintenanceDate = nextMaintenanceDate;
    this.cyclesSinceLastMaintenance = cyclesSinceLastMaintenance;
    this.retirementDate = retirementDate;
    this.engineHours = engineHours;
    this.currentWearLevel = currentWearLevel;
    this.totalFlightHours = totalFlightHours;
    this.fuelAmount = fuelAmount;
    this.planeStatus = planeStatus;
    this.currentLocationId = currentLocationId;
    this.aircraftOperator = aircraftOperator;
  }

  public PlaneDTO() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getModelId() {
    return modelId;
  }

  public void setModelId(String modelId) {
    this.modelId = modelId;
  }

  public String getTailNumber() {
    return tailNumber;
  }

  public void setTailNumber(String tailNumber) {
    this.tailNumber = tailNumber;
  }

  public Date getNextMaintenanceDate() {
    return nextMaintenanceDate;
  }

  public void setNextMaintenanceDate(Date nextMaintenanceDate) {
    this.nextMaintenanceDate = nextMaintenanceDate;
  }

  public Integer getCyclesSinceLastMaintenance() {
    return cyclesSinceLastMaintenance;
  }

  public void setCyclesSinceLastMaintenance(Integer cyclesSinceLastMaintenance) {
    this.cyclesSinceLastMaintenance = cyclesSinceLastMaintenance;
  }

  public Date getRetirementDate() {
    return retirementDate;
  }

  public void setRetirementDate(Date retirementDate) {
    this.retirementDate = retirementDate;
  }

  public Float getEngineHours() {
    return engineHours;
  }

  public void setEngineHours(Float engineHours) {
    this.engineHours = engineHours;
  }

  public Float getCurrentWearLevel() {
    return currentWearLevel;
  }

  public void setCurrentWearLevel(Float currentWearLevel) {
    this.currentWearLevel = currentWearLevel;
  }

  public Float getTotalFlightHours() {
    return totalFlightHours;
  }

  public void setTotalFlightHours(Float totalFlightHours) {
    this.totalFlightHours = totalFlightHours;
  }

  public Float getFuelAmount() {
    return fuelAmount;
  }

  public void setFuelAmount(Float fuelAmount) {
    this.fuelAmount = fuelAmount;
  }

  public PlaneStatus getPlaneStatus() {
    return planeStatus;
  }

  public void setPlaneStatus(PlaneStatus planeStatus) {
    this.planeStatus = planeStatus;
  }

  public String getCurrentLocationId() {
    return currentLocationId;
  }

  public void setCurrentLocationId(String currentLocationId) {
    this.currentLocationId = currentLocationId;
  }

  public String getAircraftOperator() {
    return aircraftOperator;
  }

  public void setAircraftOperator(String aircraftOperator) {
    this.aircraftOperator = aircraftOperator;
  }
}
