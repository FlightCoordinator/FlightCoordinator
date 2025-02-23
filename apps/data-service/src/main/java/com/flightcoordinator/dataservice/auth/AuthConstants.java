package com.flightcoordinator.dataservice.auth;

import java.util.Arrays;
import java.util.List;

public class AuthConstants {
  public static List<String> ALLOWED_ORIGINS = Arrays.asList("http://localhost:3000/");
  public static List<String> ALLOWED_METHODS = Arrays.asList("GET", "POST", "PATCH", "DELETE");
}
