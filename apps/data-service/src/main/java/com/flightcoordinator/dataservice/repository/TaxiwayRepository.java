package com.flightcoordinator.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightcoordinator.dataservice.entity.TaxiwayEntity;

@Repository
public interface TaxiwayRepository extends JpaRepository<TaxiwayEntity, String> {
}
