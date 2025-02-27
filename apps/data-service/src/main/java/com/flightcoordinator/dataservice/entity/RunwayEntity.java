package com.flightcoordinator.dataservice.entity;

import java.util.List;

import com.flightcoordinator.dataservice.enums.RunwayStatus;
import com.flightcoordinator.dataservice.enums.SurfaceType;
import com.flightcoordinator.dataservice.enums.VisualApproachAid;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "runway_table")
public class RunwayEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private String id;

  @NotEmpty(message = "Runway number is required")
  @Column(name = "runway_number", nullable = false)
  private String runwayNumber;

  @ManyToOne
  @JoinColumn(name = "runway_airport_id", nullable = false)
  private AirportEntity airport;

  @Min(value = 1, message = "Runway length should be >= 1")
  @NotEmpty(message = "Runway length is required")
  @Column(name = "length", nullable = false)
  private Float length;

  @Min(value = 1, message = "Runway width should be >= 1")
  @NotEmpty(message = "Runway width is required")
  @Column(name = "width", nullable = false)
  private Float width;

  @Enumerated(EnumType.STRING)
  @NotEmpty(message = "Surface type is required")
  @Column(name = "surface_type", nullable = false)
  private SurfaceType surfaceType;

  @Min(value = 1, message = "Max weight capacity should be >= 1")
  @NotEmpty(message = "Max weight capacity is required")
  @Column(name = "max_weight_capacity", nullable = false)
  private Float maxWeightCapacity;

  @Column(name = "has_markings", nullable = false)
  @NotEmpty(message = "Has lighting is required")
  private Boolean hasMarkings;

  @NotEmpty(message = "Has lighting is required")
  @Column(name = "has_lighting", nullable = false)
  private Boolean hasLighting;

  @NotEmpty(message = "Has ILS is required")
  @Column(name = "has_ils", nullable = false)
  private Boolean hasILS;

  @NotEmpty(message = "Has safety area is required")
  @Column(name = "has_safety_area", nullable = false)
  private Boolean hasSafetyArea;

  @Enumerated(EnumType.STRING)
  @NotEmpty(message = "Visual approach aid is required")
  @Column(name = "visual_approach_aid", nullable = false)
  private VisualApproachAid visualApproachAid;

  @Min(value = 1, message = "Altitude should be >= 1")
  @NotEmpty(message = "Altitude is required")
  @Column(name = "altitude", nullable = false)
  private Float altitude;

  @Enumerated(EnumType.STRING)
  @NotEmpty(message = "Status is required")
  @Column(name = "status", nullable = false)
  private RunwayStatus status;

  @Min(value = 1, message = "Max weight capacity should be >= 1")
  @NotEmpty(message = "Crosswind limit is required")
  @Column(name = "crosswind_limit", nullable = false)
  private Float crosswindLimit;

  @OneToMany(mappedBy = "connectedRunway", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<TaxiwayEntity> connectedTaxiways;

  public RunwayEntity(String id,
      @NotEmpty(message = "Runway number is required") String runwayNumber,
      @NotEmpty(message = "Airport is required") AirportEntity airport,
      @Min(value = 1, message = "Runway length should be >= 1") @NotEmpty(message = "Runway length is required") Float length,
      @Min(value = 1, message = "Runway width should be >= 1") @NotEmpty(message = "Runway width is required") Float width,
      @NotEmpty(message = "Surface type is required") SurfaceType surfaceType,
      @Min(value = 1, message = "Max weight capacity should be >= 1") @NotEmpty(message = "Max weight capacity is required") Float maxWeightCapacity,
      @NotEmpty(message = "Has lighting is required") Boolean hasMarkings,
      @NotEmpty(message = "Has lighting is required") Boolean hasLighting,
      @NotEmpty(message = "Has ILS is required") Boolean hasILS,
      @NotEmpty(message = "Has safety area is required") Boolean hasSafetyArea,
      @NotEmpty(message = "Visual approach aid is required") VisualApproachAid visualApproachAid,
      @Min(value = 1, message = "Altitude should be >= 1") @NotEmpty(message = "Altitude is required") Float altitude,
      @NotEmpty(message = "Status is required") RunwayStatus status,
      @Min(value = 1, message = "Max weight capacity should be >= 1") @NotEmpty(message = "Crosswind limit is required") Float crosswindLimit,
      List<TaxiwayEntity> connectedTaxiways) {
    this.id = id;
    this.runwayNumber = runwayNumber;
    this.airport = airport;
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
    this.connectedTaxiways = connectedTaxiways;
  }

  public RunwayEntity() {
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

  public AirportEntity getAirport() {
    return airport;
  }

  public void setAirport(AirportEntity airport) {
    this.airport = airport;
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

  public List<TaxiwayEntity> getConnectedTaxiways() {
    return connectedTaxiways;
  }

  public void setConnectedTaxiways(List<TaxiwayEntity> connectedTaxiways) {
    this.connectedTaxiways = connectedTaxiways;
  }
}
