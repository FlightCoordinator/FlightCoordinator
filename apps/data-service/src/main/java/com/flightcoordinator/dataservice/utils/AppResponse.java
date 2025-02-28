package com.flightcoordinator.dataservice.utils;

import org.springframework.http.ResponseEntity;

import com.flightcoordinator.dataservice.dto.misc.CustomResponseDTO;

public class AppResponse<T> {
  public static <T> ResponseEntity<CustomResponseDTO<T>> generateResponse(
      int status,
      boolean isSuccess,
      String message,
      T data) {
    return ResponseEntity.status(status).body(new CustomResponseDTO<>(isSuccess, message, data));
  }
}
