package com.flightcoordinator.dataservice.dto.misc;

public class CustomResponseDTO<T> {
  private boolean isSuccess = false;

  private String message;

  private T data;

  public CustomResponseDTO(Boolean isSuccess, String message, T data) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.data = data;
  }

  public boolean getIsSuccess() {
    return this.isSuccess;
  }

  public String getMessage() {
    return this.message;
  }

  public T getData() {
    return this.data;
  }
}
