package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.AlgorithmResultDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.entity.AlgorithmResultEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.AlgorithmResultRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class AlgorithmResultService {
  @Autowired
  private AlgorithmResultRepository algorithmResultRepository;

  public AlgorithmResultDTO getSingleAlgorithmResultById(EntityIdDTO entityIdDTO) {
    AlgorithmResultEntity algorithmResult = algorithmResultRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    AlgorithmResultDTO algorithmResultDTO = ObjectMapper.toAlgorithmResultDTO(algorithmResult);
    return algorithmResultDTO;
  }

  public List<AlgorithmResultDTO> getMultipleAlgorithmResultsById(List<EntityIdDTO> entityIdDTOs) {
    List<AlgorithmResultEntity> algorithmResults = algorithmResultRepository.findAllById(
        entityIdDTOs.stream().map(
            entityId -> entityId.getId()).collect(Collectors.toList()));
    if (algorithmResults.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<AlgorithmResultDTO> algorithmResultDTOs = algorithmResults.stream().map(ObjectMapper::toAlgorithmResultDTO)
        .collect(Collectors.toList());
    return algorithmResultDTOs;
  }

  public List<AlgorithmResultDTO> getAllAlgorithmResults() {
    List<AlgorithmResultEntity> algorithmResults = algorithmResultRepository.findAll();
    if (algorithmResults.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<AlgorithmResultDTO> algorithmResultDTOs = algorithmResults.stream().map(ObjectMapper::toAlgorithmResultDTO)
        .collect(Collectors.toList());
    return algorithmResultDTOs;
  }

  public void deleteAlgorithmResult(EntityIdDTO entityIdDTO) {
    AlgorithmResultEntity existingAlgorithmResult = algorithmResultRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    algorithmResultRepository.delete(existingAlgorithmResult);
  }

  public Boolean doesSingleAlgorithmResultExist(AlgorithmResultEntity algorithmResult) {
    Optional<AlgorithmResultEntity> algorithmResultFound = algorithmResultRepository.findById(algorithmResult.getId());
    return algorithmResultFound.isPresent();
  }

  public Boolean doesMultipleAlgorithmResultsExist(List<AlgorithmResultEntity> algorithmResults) {
    List<String> ids = new ArrayList<>();
    algorithmResults.forEach(algorithmResult -> ids.add(algorithmResult.getId()));
    List<AlgorithmResultEntity> algorithmRunsFound = algorithmResultRepository.findAllById(ids);
    if (algorithmResults.size() != algorithmRunsFound.size()) {
      return false;
    }
    return algorithmRunsFound.isEmpty();
  }
}
