package com.flightcoordinator.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "algorithm_results")
public class AlgorithmResultsEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String id;
}
