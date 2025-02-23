package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.AirportEntity;

@Repository
public interface AirportRepository extends JpaRepository<AirportEntity, String> {
}
