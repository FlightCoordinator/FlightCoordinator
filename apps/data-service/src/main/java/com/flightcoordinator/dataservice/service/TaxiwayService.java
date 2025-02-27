package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.TaxiwayDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.entity.AirportEntity;
import com.flightcoordinator.dataservice.entity.RunwayEntity;
import com.flightcoordinator.dataservice.entity.TaxiwayEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.AirportRepository;
import com.flightcoordinator.dataservice.repository.RunwayRepository;
import com.flightcoordinator.dataservice.repository.TaxiwayRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class TaxiwayService {
  @Autowired
  private TaxiwayRepository taxiwayRepository;

  @Autowired
  private RunwayRepository runwayRepository;

  @Autowired
  private AirportRepository airportRepository;

  public TaxiwayDTO getSingleTaxiwayById(EntityIdDTO entityIdDTO) {
    TaxiwayEntity taxiway = taxiwayRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    TaxiwayDTO taxiwayDTO = ObjectMapper.toTaxiwayDTO(taxiway);
    return taxiwayDTO;
  }

  public List<TaxiwayDTO> getMultipleTaxiwaysById(List<EntityIdDTO> entityIdDTOs) {
    List<TaxiwayEntity> taxiways = taxiwayRepository.findAllById(entityIdDTOs.stream().map(
        entityId -> entityId.getId()).collect(Collectors.toList()));
    if (taxiways.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<TaxiwayDTO> taxiwayDTOs = taxiways.stream().map(ObjectMapper::toTaxiwayDTO).collect(Collectors.toList());
    return taxiwayDTOs;
  }

  public List<TaxiwayDTO> getAllTaxiways() {
    List<TaxiwayEntity> taxiways = taxiwayRepository.findAll();
    if (taxiways.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<TaxiwayDTO> taxiwayDTOs = taxiways.stream().map(ObjectMapper::toTaxiwayDTO).collect(Collectors.toList());
    return taxiwayDTOs;
  }

  public void createTaxiway(TaxiwayDTO newTaxiwayDTO) {
    AirportEntity airportEntity = airportRepository.findById(newTaxiwayDTO.getAirportId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    RunwayEntity runwayEntity = runwayRepository.findById(newTaxiwayDTO.getConnectedRunwayId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    TaxiwayEntity newTaxiwayEntity = new TaxiwayEntity();
    newTaxiwayEntity.setName(newTaxiwayDTO.getName());
    newTaxiwayEntity.setAirport(airportEntity);
    newTaxiwayEntity.setLoadCapacity(newTaxiwayDTO.getLoadCapacity());
    newTaxiwayEntity.setHasHoldingPoint(newTaxiwayDTO.getHasHoldingPoint());
    newTaxiwayEntity.setHasHighSpeedExit(newTaxiwayDTO.getHasHighSpeedExit());
    newTaxiwayEntity.setWidth(newTaxiwayDTO.getWidth());
    newTaxiwayEntity.setLength(newTaxiwayDTO.getLength());
    newTaxiwayEntity.setMaxTurningRadius(newTaxiwayDTO.getMaxTurningRadius());
    newTaxiwayEntity.setMaxWeightCapacity(newTaxiwayDTO.getMaxWeightCapacity());
    newTaxiwayEntity.setHasLighting(newTaxiwayDTO.getHasLighting());
    newTaxiwayEntity.setHasSignage(newTaxiwayDTO.getHasSignage());
    newTaxiwayEntity.setConnectedRunway(runwayEntity);

    taxiwayRepository.save(newTaxiwayEntity);
  }

  public void updateTaxiway(TaxiwayDTO updatedTaxiwayDTO) {
    AirportEntity airportEntity = airportRepository.findById(updatedTaxiwayDTO.getAirportId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    RunwayEntity runwayEntity = runwayRepository.findById(updatedTaxiwayDTO.getConnectedRunwayId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    TaxiwayEntity existingTaxiway = taxiwayRepository.findById(updatedTaxiwayDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    existingTaxiway.setName(updatedTaxiwayDTO.getName());
    existingTaxiway.setAirport(airportEntity);
    existingTaxiway.setLoadCapacity(updatedTaxiwayDTO.getLoadCapacity());
    existingTaxiway.setHasHoldingPoint(updatedTaxiwayDTO.getHasHoldingPoint());
    existingTaxiway.setHasHighSpeedExit(updatedTaxiwayDTO.getHasHighSpeedExit());
    existingTaxiway.setWidth(updatedTaxiwayDTO.getWidth());
    existingTaxiway.setLength(updatedTaxiwayDTO.getLength());
    existingTaxiway.setMaxTurningRadius(updatedTaxiwayDTO.getMaxTurningRadius());
    existingTaxiway.setMaxWeightCapacity(updatedTaxiwayDTO.getMaxWeightCapacity());
    existingTaxiway.setHasLighting(updatedTaxiwayDTO.getHasLighting());
    existingTaxiway.setHasSignage(updatedTaxiwayDTO.getHasSignage());
    existingTaxiway.setConnectedRunway(runwayEntity);

    taxiwayRepository.save(existingTaxiway);
  }

  public void deleteTaxiway(EntityIdDTO entityIdDTO) {
    TaxiwayEntity existingTaxiway = taxiwayRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    taxiwayRepository.delete(existingTaxiway);
  }

  public Boolean doesSingleTaxiwayExist(TaxiwayEntity taxiway) {
    Optional<TaxiwayEntity> taxiwayFound = taxiwayRepository.findById(taxiway.getId());
    return taxiwayFound.isPresent();
  }

  public Boolean doesMultipleTaxiwaysExist(List<TaxiwayEntity> taxiways) {
    List<String> ids = new ArrayList<>();
    taxiways.forEach(taxiway -> ids.add(taxiway.getId()));
    List<TaxiwayEntity> taxiwaysFound = taxiwayRepository.findAllById(ids);
    if (taxiways.size() != taxiwaysFound.size()) {
      return false;
    }
    return taxiwaysFound.isEmpty();
  }
}
