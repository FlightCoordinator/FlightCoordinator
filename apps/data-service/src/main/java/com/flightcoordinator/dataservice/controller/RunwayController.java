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
import com.flightcoordinator.dataservice.dto.RunwayDTO;
import com.flightcoordinator.dataservice.dto.misc.CustomResponseDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.service.RunwayService;
import com.flightcoordinator.dataservice.utils.AppResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/runway")
@Tag(name = "Runway Controller", description = "Endpoints for managing airports' runways.")
public class RunwayController {
  @Autowired
  private RunwayService runwayService;

  @PostMapping("/getAll")
  @Operation(summary = "Get all the runways", description = "Retrieve the details of all runways.")
  public ResponseEntity<CustomResponseDTO<List<RunwayDTO>>> getAllRunways() {
    List<RunwayDTO> runways = runwayService.getAllRunways();
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", runways);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get a runway by id", description = "Retrieve the details of a spesific runway using it's ID.")
  public ResponseEntity<CustomResponseDTO<RunwayDTO>> getRunwayById(@RequestBody EntityIdDTO id) {
    RunwayDTO runway = runwayService.getSingleRunwayById(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", runway);
  }

  @PostMapping("/create")
  @Operation(summary = "Create a new runway", description = "Create a new runway.")
  public ResponseEntity<CustomResponseDTO<Object>> createRunway(@RequestBody RunwayDTO newRunway) {
    runwayService.createRunway(newRunway);
    return AppResponse.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE, null);
  }

  @PatchMapping("/update")
  @Operation(summary = "Update a runway", description = "Update an existing runway.")
  public ResponseEntity<CustomResponseDTO<Object>> updateRunway(@RequestBody RunwayDTO updatedRunway) {
    runwayService.updateRunway(updatedRunway);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.UPDATE_RESPONSE, null);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete a runway", description = "Delete an existing runway.")
  public ResponseEntity<CustomResponseDTO<Object>> deleteRunway(@RequestBody EntityIdDTO id) {
    runwayService.deleteRunway(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
