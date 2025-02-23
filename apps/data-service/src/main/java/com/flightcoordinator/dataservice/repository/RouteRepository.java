package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.RouteEntity;

@Repository
public interface RouteRepository extends JpaRepository<RouteEntity, String> {
}
