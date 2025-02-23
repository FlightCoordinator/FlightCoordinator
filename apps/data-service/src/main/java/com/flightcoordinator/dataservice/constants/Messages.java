package com.flightcoordinator.dataservice.constants;

public class Messages {
  public static String CREATE_RESPONSE = "Resource created successfully";
  public static String UPDATE_RESPONSE = "Resource updated successfully";
  public static String DELETE_RESPONSE = "Resource deleted successfully";

  public static String ENUM_VALIDATION_EXCEPTION_RESPONSE = "Invalid value provided. Please choose a valid option";
  public static String ILLEGAL_ARGUMENT_EXCEPTION_RESPONSE = "Invalid input. Please check your request and try again.";
  public static String OPTIMISTIC_LOCKING_FAILURE_EXCEPTION_MESSAGE = "This resource has been modified bu another process. Please refresh the page and try again.";
  public static String AUTHENTICATION_EXCEPTION_MESSAGE = "Authentication failed. Please try again.";
  public static String DATA_INTEGRITY_VIOLATION_EXCEPTION_MESSAGE = "Please delete any resources that reference this resource first.";
  public static String CONSTRAINT_VIOLATION_EXCEPTION_MESSAGE = "Some required fields are invalid or missing. Please try again.";
}
