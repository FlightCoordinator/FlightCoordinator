package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.FlightPlanEntity;

@Repository
public interface FlightPlanRepository extends JpaRepository<FlightPlanEntity, String> {
}
