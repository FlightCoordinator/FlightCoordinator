package com.flightcoordinator.dataservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.FlightDTO;
import com.flightcoordinator.dataservice.dto.misc.CustomResponseDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.service.FlightService;
import com.flightcoordinator.dataservice.utils.AppResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/flight")
@Tag(name = "Flight Controller", description = "Endpoints for managing details of flights.")
public class FlightController {
  @Autowired
  private FlightService flightService;

  @PostMapping("/getAll")
  @Operation(summary = "Get all the flights", description = "Retrieve the details of all flights.")
  public ResponseEntity<CustomResponseDTO<List<FlightDTO>>> getAllFlights() {
    List<FlightDTO> flights = flightService.getAllFlights();
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", flights);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get a flight by id", description = "Retrieve the details of a spesific flight using it's ID.")
  public ResponseEntity<CustomResponseDTO<FlightDTO>> getFlightById(@RequestBody EntityIdDTO id) {
    FlightDTO flight = flightService.getSingleFlightById(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", flight);
  }

  @PostMapping("/create")
  @Operation(summary = "Create a new flight", description = "Create a new flight.")
  public ResponseEntity<CustomResponseDTO<Object>> createFlight(@RequestBody FlightDTO newFlight) {
    flightService.createFlight(newFlight);
    return AppResponse.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE, null);
  }

  @PatchMapping("/update")
  @Operation(summary = "Update a flight", description = "Update an existing flight.")
  public ResponseEntity<CustomResponseDTO<Object>> updateFlight(@RequestBody FlightDTO updatedFlight) {
    flightService.updateFlight(updatedFlight);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.UPDATE_RESPONSE, null);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete a flight", description = "Delete an existing flight.")
  public ResponseEntity<CustomResponseDTO<Object>> deleteFlight(@RequestBody EntityIdDTO id) {
    flightService.deleteFlight(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
