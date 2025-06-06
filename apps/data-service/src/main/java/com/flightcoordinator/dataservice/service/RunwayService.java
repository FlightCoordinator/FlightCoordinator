package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.RunwayDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.entity.AirportEntity;
import com.flightcoordinator.dataservice.entity.RunwayEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.AirportRepository;
import com.flightcoordinator.dataservice.repository.RunwayRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class RunwayService {
  @Autowired
  private RunwayRepository runwayRepository;

  @Autowired
  private AirportRepository airportRepository;

  public RunwayDTO getSingleRunwayById(EntityIdDTO entityIdDTO) {
    RunwayEntity runway = runwayRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    RunwayDTO runwayDTO = ObjectMapper.toRunwayDTO(runway);
    return runwayDTO;
  }

  public List<RunwayDTO> getMultipleRunwaysById(List<EntityIdDTO> entityIdDTOs) {
    List<RunwayEntity> runways = runwayRepository.findAllById(entityIdDTOs.stream().map(
        entityId -> entityId.getId()).collect(Collectors.toList()));
    if (runways.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<RunwayDTO> runwayDTOs = runways.stream().map(ObjectMapper::toRunwayDTO).collect(Collectors.toList());
    return runwayDTOs;
  }

  public List<RunwayDTO> getAllRunways() {
    List<RunwayEntity> runways = runwayRepository.findAll();
    if (runways.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<RunwayDTO> runwayDTOs = runways.stream().map(ObjectMapper::toRunwayDTO).collect(Collectors.toList());
    return runwayDTOs;
  }

  public void createRunway(RunwayDTO newRunwayDTO) {
    AirportEntity airportEntity = airportRepository.findById(newRunwayDTO.getAirportId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    RunwayEntity newRunwayEntity = new RunwayEntity();
    newRunwayEntity.setRunwayNumber(newRunwayDTO.getRunwayNumber());
    newRunwayEntity.setAirport(airportEntity);
    newRunwayEntity.setLength(newRunwayDTO.getLength());
    newRunwayEntity.setWidth(newRunwayDTO.getWidth());
    newRunwayEntity.setSurfaceType(newRunwayDTO.getSurfaceType());
    newRunwayEntity.setMaxWeightCapacity(newRunwayDTO.getMaxWeightCapacity());
    newRunwayEntity.setHasMarkings(newRunwayDTO.getHasMarkings());
    newRunwayEntity.setHasLighting(newRunwayDTO.getHasLighting());
    newRunwayEntity.setHasILS(newRunwayDTO.getHasILS());
    newRunwayEntity.setHasSafetyArea(newRunwayDTO.getHasSafetyArea());
    newRunwayEntity.setVisualApproachAid(newRunwayDTO.getVisualApproachAid());
    newRunwayEntity.setAltitude(newRunwayDTO.getAltitude());
    newRunwayEntity.setStatus(newRunwayDTO.getStatus());
    newRunwayEntity.setCrosswindLimit(newRunwayDTO.getCrosswindLimit());

    runwayRepository.save(newRunwayEntity);
  }

  public void updateRunway(RunwayDTO updatedRunwayDTO) {
    AirportEntity airportEntity = airportRepository.findById(updatedRunwayDTO.getAirportId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    RunwayEntity existingRunway = runwayRepository.findById(updatedRunwayDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    existingRunway.setRunwayNumber(updatedRunwayDTO.getRunwayNumber());
    existingRunway.setAirport(airportEntity);
    existingRunway.setLength(updatedRunwayDTO.getLength());
    existingRunway.setWidth(updatedRunwayDTO.getWidth());
    existingRunway.setSurfaceType(updatedRunwayDTO.getSurfaceType());
    existingRunway.setMaxWeightCapacity(updatedRunwayDTO.getMaxWeightCapacity());
    existingRunway.setHasMarkings(updatedRunwayDTO.getHasMarkings());
    existingRunway.setHasLighting(updatedRunwayDTO.getHasLighting());
    existingRunway.setHasILS(updatedRunwayDTO.getHasILS());
    existingRunway.setHasSafetyArea(updatedRunwayDTO.getHasSafetyArea());
    existingRunway.setVisualApproachAid(updatedRunwayDTO.getVisualApproachAid());
    existingRunway.setAltitude(updatedRunwayDTO.getAltitude());
    existingRunway.setStatus(updatedRunwayDTO.getStatus());
    existingRunway.setCrosswindLimit(updatedRunwayDTO.getCrosswindLimit());

    runwayRepository.save(existingRunway);
  }

  public void deleteRunway(EntityIdDTO entityIdDTO) {
    RunwayEntity existingRunway = runwayRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    runwayRepository.delete(existingRunway);
  }

  public Boolean doesSingleRunwayExist(RunwayEntity runway) {
    Optional<RunwayEntity> runwayFound = runwayRepository.findById(runway.getId());
    return runwayFound.isPresent();
  }

  public Boolean doesMultipleRunwaysExist(List<RunwayEntity> runways) {
    List<String> ids = new ArrayList<>();
    runways.forEach(runway -> ids.add(runway.getId()));
    List<RunwayEntity> runwaysFound = runwayRepository.findAllById(ids);
    if (runways.size() != runwaysFound.size()) {
      return false;
    }
    return runwaysFound.isEmpty();
  }
}
