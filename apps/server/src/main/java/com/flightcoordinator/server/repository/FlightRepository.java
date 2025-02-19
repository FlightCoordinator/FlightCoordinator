package com.flightcoordinator.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.server.entity.FlightEntity;

@Repository
public interface FlightRepository extends JpaRepository<FlightEntity, String> {
}
