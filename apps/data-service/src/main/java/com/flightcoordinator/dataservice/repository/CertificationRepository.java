package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.CertificationEntity;

@Repository
public interface CertificationRepository extends JpaRepository<CertificationEntity, String> {
}
