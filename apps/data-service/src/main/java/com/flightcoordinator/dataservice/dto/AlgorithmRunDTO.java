package com.flightcoordinator.dataservice.dto;

import java.util.Date;

public class AlgorithmRunDTO {
  private String id;
  private Date startTimestamp;
  private Date endTimestamp;
  private Long runtimeInMs;
  private String runLogsJson;
  private Boolean isSuccessful;
  private String failureReason;
  private String resultId;

  public AlgorithmRunDTO() {
  }

  public AlgorithmRunDTO(String id, Date startTimeStamp, Date endTimeStamp, Long runtimeInMs, String runLogsJson,
      Boolean isSuccessful, String failureReason, String resultId) {
    this.id = id;
    this.startTimestamp = startTimeStamp;
    this.endTimestamp = endTimeStamp;
    this.runtimeInMs = runtimeInMs;
    this.runLogsJson = runLogsJson;
    this.isSuccessful = isSuccessful;
    this.failureReason = failureReason;
    this.resultId = resultId;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Date getStartTimestamp() {
    return startTimestamp;
  }

  public void setStartTimestamp(Date startTimeStamp) {
    this.startTimestamp = startTimeStamp;
  }

  public Date getEndTimestamp() {
    return endTimestamp;
  }

  public void setEndTimestamp(Date endTimeStamp) {
    this.endTimestamp = endTimeStamp;
  }

  public Long getRuntimeInMs() {
    return runtimeInMs;
  }

  public void setRuntimeInMs(Long runtimeInMs) {
    this.runtimeInMs = runtimeInMs;
  }

  public String getRunLogsJson() {
    return runLogsJson;
  }

  public void setRunLogsJson(String runLogsJson) {
    this.runLogsJson = runLogsJson;
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

  public String getResultId() {
    return resultId;
  }

  public void setResultId(String resultId) {
    this.resultId = resultId;
  }
}
