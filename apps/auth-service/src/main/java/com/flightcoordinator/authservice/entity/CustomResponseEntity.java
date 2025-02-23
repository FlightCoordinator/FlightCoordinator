package com.flightcoordinator.authservice.entity;

public class CustomResponseEntity<T> {
  private boolean isSuccess = false;

  private final String message;

  private final T data;

  public CustomResponseEntity(Boolean isSuccess, String message, T data) {
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
