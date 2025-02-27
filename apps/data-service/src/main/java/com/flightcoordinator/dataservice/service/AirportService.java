package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.AirportDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.dto.partial.PartialAirportDTO;
import com.flightcoordinator.dataservice.entity.AirportEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.AirportRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class AirportService {
  @Autowired
  private AirportRepository airportRepository;

  public AirportDTO getSingleAirportById(EntityIdDTO entityIdDTO) {
    AirportEntity airport = airportRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    AirportDTO airportDto = ObjectMapper.toAirportDTO(airport);
    return airportDto;
  }

  public List<AirportDTO> getMultipleAirportsById(List<EntityIdDTO> entityIdDTOs) {
    List<AirportEntity> airports = airportRepository.findAllById(entityIdDTOs.stream().map(
        entityId -> entityId.getId()).collect(Collectors.toList()));
    if (airports.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<AirportDTO> airportDTOs = airports.stream().map(ObjectMapper::toAirportDTO).collect(Collectors.toList());
    return airportDTOs;
  }

  public List<AirportDTO> getAllAirports() {
    List<AirportEntity> airports = airportRepository.findAll();
    if (airports.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<AirportDTO> airportDTOs = airports.stream().map(ObjectMapper::toAirportDTO).collect(Collectors.toList());
    return airportDTOs;
  }

  public void createAirport(PartialAirportDTO newAirportDTO) {
    AirportEntity newAirportEntity = new AirportEntity();

    newAirportEntity.setName(newAirportDTO.getName());
    newAirportEntity.setIataCode(newAirportDTO.getIataCode());
    newAirportEntity.setIcaoCode(newAirportDTO.getIcaoCode());
    newAirportEntity.setCountryCode(newAirportDTO.getCountryCode());
    newAirportEntity.setType(newAirportDTO.getType());
    newAirportEntity.setOperationStartTime(newAirportDTO.getOperationStartTime());
    newAirportEntity.setOperationStopTime(newAirportDTO.getOperationStopTime());
    newAirportEntity.setElevation(newAirportDTO.getElevation());
    newAirportEntity.setSlope(newAirportDTO.getSlope());
    newAirportEntity.setPossibleNoiseCategory(newAirportDTO.getPossibleNoiseCategory());

    airportRepository.save(newAirportEntity);
  }

  public void updateAirport(PartialAirportDTO updatedAirportDTO) {
    AirportEntity existingAirport = airportRepository.findById(updatedAirportDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    existingAirport.setName(updatedAirportDTO.getName());
    existingAirport.setIataCode(updatedAirportDTO.getIataCode());
    existingAirport.setIcaoCode(updatedAirportDTO.getIcaoCode());
    existingAirport.setCountryCode(updatedAirportDTO.getCountryCode());
    existingAirport.setType(updatedAirportDTO.getType());
    existingAirport.setOperationStartTime(updatedAirportDTO.getOperationStartTime());
    existingAirport.setOperationStopTime(updatedAirportDTO.getOperationStopTime());
    existingAirport.setElevation(updatedAirportDTO.getElevation());
    existingAirport.setSlope(updatedAirportDTO.getSlope());
    existingAirport.setPossibleNoiseCategory(updatedAirportDTO.getPossibleNoiseCategory());

    airportRepository.save(existingAirport);
  }

  public void deleteAirport(EntityIdDTO entityIdDTO) {
    AirportEntity existingAirport = airportRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    airportRepository.delete(existingAirport);
  }

  public Boolean doesSingleAirportExist(AirportEntity airport) {
    Optional<AirportEntity> airportFound = airportRepository.findById(airport.getId());
    return airportFound.isPresent();
  }

  public Boolean doesMultipleAirportsExist(List<AirportEntity> airports) {
    List<String> ids = new ArrayList<>();
    airports.forEach(airport -> ids.add(airport.getId()));
    List<AirportEntity> airportsFound = airportRepository.findAllById(ids);
    if (airports.size() != airportsFound.size()) {
      return false;
    }
    return airportsFound.isEmpty();
  }
}
