package com.flightcoordinator.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.server.entity.RunwayEntity;
import com.flightcoordinator.server.exception.AppError;
import com.flightcoordinator.server.repository.RunwayRepository;

@Service
public class RunwayService {
  @Autowired
  private RunwayRepository runwayRepository;

  public RunwayEntity getSingleRunwayById(String runwayId) {
    Optional<RunwayEntity> runway = runwayRepository.findById(runwayId);
    return runway.orElseThrow(() -> new AppError("notFound.runway", HttpStatus.NOT_FOUND.value()));
  }

  public List<RunwayEntity> getMultipleRunwaysById(List<String> runwayIds) {
    List<RunwayEntity> runways = runwayRepository.findAllById(runwayIds);
    if (runways.isEmpty()) {
      throw new AppError("notFound.runway", HttpStatus.NOT_FOUND.value());
    }
    return runways;
  }

  public List<RunwayEntity> getAllRunways() {
    List<RunwayEntity> runways = runwayRepository.findAll();
    if (runways.isEmpty()) {
      throw new AppError("notFound.runway", HttpStatus.NOT_FOUND.value());
    }
    return runways;
  }

  public void createRunway(RunwayEntity newRunway) {
    runwayRepository.save(newRunway);
  }

  public void updateRunway(String runwayId, RunwayEntity updatedRunway) {
    RunwayEntity existingRunway = getSingleRunwayById(runwayId);

    existingRunway.setLength(updatedRunway.getLength());
    existingRunway.setWidth(updatedRunway.getWidth());
    existingRunway.setSurfaceType(updatedRunway.getSurfaceType());
    existingRunway.setMaxWeightCapacity(updatedRunway.getMaxWeightCapacity());
    existingRunway.setOrientation(updatedRunway.getOrientation());

    runwayRepository.save(existingRunway);
  }

  public void deleteRunway(String runwayId) {
    RunwayEntity existingRunway = getSingleRunwayById(runwayId);
    runwayRepository.delete(existingRunway);
  }

  public Boolean doesSingleRunwayExist(RunwayEntity runway) {
    String runwayId = runway.getId();
    Optional<RunwayEntity> runwayFound = runwayRepository.findById(runwayId);
    return runwayFound.isPresent();
  }

  public Boolean doesMultipleRunwaysExist(List<RunwayEntity> runways) {
    List<String> runwayIds = new ArrayList<>();
    runways.forEach(runway -> runwayIds.add(runway.getId()));
    List<RunwayEntity> runwaysFound = runwayRepository.findAllById(runwayIds);
    if (runways.size() != runwaysFound.size()) {
      return false;
    }
    return runwaysFound.isEmpty();
  }
}
