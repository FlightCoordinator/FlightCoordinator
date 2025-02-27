package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.FlightDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.entity.AirportEntity;
import com.flightcoordinator.dataservice.entity.FlightEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.AirportRepository;
import com.flightcoordinator.dataservice.repository.FlightRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class FlightService {
  @Autowired
  private FlightRepository flightRepository;

  @Autowired
  private AirportRepository airportRepository;

  public FlightDTO getSingleFlightById(EntityIdDTO entityIdDTO) {
    FlightEntity flight = flightRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    FlightDTO flightDTO = ObjectMapper.toFlightDTO(flight);
    return flightDTO;
  }

  public List<FlightDTO> getMultipleFlightsById(List<EntityIdDTO> entityIdDTOs) {
    List<FlightEntity> flights = flightRepository.findAllById(entityIdDTOs.stream().map(
        entityId -> entityId.getId()).collect(Collectors.toList()));
    if (flights.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<FlightDTO> flightDTOs = flights.stream().map(ObjectMapper::toFlightDTO).collect(Collectors.toList());
    return flightDTOs;
  }

  public List<FlightDTO> getAllFlights() {
    List<FlightEntity> flights = flightRepository.findAll();
    if (flights.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<FlightDTO> flightDTOs = flights.stream().map(ObjectMapper::toFlightDTO).collect(Collectors.toList());
    return flightDTOs;
  }

  public void createFlight(FlightDTO newFlightDTO) {
    AirportEntity destinationAirport = airportRepository.findById(newFlightDTO.getDestinationAirportId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    AirportEntity originAirport = airportRepository.findById(newFlightDTO.getOriginAirportId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    FlightEntity flightEntity = new FlightEntity();
    flightEntity.setPassengerCount(newFlightDTO.getPassengerCount());
    flightEntity.setCargoWeight(newFlightDTO.getCargoWeight());
    flightEntity.setOriginAirport(originAirport);
    flightEntity.setDestinationAirport(destinationAirport);
    flightEntity.setDistance(newFlightDTO.getDistance());
    flightEntity.setEstimatedTakeoffTime(newFlightDTO.getEstimatedTakeoffTime());
    flightEntity.setEstimatedLandingTime(newFlightDTO.getEstimatedLandingTime());
    flightEntity.setEstimatedLandingTime(newFlightDTO.getEstimatedLandingTime());

    flightRepository.save(flightEntity);
  }

  public void updateFlight(FlightDTO updatedFlightDTO) {
    FlightEntity existingFlight = flightRepository.findById(updatedFlightDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    AirportEntity destinationAirport = airportRepository.findById(updatedFlightDTO.getDestinationAirportId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    AirportEntity originAirport = airportRepository.findById(updatedFlightDTO.getOriginAirportId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    existingFlight.setPassengerCount(updatedFlightDTO.getPassengerCount());
    existingFlight.setCargoWeight(updatedFlightDTO.getCargoWeight());
    existingFlight.setOriginAirport(originAirport);
    existingFlight.setDestinationAirport(destinationAirport);
    existingFlight.setDistance(updatedFlightDTO.getDistance());
    existingFlight.setEstimatedTakeoffTime(updatedFlightDTO.getEstimatedTakeoffTime());
    existingFlight.setEstimatedLandingTime(updatedFlightDTO.getEstimatedLandingTime());
    existingFlight.setEstimatedLandingTime(updatedFlightDTO.getEstimatedLandingTime());

    flightRepository.save(existingFlight);
  }

  public void deleteFlight(EntityIdDTO entityIdDTO) {
    FlightEntity existingFlight = flightRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    flightRepository.delete(existingFlight);
  }

  public Boolean doesSingleFlightExist(FlightEntity flight) {
    Optional<FlightEntity> flightFound = flightRepository.findById(flight.getId());
    return flightFound.isPresent();
  }

  public Boolean doesMultipleFlightsExist(List<FlightEntity> flights) {
    List<String> ids = new ArrayList<>();
    flights.forEach(flight -> ids.add(flight.getId()));
    List<FlightEntity> flightsFound = flightRepository.findAllById(ids);
    if (flights.size() != flightsFound.size()) {
      return false;
    }
    return flightsFound.isEmpty();
  }
}
