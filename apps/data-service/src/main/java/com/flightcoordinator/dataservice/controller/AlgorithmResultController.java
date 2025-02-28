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
import com.flightcoordinator.dataservice.dto.AlgorithmResultDTO;
import com.flightcoordinator.dataservice.dto.misc.CustomResponseDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.service.AlgorithmResultService;
import com.flightcoordinator.dataservice.utils.AppResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/algorithm/result")
@Tag(name = "Algorithm Result Controller", description = "Endpoints for managing algorithm results.")
public class AlgorithmResultController {
  @Autowired
  private AlgorithmResultService algorithmResultService;

  @PostMapping("/getAll")
  @Operation(summary = "Get all the algorithm results", description = "Retrieve the details of all a spesific algorithm results.")
  public ResponseEntity<CustomResponseDTO<List<AlgorithmResultDTO>>> getAllAlgorithms() {
    List<AlgorithmResultDTO> algorithmResults = algorithmResultService.getAllAlgorithmResults();
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", algorithmResults);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get an algorithm result by id", description = "Retrieve the details of a spesific algorithm result using it's ID.")
  public ResponseEntity<CustomResponseDTO<AlgorithmResultDTO>> getAlgorithmResultById(@RequestBody EntityIdDTO id) {
    AlgorithmResultDTO algorithmResult = algorithmResultService.getSingleAlgorithmResultById(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", algorithmResult);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete an algorithm result", description = "Delete an algorithm result.")
  public ResponseEntity<CustomResponseDTO<Object>> deleteAlgorithmResult(@RequestBody EntityIdDTO id) {
    algorithmResultService.deleteAlgorithmResult(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
