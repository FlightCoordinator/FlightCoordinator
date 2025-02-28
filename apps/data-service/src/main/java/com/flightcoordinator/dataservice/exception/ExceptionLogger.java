package com.flightcoordinator.dataservice.exception;

public class ExceptionLogger {
  public static void log(Exception exception) {
    System.out.println("An error ocurred");
    System.out.println("  Message: " + exception.getMessage());
    System.out.println("  Cause: " + exception.getCause());
    System.out.println("  Stack trace: " + exception.getStackTrace().toString());
  }
}
