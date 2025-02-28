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
@Table(name = "taxiway_table")
public class TaxiwayEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private String id;

  @NotBlank(message = "Name is required")
  @Column(name = "name", nullable = false)
  private String name;

  @ManyToOne
  @JoinColumn(name = "taxiway_airport_id", nullable = false)
  private AirportEntity airport;

  @Column(name = "load_capacity", nullable = false)
  private Float loadCapacity;

  @Column(name = "has_holding_point", nullable = false)
  private Boolean hasHoldingPoint;

  @Column(name = "has_high_speed_exit", nullable = false)
  private Boolean hasHighSpeedExit;

  @Min(value = 1, message = "Width should be >= 1")
  @Column(name = "width", nullable = false)
  private Float width;

  @Min(value = 1, message = "Length should be >= 1")
  @Column(name = "length", nullable = false)
  private Float length;

  @Min(value = 1, message = "Max turning radius should be >= 1")
  @Column(name = "max_turning_radius", nullable = false)
  private Float maxTurningRadius;

  @Min(value = 1, message = "Max weight capacity should be >= 1")
  @Column(name = "max_weight_capacity", nullable = false)
  private Float maxWeightCapacity;

  @Column(name = "has_lighting", nullable = false)
  private Boolean hasLighting;

  @Column(name = "has_signage", nullable = false)
  private Boolean hasSignage;

  @ManyToOne
  @JoinColumn(name = "runway_id", nullable = false)
  private RunwayEntity connectedRunway;

  public TaxiwayEntity() {
  }

  public TaxiwayEntity(String id, @NotBlank(message = "Name is required") String name, AirportEntity airport,
      Float loadCapacity, Boolean hasHoldingPoint, Boolean hasHighSpeedExit,
      @Min(value = 1, message = "Width should be >= 1") Float width,
      @Min(value = 1, message = "Length should be >= 1") Float length,
      @Min(value = 1, message = "Max turning radius should be >= 1") Float maxTurningRadius,
      @Min(value = 1, message = "Max weight capacity should be >= 1") Float maxWeightCapacity, Boolean hasLighting,
      Boolean hasSignage, RunwayEntity connectedRunway) {
    this.id = id;
    this.name = name;
    this.airport = airport;
    this.loadCapacity = loadCapacity;
    this.hasHoldingPoint = hasHoldingPoint;
    this.hasHighSpeedExit = hasHighSpeedExit;
    this.width = width;
    this.length = length;
    this.maxTurningRadius = maxTurningRadius;
    this.maxWeightCapacity = maxWeightCapacity;
    this.hasLighting = hasLighting;
    this.hasSignage = hasSignage;
    this.connectedRunway = connectedRunway;
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

  public AirportEntity getAirport() {
    return airport;
  }

  public void setAirport(AirportEntity airport) {
    this.airport = airport;
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

  public RunwayEntity getConnectedRunway() {
    return connectedRunway;
  }

  public void setConnectedRunway(RunwayEntity connectedToRunway) {
    this.connectedRunway = connectedToRunway;
  }
}
