package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.FlightEntity;

@Repository
public interface FlightRepository extends JpaRepository<FlightEntity, String> {
}
