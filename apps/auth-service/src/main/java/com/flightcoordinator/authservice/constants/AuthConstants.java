package com.flightcoordinator.authservice.constants;

import java.util.Arrays;
import java.util.List;

public class AuthConstants {
  private static final long ONE_HOUR = 3600000; // in ms
  public static long ACCESS_TOKEN_EXP = ONE_HOUR / 4; // 15 minutes
  public static long REFRESH_TOKEN_EXP = ONE_HOUR * 4; // 4 hours

  // "http://localhost:3000/", "http://localhost:8081/"

  public static List<String> ALLOWED_ORIGINS = Arrays.asList("*");
  public static List<String> ALLOWED_METHODS = Arrays.asList("POST");
  public static List<String> ALLOWED_HEADERS = Arrays.asList("Authorization", "Content-Type");
}
