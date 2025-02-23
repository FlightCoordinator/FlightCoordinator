package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.RunwayEntity;

@Repository
public interface RunwayRepository extends JpaRepository<RunwayEntity, String> {
}
