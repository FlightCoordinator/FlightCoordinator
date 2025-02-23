package com.flightcoordinator.authservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.authservice.entity.TokenEntity;
import com.flightcoordinator.authservice.entity.UserEntity;

@Repository
public interface TokenRepository extends JpaRepository<TokenEntity, String> {
  Optional<TokenEntity> findByTokenValue(String tokenValue);

  List<TokenEntity> findByAssociatedUser(UserEntity associatedUser);
}
