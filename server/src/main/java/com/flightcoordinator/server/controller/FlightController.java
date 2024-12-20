package com.flightcoordinator.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightcoordinator.server.entity.FlightEntity;
import com.flightcoordinator.server.response.ResponseHelper;
import com.flightcoordinator.server.response.ResponseObject;
import com.flightcoordinator.server.service.FlightService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${api.version}/flight")
@Tag(name = "Flight Controller", description = "Endpoints for managing details of flights.")
public class FlightController {
  @Autowired
  private FlightService flightService;

  @PostMapping("/getAll")
  @PreAuthorize("hasAuthority('FLIGHT_READ')")
  @Operation(summary = "Get all the flights", description = "Retrieve the details of all flights.")
  public ResponseEntity<ResponseObject<List<FlightEntity>>> getAllFlights() {
    List<FlightEntity> flights = flightService.getAllFlights();
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "controllers.getResponse", flights);
  }

  @PostMapping("/getById")
  @PreAuthorize("hasAuthority('FLIGHT_READ')")
  @Operation(summary = "Get a flight by id", description = "Retrieve the details of a spesific flight using it's ID.")
  public ResponseEntity<ResponseObject<FlightEntity>> getFlightById(@RequestBody String flightId) {
    FlightEntity flight = flightService.getSingleFlightById(flightId);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "controllers.getResponse", flight);
  }

  @PostMapping("/create")
  @PreAuthorize("hasAuthority('FLIGHT_CREATE')")
  @Operation(summary = "Create a new flight", description = "Create a new flight.")
  public ResponseEntity<ResponseObject<Object>> createFlight(@RequestBody FlightEntity flight) {
    flightService.createFlight(flight);
    return ResponseHelper.generateResponse(HttpStatus.CREATED.value(), true, "controllers.createResponse", null);
  }

  @PatchMapping("/update")
  @PreAuthorize("hasAuthority('FLIGHT_UPDATE')")
  @Operation(summary = "Update a flight", description = "Update an existing flight.")
  public ResponseEntity<ResponseObject<Object>> updateFlight(@RequestBody String flightId,
      @RequestBody FlightEntity flight) {
    flightService.updateFlight(flightId, flight);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "controllers.updateResponse", null);
  }

  @DeleteMapping("/delete")
  @PreAuthorize("hasAuthority('FLIGHT_DELETE')")
  @Operation(summary = "Delete a flight", description = "Delete an existing flight.")
  public ResponseEntity<ResponseObject<Object>> deleteFlight(@RequestBody String flightId) {
    flightService.deleteFlight(flightId);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "controllers.deleteResponse", null);
  }
}
