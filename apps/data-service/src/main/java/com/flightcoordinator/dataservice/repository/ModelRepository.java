package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.ModelEntity;

@Repository
public interface ModelRepository extends JpaRepository<ModelEntity, String> {
}
