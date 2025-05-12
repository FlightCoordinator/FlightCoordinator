package com.flightcoordinator.dataservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.FlightPlanDTO;
import com.flightcoordinator.dataservice.dto.misc.CustomResponseDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.service.FlightPlanService;
import com.flightcoordinator.dataservice.utils.AppResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/flightPlan")
@Tag(name = "Flight Plan Controller", description = "Endpoints for managing flight plans.")
public class FlightPlanController {
  @Autowired
  private FlightPlanService flightPlanService;

  @PostMapping("/getAll")
  @Operation(summary = "Get all the flight plans", description = "Retrieve the details of all a spesific flight plans.")
  public ResponseEntity<CustomResponseDTO<List<FlightPlanDTO>>> getAllAlgorithms() {
    List<FlightPlanDTO> flightPlans = flightPlanService.getAllFlightPlans();
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", flightPlans);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get an flight plan by id", description = "Retrieve the details of a spesific flight plan using it's ID.")
  public ResponseEntity<CustomResponseDTO<FlightPlanDTO>> getFlightPlanById(@RequestBody EntityIdDTO id) {
    FlightPlanDTO flightPlan = flightPlanService.getSingleFlightPlanById(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", flightPlan);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get an flight plan by id", description = "Retrieve the details of a spesific flight plan using it's ID.")
  public ResponseEntity<CustomResponseDTO<Object>> generateFlightPlan(@RequestBody EntityIdDTO id) {
    flightPlanService.createFlightPlan(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", null);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete an flight plan", description = "Delete an flight plan.")
  public ResponseEntity<CustomResponseDTO<Object>> deleteFlightPlan(@RequestBody EntityIdDTO id) {
    flightPlanService.deleteFlightPlan(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
