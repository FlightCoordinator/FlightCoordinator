package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.AlgorithmRunDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.entity.AlgorithmRunEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.AlgorithmRunRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class AlgorithmRunService {
  @Autowired
  private AlgorithmRunRepository algorithmRunRepository;

  public AlgorithmRunDTO getSingleAlgorithmRunById(EntityIdDTO entityIdDTO) {
    AlgorithmRunEntity algorithmRun = algorithmRunRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    AlgorithmRunDTO algorithmRunDTO = ObjectMapper.toAlgorithmRunDTO(algorithmRun);
    return algorithmRunDTO;
  }

  public List<AlgorithmRunDTO> getMultipleAlgorithmRunsById(List<EntityIdDTO> entityIdDTOs) {
    List<AlgorithmRunEntity> algorithmRuns = algorithmRunRepository.findAllById(
        entityIdDTOs.stream().map(entityId -> entityId.getId()).collect(Collectors.toList()));
    if (algorithmRuns.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<AlgorithmRunDTO> algorithmRunDTOs = algorithmRuns.stream().map(ObjectMapper::toAlgorithmRunDTO)
        .collect(Collectors.toList());
    return algorithmRunDTOs;
  }

  public List<AlgorithmRunDTO> getAllAlgorithmRuns() {
    List<AlgorithmRunEntity> algorithmRuns = algorithmRunRepository.findAll();
    if (algorithmRuns.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<AlgorithmRunDTO> algorithmRunDTOs = algorithmRuns.stream().map(ObjectMapper::toAlgorithmRunDTO)
        .collect(Collectors.toList());
    return algorithmRunDTOs;
  }

  public void triggerAlgorithmRun(String algorithmName) {
    // TODO
  }

  public void deleteAlgorithmRun(EntityIdDTO entityIdDTO) {
    AlgorithmRunEntity existingAlgorithmRun = algorithmRunRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError("notFound.algorithmRun", HttpStatus.NOT_FOUND.value()));
    algorithmRunRepository.delete(existingAlgorithmRun);
  }

  public Boolean doesSingleAlgorithmRunExist(AlgorithmRunEntity algorithmRun) {
    Optional<AlgorithmRunEntity> algorithmRunFound = algorithmRunRepository.findById(algorithmRun.getId());
    return algorithmRunFound.isPresent();
  }

  public Boolean doesMultipleAlgorithmRunsExist(List<AlgorithmRunEntity> algorithmRuns) {
    List<String> ids = new ArrayList<>();
    algorithmRuns.forEach(algorithmRun -> ids.add(algorithmRun.getId()));
    List<AlgorithmRunEntity> algorithmRunsFound = algorithmRunRepository.findAllById(ids);
    if (algorithmRuns.size() != algorithmRunsFound.size()) {
      return false;
    }
    return algorithmRunsFound.isEmpty();
  }
}
