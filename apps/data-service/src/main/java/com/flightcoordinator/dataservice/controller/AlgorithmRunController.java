package com.flightcoordinator.dataservice.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.AlgorithmRunDTO;
import com.flightcoordinator.dataservice.dto.misc.CustomResponseDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.service.AlgorithmRunService;
import com.flightcoordinator.dataservice.utils.AppResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/algorithm/run")
@Tag(name = "Algorithm Run Controller", description = "Endpoints for managing details of algorithm runs.")
public class AlgorithmRunController {
  @Autowired
  private AlgorithmRunService algorithmRunService;

  @PostMapping("/getAll")
  @Operation(summary = "Get all the algorithm runs", description = "Retrieve the details of all a spesific algorithm runs.")
  public ResponseEntity<CustomResponseDTO<List<AlgorithmRunDTO>>> getAllAlgorithms() {
    List<AlgorithmRunDTO> algorithmRuns = algorithmRunService.getAllAlgorithmRuns();
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", algorithmRuns);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get an algorithm run by id", description = "Retrieve the details of a spesific algorithm run using it's ID.")
  public ResponseEntity<CustomResponseDTO<AlgorithmRunDTO>> getAlgorithmRunById(@RequestBody EntityIdDTO id) {
    AlgorithmRunDTO algorithmRun = algorithmRunService.getSingleAlgorithmRunById(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", algorithmRun);
  }

  @PostMapping("/trigger")
  @Operation(summary = "Create a new algorithm run", description = "Create a new algorithm run. (Not intended for manual use)")
  public ResponseEntity<CustomResponseDTO<Object>> triggerAlgorithmRun(@RequestBody Map<String, String> algorithmName) {
    algorithmRunService.triggerAlgorithmRun(algorithmName.get("algorithmName"));
    return AppResponse.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE, null);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete an algorithm run", description = "Delete an algorithm run.")
  public ResponseEntity<CustomResponseDTO<Object>> deleteAlgorithmRun(@RequestBody EntityIdDTO id) {
    algorithmRunService.deleteAlgorithmRun(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
