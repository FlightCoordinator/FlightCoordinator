package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.ModelDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.entity.ModelEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.ModelRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class ModelService {
  @Autowired
  private ModelRepository modelRepository;

  public ModelDTO getSingleModelById(EntityIdDTO entityIdDTO) {
    ModelEntity model = modelRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    ModelDTO modelDTO = ObjectMapper.toModelDTO(model);
    return modelDTO;
  }

  public List<ModelDTO> getMultipleModelById(List<EntityIdDTO> entityIdDTOs) {
    List<ModelEntity> models = modelRepository.findAllById(entityIdDTOs.stream().map(
        entityId -> entityId.getId()).collect(Collectors.toList()));
    if (models.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<ModelDTO> modelDTOs = models.stream().map(ObjectMapper::toModelDTO).collect(Collectors.toList());
    return modelDTOs;
  }

  public List<ModelDTO> getAllModels() {
    List<ModelEntity> models = modelRepository.findAll();
    if (models.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<ModelDTO> modelDTOs = models.stream().map(ObjectMapper::toModelDTO).collect(Collectors.toList());
    return modelDTOs;
  }

  public void createModel(ModelDTO newModelDTO) {
    ModelEntity modelEntity = new ModelEntity();
    modelEntity.setManufacturer(newModelDTO.getManufacturer());
    modelEntity.setPlaneIdentifier(newModelDTO.getPlaneIdentifier());
    modelEntity.setModelName(newModelDTO.getModelName());
    modelEntity.setCertifier(newModelDTO.getCertifier());
    modelEntity.setCertificationStatus(newModelDTO.getCertificationStatus());
    modelEntity.setNoiseCategory(newModelDTO.getNoiseCategory());
    modelEntity.setFuelCapacity(newModelDTO.getFuelCapacity());
    modelEntity.setFuelEfficiency(newModelDTO.getFuelEfficiency());
    modelEntity.setMaxPassengerCapacity(newModelDTO.getMaxPassengerCapacity());
    modelEntity.setMaxCargoCapacity(newModelDTO.getMaxCargoCapacity());
    modelEntity.setEmptyWeight(newModelDTO.getEmptyWeight());
    modelEntity.setTailHeight(newModelDTO.getTailHeight());
    modelEntity.setWingSpan(newModelDTO.getWingSpan());
    modelEntity.setEngineType(newModelDTO.getEngineType());
    modelEntity.setEngineCount(newModelDTO.getEngineCount());
    modelEntity.setThrustPerEngine(newModelDTO.getThrustPerEngine());
    modelEntity.setMaxCrosswindComp(newModelDTO.getMaxCrosswindComp());
    modelEntity.setRequiredRunwayLength(newModelDTO.getRequiredRunwayLength());
    modelEntity.setRequiredRunwayWidth(newModelDTO.getRequiredRunwayWidth());
    modelEntity.setMinRotationRadius(newModelDTO.getMinRotationRadius());
    modelEntity.setCruiseSpeed(newModelDTO.getCruiseSpeed());
    modelEntity.setMaxSpeed(newModelDTO.getMaxSpeed());
    modelEntity.setStallSpeed(newModelDTO.getStallSpeed());
    modelEntity.setMaxAltitude(newModelDTO.getMaxAltitude());
    modelEntity.setClimbRate(newModelDTO.getClimbRate());
    modelEntity.setDescentRate(newModelDTO.getDescentRate());
    modelEntity.setMaxFlightRange(newModelDTO.getMaxFlightRange());
    modelEntity.setHasWeatherRadar(newModelDTO.getHasWeatherRadar());
    modelEntity.setHasAutopilot(newModelDTO.getHasAutopilot());
    modelEntity.setHasFlyByWire(newModelDTO.getHasFlyByWire());
    modelEntity.setHasFireSupression(newModelDTO.getHasFireSupression());
    modelEntity.setGpsEnabled(newModelDTO.getGpsEnabled());

    modelRepository.save(modelEntity);
  }

  public void updateModel(ModelDTO updatedModelDTO) {
    ModelEntity existingModel = modelRepository.findById(updatedModelDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    existingModel.setManufacturer(updatedModelDTO.getManufacturer());
    existingModel.setPlaneIdentifier(updatedModelDTO.getPlaneIdentifier());
    existingModel.setModelName(updatedModelDTO.getModelName());
    existingModel.setCertifier(updatedModelDTO.getCertifier());
    existingModel.setCertificationStatus(updatedModelDTO.getCertificationStatus());
    existingModel.setNoiseCategory(updatedModelDTO.getNoiseCategory());
    existingModel.setFuelCapacity(updatedModelDTO.getFuelCapacity());
    existingModel.setFuelEfficiency(updatedModelDTO.getFuelEfficiency());
    existingModel.setMaxPassengerCapacity(updatedModelDTO.getMaxPassengerCapacity());
    existingModel.setMaxCargoCapacity(updatedModelDTO.getMaxCargoCapacity());
    existingModel.setEmptyWeight(updatedModelDTO.getEmptyWeight());
    existingModel.setTailHeight(updatedModelDTO.getTailHeight());
    existingModel.setWingSpan(updatedModelDTO.getWingSpan());
    existingModel.setEngineType(updatedModelDTO.getEngineType());
    existingModel.setEngineCount(updatedModelDTO.getEngineCount());
    existingModel.setThrustPerEngine(updatedModelDTO.getThrustPerEngine());
    existingModel.setMaxCrosswindComp(updatedModelDTO.getMaxCrosswindComp());
    existingModel.setRequiredRunwayLength(updatedModelDTO.getRequiredRunwayLength());
    existingModel.setRequiredRunwayWidth(updatedModelDTO.getRequiredRunwayWidth());
    existingModel.setMinRotationRadius(updatedModelDTO.getMinRotationRadius());
    existingModel.setCruiseSpeed(updatedModelDTO.getCruiseSpeed());
    existingModel.setMaxSpeed(updatedModelDTO.getMaxSpeed());
    existingModel.setStallSpeed(updatedModelDTO.getStallSpeed());
    existingModel.setMaxAltitude(updatedModelDTO.getMaxAltitude());
    existingModel.setClimbRate(updatedModelDTO.getClimbRate());
    existingModel.setDescentRate(updatedModelDTO.getDescentRate());
    existingModel.setMaxFlightRange(updatedModelDTO.getMaxFlightRange());
    existingModel.setHasWeatherRadar(updatedModelDTO.getHasWeatherRadar());
    existingModel.setHasAutopilot(updatedModelDTO.getHasAutopilot());
    existingModel.setHasFlyByWire(updatedModelDTO.getHasFlyByWire());
    existingModel.setHasFireSupression(updatedModelDTO.getHasFireSupression());
    existingModel.setGpsEnabled(updatedModelDTO.getGpsEnabled());

    modelRepository.save(existingModel);
  }

  public void deleteModel(EntityIdDTO entityIdDTO) {
    ModelEntity existingModel = modelRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    modelRepository.delete(existingModel);
  }

  public Boolean doesSingleModelExist(ModelEntity model) {
    Optional<ModelEntity> modelFound = modelRepository.findById(model.getId());
    return modelFound.isPresent();
  }

  public Boolean doesMultipleModelsExist(List<ModelEntity> models) {
    List<String> ids = new ArrayList<>();
    models.forEach(model -> ids.add(model.getId()));
    List<ModelEntity> modelsFound = modelRepository.findAllById(ids);
    if (models.size() != modelsFound.size()) {
      return false;
    }
    return modelsFound.isEmpty();
  }
}
