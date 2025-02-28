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
import com.flightcoordinator.dataservice.dto.AirportDTO;
import com.flightcoordinator.dataservice.dto.misc.CustomResponseDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.dto.partial.PartialAirportDTO;
import com.flightcoordinator.dataservice.service.AirportService;
import com.flightcoordinator.dataservice.utils.AppResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/airport")
@Tag(name = "Airports Controller", description = "Endpoints for managing airports.")
public class AirportController {
  @Autowired
  private AirportService airportService;

  @PostMapping("/getAll")
  @Operation(summary = "Get all the airports", description = "Retrieve the details of all airports.")
  public ResponseEntity<CustomResponseDTO<List<AirportDTO>>> getAllAirports() {
    List<AirportDTO> airports = airportService.getAllAirports();
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", airports);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get an airport by id", description = "Retrieve the details of a spesific airpot using it's ID.")
  public ResponseEntity<CustomResponseDTO<AirportDTO>> getAirportById(@RequestBody EntityIdDTO id) {
    AirportDTO airport = airportService.getSingleAirportById(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", airport);
  }

  @PostMapping("/create")
  @Operation(summary = "Create a new airport", description = "Create a new airport.")
  public ResponseEntity<CustomResponseDTO<Object>> createAirport(@RequestBody PartialAirportDTO newAirport) {
    airportService.createAirport(newAirport);
    return AppResponse.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE,
        null);
  };

  @PatchMapping("/update")
  @Operation(summary = "Update an airport", description = "Update an existing airport.")
  public ResponseEntity<CustomResponseDTO<Object>> updateAirport(@RequestBody PartialAirportDTO updatedAirport) {
    airportService.updateAirport(updatedAirport);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.UPDATE_RESPONSE, null);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete an airport", description = "Delete an existing airport.")
  public ResponseEntity<CustomResponseDTO<Object>> deleteAirport(@RequestBody EntityIdDTO id) {
    airportService.deleteAirport(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
