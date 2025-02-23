package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.PlaneEntity;

@Repository
public interface PlaneRepository extends JpaRepository<PlaneEntity, String> {
}
