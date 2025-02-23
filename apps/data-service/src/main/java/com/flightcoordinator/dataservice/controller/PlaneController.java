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
import com.flightcoordinator.dataservice.dto.EntityIdDTO;
import com.flightcoordinator.dataservice.dto.PlaneDTO;
import com.flightcoordinator.dataservice.response.ResponseHelper;
import com.flightcoordinator.dataservice.response.ResponseObject;
import com.flightcoordinator.dataservice.service.PlaneService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/plane")
@Tag(name = "Plane Controller", description = "Endpoints for managing planes.")
public class PlaneController {
  @Autowired
  private PlaneService planeService;

  @PostMapping("/getAll")
  @Operation(summary = "Get all the planes", description = "Retrieve the details of all planes.")
  public ResponseEntity<ResponseObject<List<PlaneDTO>>> getAllPlanes() {
    List<PlaneDTO> planes = planeService.getAllPlanes();
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "", planes);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get a plane by id", description = "Retrieve the details of a spesific plane using it's ID.")
  public ResponseEntity<ResponseObject<PlaneDTO>> getPlaneById(@RequestBody EntityIdDTO id) {
    PlaneDTO plane = planeService.getSinglePlaneById(id);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "", plane);
  }

  @PostMapping("/create")
  @Operation(summary = "Create a new plane", description = "Create a new plane.")
  public ResponseEntity<ResponseObject<Object>> createPlane(@RequestBody PlaneDTO newPlane) {
    planeService.createPlane(newPlane);
    return ResponseHelper.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE, null);
  }

  @PatchMapping("/update")
  @Operation(summary = "Update an plane", description = "Update an existing plane.")
  public ResponseEntity<ResponseObject<Object>> updatePlane(@RequestBody PlaneDTO updatedPlane) {
    planeService.updatePlane(updatedPlane);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, Messages.UPDATE_RESPONSE, null);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete an plane", description = "Delete an existing plane.")
  public ResponseEntity<ResponseObject<Object>> deletePlane(@RequestBody EntityIdDTO id) {
    planeService.deletePlane(id);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
