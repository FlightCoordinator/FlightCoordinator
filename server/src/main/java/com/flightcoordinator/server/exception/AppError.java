package com.flightcoordinator.server.exception;

public class AppError extends RuntimeException {
  private final int status;

  public AppError(String message, int status) {
    super(message);
    this.status = status;
  }

  public int getStatus() {
    return this.status;
  }
}
