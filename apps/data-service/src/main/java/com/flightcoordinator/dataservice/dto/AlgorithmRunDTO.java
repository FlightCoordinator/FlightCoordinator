package com.flightcoordinator.dataservice.dto;

import java.util.Date;

public class AlgorithmRunDTO {
  private String id;
  private String algorithmName;
  private Date startTime;
  private Date endTime;
  private Long runtimeInMs;
  private String resourcesJson;
  private String constraintsJson;
  private String logsJson;
  private Boolean isSuccessful;
  private String failureReason;
  private Boolean areResultsSaved;
  private String resultId;

  public AlgorithmRunDTO(String id, String algorithmName, Date startTime, Date endTime, Long runtimeInMilliseconds,
      String resourcesJson, String constraintsJson, String logsJson, Boolean isSuccessful, String failureReason,
      Boolean areResultsSaved, String resultId) {
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
    this.resultId = resultId;
  }

  public AlgorithmRunDTO() {
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

  public String getResultId() {
    return resultId;
  }

  public void setResultId(String resultId) {
    this.resultId = resultId;
  }
}
