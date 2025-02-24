package com.flightcoordinator.authservice.exception;

import java.util.ArrayList;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException.Forbidden;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.flightcoordinator.authservice.constants.Messages;
import com.flightcoordinator.authservice.entity.CustomResponseEntity;
import com.flightcoordinator.authservice.helpers.ResponseHelper;

import io.jsonwebtoken.JwtException;

@ControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(AppError.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleAppError(AppError exception) {
    boolean isNotFound = exception.getStatus() == HttpStatus.NOT_FOUND.value();
    return ResponseHelper.generateResponse(
        exception.getStatus(),
        isNotFound,
        exception.getMessage(),
        isNotFound ? new ArrayList<>() : null);
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleEnumValidationError(
      MethodArgumentTypeMismatchException exception) {
    return ResponseHelper.generateResponse(
        HttpStatus.BAD_REQUEST.value(),
        false,
        Messages.ENUM_VALIDATION_EXCEPTION_RESPONSE,
        null);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleIllegalArgumentException(
      IllegalArgumentException exception) {
    return ResponseHelper.generateResponse(
        HttpStatus.BAD_REQUEST.value(),
        false,
        Messages.ILLEGAL_ARGUMENT_EXCEPTION_RESPONSE,
        null);
  }

  @ExceptionHandler(OptimisticLockingFailureException.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleOptimisticLockingFailureException(
      OptimisticLockingFailureException exception) {
    return ResponseHelper.generateResponse(
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        false,
        Messages.OPTIMISTIC_LOCKING_FAILURE_EXCEPTION_MESSAGE,
        null);
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleAuthenticationException(AuthenticationException exception) {
    return ResponseHelper.generateResponse(
        HttpStatus.UNAUTHORIZED.value(),
        false,
        Messages.AUTHENTICATION_EXCEPTION_MESSAGE,
        null);
  }

  @ExceptionHandler(InternalAuthenticationServiceException.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleInternalAuthenticationServiceException(
      InternalAuthenticationServiceException exception) {
    return ResponseHelper.generateResponse(
        HttpStatus.UNAUTHORIZED.value(),
        false,
        Messages.AUTHENTICATION_EXCEPTION_MESSAGE,
        null);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleBadCredentialsException(BadCredentialsException exception) {
    return ResponseHelper.generateResponse(
        HttpStatus.UNAUTHORIZED.value(),
        false,
        Messages.AUTHENTICATION_EXCEPTION_MESSAGE,
        null);
  }

  @ExceptionHandler(Forbidden.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleForbiddenException(Forbidden exception) {
    return ResponseHelper.generateResponse(
        HttpStatus.FORBIDDEN.value(),
        false,
        Messages.AUTHENTICATION_EXCEPTION_MESSAGE,
        null);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleDataIntegrityViolationException(
      DataIntegrityViolationException ex) {
    return ResponseHelper.generateResponse(
        HttpStatus.FORBIDDEN.value(),
        false,
        Messages.DATA_INTEGRITY_VIOLATION_EXCEPTION_MESSAGE,
        null);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleConstrainViolationException(
      ConstraintViolationException ex) {
    return ResponseHelper.generateResponse(
        HttpStatus.FORBIDDEN.value(),
        false,
        Messages.CONSTRAINT_VIOLATION_EXCEPTION_MESSAGE,
        null);
  }

  @ExceptionHandler(JwtException.class)
  public ResponseEntity<CustomResponseEntity<Object>> handleJwtException(
      DataIntegrityViolationException ex) {
    return ResponseHelper.generateResponse(
        HttpStatus.FORBIDDEN.value(),
        false,
        Messages.DATA_INTEGRITY_VIOLATION_EXCEPTION_MESSAGE,
        null);
  }
}
