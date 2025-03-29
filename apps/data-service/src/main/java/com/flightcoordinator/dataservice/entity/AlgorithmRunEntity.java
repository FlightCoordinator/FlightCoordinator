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

  @NotBlank(message = "Start timestamp is required")
  @Column(name = "start_timestamp", nullable = false)
  private Date startTimetamp;

  @NotBlank(message = "End timestamp is required")
  @Column(name = "end_timestamp", nullable = false)
  private Date endTimestamp;

  @NotBlank(message = "Runtime in ms is required")
  @Column(name = "runtime_in_milliseconds", nullable = false)
  private Long runtimeInMs;

  @NotBlank(message = "Run Logs JSON is required")
  @Column(name = "run_logs_json", nullable = false)
  private String runLogsJson;

  @NotBlank(message = "Is successful is required")
  @Column(name = "is_successful", nullable = false)
  private Boolean isSuccessful;

  @Column(name = "failure_reason", nullable = true)
  private String failureReason;

  @OneToOne
  @JoinColumn(name = "run_result", nullable = false)
  private AlgorithmResultEntity result;

  public AlgorithmRunEntity() {
  }

  public AlgorithmRunEntity(String id, @NotBlank(message = "Start timestamp is required") Date startTimetamp,
      @NotBlank(message = "End timestamp is required") Date endTimestamp,
      @NotBlank(message = "Runtime in ms is required") Long runtimeInMs,
      @NotBlank(message = "Run Logs JSON is required") String runLogsJson,
      @NotBlank(message = "Is successful is required") Boolean isSuccessful, String failureReason,
      AlgorithmResultEntity result) {
    this.id = id;
    this.startTimetamp = startTimetamp;
    this.endTimestamp = endTimestamp;
    this.runtimeInMs = runtimeInMs;
    this.runLogsJson = runLogsJson;
    this.isSuccessful = isSuccessful;
    this.failureReason = failureReason;
    this.result = result;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Date getStartTimetamp() {
    return startTimetamp;
  }

  public void setStartTimetamp(Date startTimetamp) {
    this.startTimetamp = startTimetamp;
  }

  public Date getEndTimestamp() {
    return endTimestamp;
  }

  public void setEndTimestamp(Date endTimestamp) {
    this.endTimestamp = endTimestamp;
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

  public AlgorithmResultEntity getResult() {
    return result;
  }

  public void setResult(AlgorithmResultEntity result) {
    this.result = result;
  }
}
