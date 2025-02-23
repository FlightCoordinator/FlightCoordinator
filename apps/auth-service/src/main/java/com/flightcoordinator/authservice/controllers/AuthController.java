package com.flightcoordinator.authservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightcoordinator.authservice.dto.AuthValidationDTO;
import com.flightcoordinator.authservice.dto.LoginDTO;
import com.flightcoordinator.authservice.dto.RegisterDTO;
import com.flightcoordinator.authservice.dto.TokenDTO;
import com.flightcoordinator.authservice.dto.UserDetailsDTO;
import com.flightcoordinator.authservice.entity.CustomResponseEntity;
import com.flightcoordinator.authservice.helpers.ResponseHelper;
import com.flightcoordinator.authservice.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/${server.api-version}/auth")
@Tag(name = "Auth Controller", description = "Endpoints authentication and authorization operations.")
public class AuthController {
  @Autowired
  private AuthService authService;

  @PostMapping("/register")
  @Operation(summary = "Register new user", description = "Creates a new user entity.")
  public ResponseEntity<CustomResponseEntity<Object>> register(@RequestBody RegisterDTO registerDetails) {
    authService.register(registerDetails);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), null);
  }

  @PostMapping("/login")
  @CrossOrigin(origins = "${server.uris.webclient}", allowCredentials = "true")
  @Operation(summary = "Login an existing user", description = "Login an existing user.")
  public ResponseEntity<CustomResponseEntity<Object>> login(@RequestBody LoginDTO loginDetails,
      HttpServletResponse response) {
    TokenDTO tokens = authService.login(loginDetails);
    response.addCookie(tokens.getAccessToken());
    response.addCookie(tokens.getRefreshToken());
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), null);
  }

  @PostMapping("/logout")
  @CrossOrigin(origins = "${server.uris.webclient}", allowCredentials = "true")
  @Operation(summary = "Logout an existing user", description = "Logout an existing user.")
  public ResponseEntity<CustomResponseEntity<Object>> logout(HttpServletRequest request, HttpServletResponse response) {
    Cookie[] cookies = request.getCookies();
    TokenDTO invalidatedTokens = authService.logout(cookies);
    response.addCookie(invalidatedTokens.getAccessToken());
    response.addCookie(invalidatedTokens.getRefreshToken());
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), null);
  }

  // public ResponseEntity<CustomResponseEntity<String>> resetPassword() {
  // }

  @PostMapping("/validate")
  @CrossOrigin(origins = "${server.uris.webclient}", allowCredentials = "true")
  @Operation(summary = "Validates if user is authenticated", description = "Validates if user is authenticated.")
  public ResponseEntity<CustomResponseEntity<AuthValidationDTO>> validate(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    AuthValidationDTO validationDTO = authService.validate(cookies);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), validationDTO);
  }

  @PostMapping("/getUserDetails")
  @CrossOrigin(origins = "${server.uris.webclient}", allowCredentials = "true")
  @Operation(summary = "Retrieves user details", description = "Retrieves user details.")
  public ResponseEntity<CustomResponseEntity<UserDetailsDTO>> getUserDetails(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    UserDetailsDTO userDetails = authService.getUserDetails(cookies);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), userDetails);
  }

  @PostMapping("/rotateToken")
  @CrossOrigin(origins = "${server.uris.webclient}", allowCredentials = "true")
  @Operation(summary = "Issues a new access token", description = "Issues a new access token with existing refresh token.")
  public ResponseEntity<CustomResponseEntity<String>> rotateToken(HttpServletRequest request,
      HttpServletResponse response) {
    Cookie[] cookies = request.getCookies();
    TokenDTO newTokens = authService.rotateToken(cookies);
    response.addCookie(newTokens.getAccessToken());
    response.addCookie(newTokens.getRefreshToken());
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), null);
  }
}
