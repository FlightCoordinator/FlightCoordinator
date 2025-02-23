package com.flightcoordinator.authservice.helpers;

import org.springframework.http.ResponseEntity;

import com.flightcoordinator.authservice.entity.CustomResponseEntity;

public class ResponseHelper<T> {
  public static <T> ResponseEntity<CustomResponseEntity<T>> generateResponse(
      int status,
      boolean isSuccess,
      String message,
      T data) {
    return ResponseEntity.status(status).body(new CustomResponseEntity<>(isSuccess, message, data));
  }
}
