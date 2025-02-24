package com.flightcoordinator.dataservice.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.flightcoordinator.dataservice.constants.AuthConstants;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Autowired
  private CustomAuthManager authManager;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    return httpSecurity
        .csrf(customizer -> customizer.disable())
        .headers(headers -> headers.contentTypeOptions(contentTypeOptions -> contentTypeOptions.disable()))
        .authorizeHttpRequests(request -> request
            .requestMatchers("/api/*/auth/register", "/api/*/auth/login").permitAll()
            .anyRequest().access((authentication, context) -> authManager.check(authentication, context)))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(AuthConstants.ALLOWED_ORIGINS);
    configuration.setAllowedMethods(AuthConstants.ALLOWED_METHODS);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
