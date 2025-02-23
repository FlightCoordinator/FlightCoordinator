package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.AlgorithmResultEntity;

@Repository
public interface AlgorithmResultRepository extends JpaRepository<AlgorithmResultEntity, String> {
}
