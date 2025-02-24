package com.flightcoordinator.authservice.helpers;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.flightcoordinator.authservice.constants.AuthConstants;
import com.flightcoordinator.authservice.enums.TokenType;
import com.flightcoordinator.authservice.exception.AppError;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.InvalidKeyException;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenHelper {
  @Value("${server.keys.access_key}")
  private String ACCESS_SECRET;

  @Value("${server.keys.refresh_key}")
  private String REFRESH_SECRET;

  public String generateAccessToken(String email) {
    return generateToken(email, TokenType.ACCESS);
  }

  public String generateRefreshToken(String email) {
    return generateToken(email, TokenType.REFRESH);
  }

  private String generateToken(String email, TokenType tokenType) {
    try {
      Map<String, Object> claims = new HashMap<>();

      return Jwts.builder()
          .claims().add(claims)
          .subject(email)
          .issuedAt(new Date(System.currentTimeMillis()))
          .expiration(getExpiration(tokenType))
          .and()
          .signWith(getKey(tokenType))
          .compact();
    } catch (InvalidKeyException e) {
      throw new AppError(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(), HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
  }

  private SecretKey getKey(TokenType tokenType) {
    if (tokenType == TokenType.ACCESS) {
      byte[] keyBytes = Decoders.BASE64.decode(ACCESS_SECRET);
      return Keys.hmacShaKeyFor(keyBytes);
    }
    byte[] keyBytes = Decoders.BASE64.decode(REFRESH_SECRET);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  private Date getExpiration(TokenType tokenType) {
    if (tokenType == TokenType.ACCESS) {
      return new Date(System.currentTimeMillis() + AuthConstants.ACCESS_TOKEN_EXP);
    }
    return new Date(System.currentTimeMillis() + AuthConstants.REFRESH_TOKEN_EXP);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimResolver, TokenType tokenType) {
    final Claims claims = extractAllClaims(token, tokenType);
    return claimResolver.apply(claims);
  }

  private Claims extractAllClaims(String token, TokenType tokenType) {
    try {
      return Jwts
          .parser()
          .verifyWith(getKey(tokenType))
          .build()
          .parseSignedClaims(token)
          .getPayload();
    } catch (JwtException | IllegalArgumentException e) {
      throw new AppError(HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
    }
  }

  private Date extractExpiration(String token, TokenType tokenType) {
    return extractClaim(token, Claims::getExpiration, tokenType);
  }

  public boolean isTokenExpired(String token, TokenType tokenType) {
    return extractExpiration(token, tokenType).before(new Date());
  }

  public String extractEmail(String token, TokenType tokenType) {
    return extractClaim(token, Claims::getSubject, tokenType);
  }

  public boolean isTokenValid(String token, String rawEmail, TokenType tokenType) {
    final String savedEmail = extractEmail(token, tokenType);
    return savedEmail.equals(rawEmail) && !isTokenExpired(token, tokenType);
  }
}
