package com.flightcoordinator.authservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.flightcoordinator.authservice.dto.AuthValidationDTO;
import com.flightcoordinator.authservice.dto.LoginDTO;
import com.flightcoordinator.authservice.dto.RegisterDTO;
import com.flightcoordinator.authservice.dto.TokenDTO;
import com.flightcoordinator.authservice.dto.UserDetailsDTO;
import com.flightcoordinator.authservice.entity.TokenEntity;
import com.flightcoordinator.authservice.entity.UserEntity;
import com.flightcoordinator.authservice.enums.TokenType;
import com.flightcoordinator.authservice.exception.AppError;
import com.flightcoordinator.authservice.helpers.TokenHelper;
import com.flightcoordinator.authservice.repository.TokenRepository;
import com.flightcoordinator.authservice.repository.UserRepository;

import jakarta.servlet.http.Cookie;

@Service
public class AuthService {
  private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  @Autowired
  private TokenHelper tokenHelper;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private TokenRepository tokenRepository;

  public void register(RegisterDTO userDetails) {
    Optional<UserEntity> user = userRepository.findByEmail(userDetails.getEmail());
    if (user.isPresent()) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    }
    String hashedPassword = passwordEncoder.encode(userDetails.getPassword());

    UserEntity newUserEntity = new UserEntity();
    newUserEntity.setFullName(userDetails.getFullName());
    newUserEntity.setEmail(userDetails.getEmail());
    newUserEntity.setPassword(hashedPassword);
    newUserEntity.setIsActive(true);
    newUserEntity.setIsLocked(false);

    userRepository.save(newUserEntity);
  }

  public TokenDTO login(LoginDTO loginDetails) {
    UserEntity user = userRepository.findByEmail(loginDetails.getEmail())
        .orElseThrow(() -> new AppError(HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value()));

    Boolean isPasswordValid = passwordEncoder.matches(loginDetails.getPassword(), user.getPassword());
    if (!isPasswordValid) {
      throw new AppError(HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
    }

    String accessToken = tokenHelper.generateAccessToken(user.getEmail());
    String refreshToken = tokenHelper.generateRefreshToken(user.getEmail());

    TokenEntity refreshTokenEntity = new TokenEntity();
    refreshTokenEntity.setAssociatedUser(user);
    refreshTokenEntity.setTokenValue(refreshToken);

    tokenRepository.save(refreshTokenEntity);

    Cookie accessTokenCookie = new Cookie("fc_at", accessToken);
    accessTokenCookie.setHttpOnly(true);
    accessTokenCookie.setPath("/");

    Cookie refreshTokenCookie = new Cookie("fc_rt", refreshToken);
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setPath("/");

    TokenDTO tokens = new TokenDTO();
    tokens.setAccessToken(accessTokenCookie);
    tokens.setRefreshToken(refreshTokenCookie);

    return tokens;
  }

  public TokenDTO logout(Cookie[] cookies) {
    UserEntity user = validateTokenAndGetUserEntity(cookies, TokenType.ACCESS);
    clearTokens(user);

    TokenDTO invalidatedTokens = getInvalidatedCookies();

    return invalidatedTokens;
  }

  // public void resetPassword() {
  // }

  public AuthValidationDTO validate(Cookie[] cookies) {
    UserEntity user = validateTokenAndGetUserEntity(cookies, TokenType.ACCESS);
    if (!user.getIsActive() || user.getIsLocked()) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    }
    return new AuthValidationDTO(true);
  }

  public UserDetailsDTO getUserDetails(Cookie[] cookies) {
    UserEntity user = validateTokenAndGetUserEntity(cookies, TokenType.ACCESS);

    UserDetailsDTO userDetails = new UserDetailsDTO();
    userDetails.setFullName(user.getFullName());
    userDetails.setEmail(user.getEmail());
    userDetails.setIsActive(user.getIsActive());
    userDetails.setIsLocked(user.getIsLocked());

    return userDetails;
  }

  public TokenDTO rotateToken(Cookie[] cookies) {
    UserEntity user = validateTokenAndGetUserEntity(cookies, TokenType.REFRESH);

    String newAccessToken = tokenHelper.generateAccessToken(user.getEmail());

    Cookie accessTokenCookie = new Cookie("fc_at", newAccessToken);
    accessTokenCookie.setHttpOnly(true);
    accessTokenCookie.setPath("/");

    TokenDTO newTokens = new TokenDTO();
    newTokens.setAccessToken(accessTokenCookie);
    newTokens.setRefreshToken(accessTokenCookie);

    return newTokens;
  }

  private void clearTokens(UserEntity user) {
    List<TokenEntity> tokens = tokenRepository.findByAssociatedUser(user);
    tokens.forEach(token -> tokenRepository.delete(token));
  }

  private TokenDTO getCookies(Cookie[] cookies, TokenType tokenType) {
    TokenDTO receivedTokens = new TokenDTO();
    receivedTokens.setAccessToken(null);
    receivedTokens.setRefreshToken(null);

    if (cookies == null || cookies.length == 0) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    }
    for (Cookie cookie : cookies) {
      if (cookie.getName().equalsIgnoreCase("fc_at")) {
        receivedTokens.setAccessToken(cookie);
      }
      if (cookie.getName().equalsIgnoreCase("fc_rt")) {
        receivedTokens.setRefreshToken(cookie);
      }
    }
    if (tokenType == TokenType.ACCESS && receivedTokens.getAccessToken() == null) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    }
    if (tokenType == TokenType.REFRESH && receivedTokens.getRefreshToken() == null) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    }
    return receivedTokens;
  }

  private UserEntity validateTokenAndGetUserEntity(Cookie[] cookies, TokenType tokenType) {
    TokenDTO tokens = getCookies(cookies, tokenType);

    if (tokenType == TokenType.ACCESS && tokenHelper.isTokenExpired(tokens.getAccessToken().getValue(), tokenType)) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    }
    if (tokenType == TokenType.REFRESH && tokenHelper.isTokenExpired(tokens.getRefreshToken().getValue(), tokenType)) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    }

    String payload = tokenHelper.extractEmail(
        tokenType == TokenType.ACCESS ? tokens.getAccessToken().getValue() : tokens.getRefreshToken().getValue(),
        tokenType);

    if (payload == null) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    }

    UserEntity user = userRepository.findByEmail(payload)
        .orElseThrow(() -> new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value()));

    if (!tokenHelper.isTokenValid(tokens.getAccessToken().getValue(), user.getEmail(), TokenType.ACCESS)) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    }

    if (tokenType == TokenType.REFRESH) {
      TokenEntity token = tokenRepository.findByTokenValue(tokens.getRefreshToken().getValue())
          .orElseThrow(() -> new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value()));

      if (!tokenHelper.isTokenValid(token.getTokenValue(), payload, tokenType)) {
        throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
      }
    }
    return user;
  }

  private TokenDTO getInvalidatedCookies() {
    Cookie accessTokenCookie = new Cookie("fc_at", null);
    accessTokenCookie.setHttpOnly(true);
    accessTokenCookie.setPath("/");
    accessTokenCookie.setMaxAge(0);

    Cookie refreshTokenCookie = new Cookie("fc_rt", null);
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setMaxAge(0);

    TokenDTO tokens = new TokenDTO();
    tokens.setAccessToken(accessTokenCookie);
    tokens.setRefreshToken(refreshTokenCookie);

    return tokens;
  }
}
