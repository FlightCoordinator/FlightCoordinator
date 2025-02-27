package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.PlaneDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.entity.AirportEntity;
import com.flightcoordinator.dataservice.entity.ModelEntity;
import com.flightcoordinator.dataservice.entity.PlaneEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.AirportRepository;
import com.flightcoordinator.dataservice.repository.ModelRepository;
import com.flightcoordinator.dataservice.repository.PlaneRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class PlaneService {
  @Autowired
  private PlaneRepository planeRepository;

  @Autowired
  private ModelRepository modelRepository;

  @Autowired
  private AirportRepository airportRepository;

  public PlaneDTO getSinglePlaneById(EntityIdDTO entityIdDTO) {
    PlaneEntity plane = planeRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    PlaneDTO planeDTO = ObjectMapper.toPlaneDTO(plane);
    return planeDTO;
  }

  public List<PlaneDTO> getMultiplePlaneById(List<EntityIdDTO> entityIdDTOs) {
    List<PlaneEntity> planes = planeRepository.findAllById(entityIdDTOs.stream().map(
        entityId -> entityId.getId()).collect(Collectors.toList()));
    if (planes.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<PlaneDTO> planeDTOs = planes.stream().map(ObjectMapper::toPlaneDTO).collect(Collectors.toList());
    return planeDTOs;
  }

  public List<PlaneDTO> getAllPlanes() {
    List<PlaneEntity> planes = planeRepository.findAll();
    if (planes.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<PlaneDTO> planeDTOs = planes.stream().map(ObjectMapper::toPlaneDTO).collect(Collectors.toList());
    return planeDTOs;
  }

  public void createPlane(PlaneDTO newPlaneDTO) {
    AirportEntity airportEntity = airportRepository.findById(newPlaneDTO.getCurrentLocationId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    ModelEntity modelEntity = modelRepository.findById(newPlaneDTO.getModelId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    PlaneEntity planeEntity = new PlaneEntity();
    planeEntity.setModel(modelEntity);
    planeEntity.setTailNumber(newPlaneDTO.getTailNumber());
    planeEntity.setNextMaintenanceDate(newPlaneDTO.getNextMaintenanceDate());
    planeEntity.setCyclesSinceLastMaintenance(newPlaneDTO.getCyclesSinceLastMaintenance());
    planeEntity.setRetirementDate(newPlaneDTO.getRetirementDate());
    planeEntity.setEngineHours(newPlaneDTO.getEngineHours());
    planeEntity.setCurrentWearLevel(newPlaneDTO.getCurrentWearLevel());
    planeEntity.setTotalFlightHours(newPlaneDTO.getTotalFlightHours());
    planeEntity.setFuelAmount(newPlaneDTO.getFuelAmount());
    planeEntity.setPlaneStatus(newPlaneDTO.getPlaneStatus());
    planeEntity.setCurrentLocation(airportEntity);
    planeEntity.setAircraftOperator(newPlaneDTO.getAircraftOperator());

    planeRepository.save(planeEntity);
  }

  public void updatePlane(PlaneDTO updatedPlaneDTO) {
    ModelEntity modelEntity = modelRepository.findById(updatedPlaneDTO.getModelId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    AirportEntity airportEntity = airportRepository.findById(updatedPlaneDTO.getCurrentLocationId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    PlaneEntity existingPlane = planeRepository.findById(updatedPlaneDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    existingPlane.setModel(modelEntity);
    existingPlane.setTailNumber(updatedPlaneDTO.getTailNumber());
    existingPlane.setNextMaintenanceDate(updatedPlaneDTO.getNextMaintenanceDate());
    existingPlane.setCyclesSinceLastMaintenance(updatedPlaneDTO.getCyclesSinceLastMaintenance());
    existingPlane.setRetirementDate(updatedPlaneDTO.getRetirementDate());
    existingPlane.setEngineHours(updatedPlaneDTO.getEngineHours());
    existingPlane.setCurrentWearLevel(updatedPlaneDTO.getCurrentWearLevel());
    existingPlane.setTotalFlightHours(updatedPlaneDTO.getTotalFlightHours());
    existingPlane.setFuelAmount(updatedPlaneDTO.getFuelAmount());
    existingPlane.setPlaneStatus(updatedPlaneDTO.getPlaneStatus());
    existingPlane.setCurrentLocation(airportEntity);
    existingPlane.setAircraftOperator(updatedPlaneDTO.getAircraftOperator());

    planeRepository.save(existingPlane);
  }

  public void deletePlane(EntityIdDTO entityIdDTO) {
    PlaneEntity existingPlane = planeRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    planeRepository.delete(existingPlane);
  }

  public Boolean doesSinglePlaneExist(PlaneEntity plane) {
    Optional<PlaneEntity> planeFound = planeRepository.findById(plane.getId());
    return planeFound.isPresent();
  }

  public Boolean doesMultiplePlanesExist(List<PlaneEntity> planes) {
    List<String> ids = new ArrayList<>();
    planes.forEach(plane -> ids.add(plane.getId()));
    List<PlaneEntity> planesFound = planeRepository.findAllById(ids);
    if (planes.size() != planesFound.size()) {
      return false;
    }
    return planesFound.isEmpty();
  }
}
