package com.flightcoordinator.dataservice.entity;

import java.util.Date;

import com.flightcoordinator.dataservice.enums.PlaneStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "plane_table")
public class PlaneEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id")
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "plane_model", nullable = false)
  private ModelEntity model;

  @NotBlank(message = "Tail number is required")
  @Column(name = "tail_number", nullable = false)
  private String tailNumber;

  @Column(name = "next_maintenance_date", nullable = false)
  private Date nextMaintenanceDate;

  @Min(value = 0, message = "Cycles since last maintenance should be >= 0")
  @Column(name = "cycles_since_last_maintenance", nullable = false)
  private Integer cyclesSinceLastMaintenance;

  @Column(name = "retirement_date", nullable = false)
  private Date retirementDate;

  @Min(value = 0, message = "Engine hours should be >= 0")
  @Column(name = "engine_hours", nullable = false)
  private Float engineHours;

  @Min(value = 0, message = "Current wear level should be >= 0")
  @Max(value = 100, message = "Current wear level should be between 0-100")
  @Column(name = "current_wear_level", nullable = false)
  private Float currentWearLevel;

  @Min(value = 0, message = "Total flight hours should be >= 0")
  @Column(name = "total_flight_hours", nullable = false)
  private Float totalFlightHours;

  @Min(value = 0, message = "Fuel amount should be >= 0")
  @Column(name = "fuel_capacity", nullable = false)
  private Float fuelAmount;

  @Enumerated(EnumType.STRING)
  @Column(name = "plane_status", nullable = false)
  private PlaneStatus planeStatus;

  @ManyToOne
  @JoinColumn(name = "airport_id", nullable = false)
  private AirportEntity currentLocation;

  @NotBlank(message = "Aircraft operator is required")
  @Column(name = "aircraft_operator", nullable = false)
  private String aircraftOperator;

  public PlaneEntity() {
  }

  public PlaneEntity(String id, ModelEntity model, @NotBlank(message = "Tail number is required") String tailNumber,
      Date nextMaintenanceDate,
      @Min(value = 0, message = "Cycles since last maintenance should be >= 0") Integer cyclesSinceLastMaintenance,
      Date retirementDate, @Min(value = 0, message = "Engine hours should be >= 0") Float engineHours,
      @Min(value = 0, message = "Current wear level should be >= 0") @Max(value = 100, message = "Current wear level should be between 0-100") Float currentWearLevel,
      @Min(value = 0, message = "Total flight hours should be >= 0") Float totalFlightHours,
      @Min(value = 0, message = "Fuel amount should be >= 0") Float fuelAmount, PlaneStatus planeStatus,
      AirportEntity currentLocation, @NotBlank(message = "Aircraft operator is required") String aircraftOperator) {
    this.id = id;
    this.model = model;
    this.tailNumber = tailNumber;
    this.nextMaintenanceDate = nextMaintenanceDate;
    this.cyclesSinceLastMaintenance = cyclesSinceLastMaintenance;
    this.retirementDate = retirementDate;
    this.engineHours = engineHours;
    this.currentWearLevel = currentWearLevel;
    this.totalFlightHours = totalFlightHours;
    this.fuelAmount = fuelAmount;
    this.planeStatus = planeStatus;
    this.currentLocation = currentLocation;
    this.aircraftOperator = aircraftOperator;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public ModelEntity getModel() {
    return model;
  }

  public void setModel(ModelEntity model) {
    this.model = model;
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

  public AirportEntity getCurrentLocation() {
    return currentLocation;
  }

  public void setCurrentLocation(AirportEntity currentLocation) {
    this.currentLocation = currentLocation;
  }

  public String getAircraftOperator() {
    return aircraftOperator;
  }

  public void setAircraftOperator(String aircraftOperator) {
    this.aircraftOperator = aircraftOperator;
  }
}
