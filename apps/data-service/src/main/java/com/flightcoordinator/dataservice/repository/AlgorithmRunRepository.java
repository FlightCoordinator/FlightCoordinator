package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.AlgorithmRunEntity;

@Repository
public interface AlgorithmRunRepository extends JpaRepository<AlgorithmRunEntity, String> {
}
