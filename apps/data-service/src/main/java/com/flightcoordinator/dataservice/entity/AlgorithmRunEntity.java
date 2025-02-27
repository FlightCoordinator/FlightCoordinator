package com.flightcoordinator.dataservice.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "algorithm_run_table")
public class AlgorithmRunEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private String id;

  @NotBlank(message = "Algorithm name is required")
  @Column(name = "algorithm_name", nullable = false)
  private String algorithmName;

  @NotBlank(message = "Start time is required")
  @Column(name = "start_time", nullable = false)
  private Date startTime;

  @NotBlank(message = "End time is required")
  @Column(name = "end_time", nullable = false)
  private Date endTime;

  @NotBlank(message = "Runtime in ms is required")
  @Column(name = "runtime_in_milliseconds", nullable = false)
  private Long runtimeInMs;

  @NotBlank(message = "Resources JSON is required")
  @Column(name = "resources_json", nullable = false)
  private String resourcesJson;

  @NotBlank(message = "Constraints JSON is required")
  @Column(name = "constraints_json", nullable = false)
  private String constraintsJson;

  @NotBlank(message = "Logs JSON is required")
  @Column(name = "logs_json", nullable = false)
  private String logsJson;

  @NotBlank(message = "Is successful is required")
  @Column(name = "is_successful", nullable = false)
  private Boolean isSuccessful;

  @NotBlank(message = "Failure reason is required")
  @Column(name = "failure_reason", nullable = true)
  private String failureReason;

  @NotBlank(message = "Are results saved is required")
  @Column(name = "are_results_saved", nullable = false)
  private Boolean areResultsSaved;

  @OneToOne
  @JoinColumn(name = "run_result", nullable = false)
  private AlgorithmResultEntity result;

  public AlgorithmRunEntity() {
  }

  public AlgorithmRunEntity(String id, @NotBlank(message = "Algorithm name is required") String algorithmName,
      @NotBlank(message = "Start time is required") Date startTime,
      @NotBlank(message = "End time is required") Date endTime,
      @NotBlank(message = "Runtime in ms is required") Long runtimeInMilliseconds,
      @NotBlank(message = "Resources JSON is required") String resourcesJson,
      @NotBlank(message = "Constraints JSON is required") String constraintsJson,
      @NotBlank(message = "Logs JSON is required") String logsJson,
      @NotBlank(message = "Is successful is required") Boolean isSuccessful,
      @NotBlank(message = "Failure reason is required") String failureReason,
      @NotBlank(message = "Are results saved is required") Boolean areResultsSaved, AlgorithmResultEntity result) {
    this.id = id;
    this.algorithmName = algorithmName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.runtimeInMs = runtimeInMilliseconds;
    this.resourcesJson = resourcesJson;
    this.constraintsJson = constraintsJson;
    this.logsJson = logsJson;
    this.isSuccessful = isSuccessful;
    this.failureReason = failureReason;
    this.areResultsSaved = areResultsSaved;
    this.result = result;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getAlgorithmName() {
    return algorithmName;
  }

  public void setAlgorithmName(String algorithmName) {
    this.algorithmName = algorithmName;
  }

  public Date getStartTime() {
    return startTime;
  }

  public void setStartTime(Date startTime) {
    this.startTime = startTime;
  }

  public Date getEndTime() {
    return endTime;
  }

  public void setEndTime(Date endTime) {
    this.endTime = endTime;
  }

  public Long getRuntimeInMs() {
    return runtimeInMs;
  }

  public void setRuntimeInMs(Long runtimeInMilliseconds) {
    this.runtimeInMs = runtimeInMilliseconds;
  }

  public String getResourcesJson() {
    return resourcesJson;
  }

  public void setResourcesJson(String resourcesJson) {
    this.resourcesJson = resourcesJson;
  }

  public String getConstraintsJson() {
    return constraintsJson;
  }

  public void setConstraintsJson(String constraintsJson) {
    this.constraintsJson = constraintsJson;
  }

  public String getLogsJson() {
    return logsJson;
  }

  public void setLogsJson(String logsJson) {
    this.logsJson = logsJson;
  }

  public Boolean getIsSuccessful() {
    return isSuccessful;
  }

  public void setIsSuccessful(Boolean isSuccessful) {
    this.isSuccessful = isSuccessful;
  }

  public String getFailureReason() {
    return failureReason;
  }

  public void setFailureReason(String failureReason) {
    this.failureReason = failureReason;
  }

  public Boolean getAreResultsSaved() {
    return areResultsSaved;
  }

  public void setAreResultsSaved(Boolean areResultsSaved) {
    this.areResultsSaved = areResultsSaved;
  }

  public AlgorithmResultEntity getResult() {
    return result;
  }

  public void setResult(AlgorithmResultEntity result) {
    this.result = result;
  }
}
