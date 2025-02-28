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
import com.flightcoordinator.dataservice.dto.TaxiwayDTO;
import com.flightcoordinator.dataservice.dto.misc.CustomResponseDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.service.TaxiwayService;
import com.flightcoordinator.dataservice.utils.AppResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/taxiway")
@Tag(name = "Taxiway Controller", description = "Endpoints for managing airports' taxiways.")
public class TaxiwayController {
  @Autowired
  private TaxiwayService taxiwayService;

  @PostMapping("/getAll")
  @Operation(summary = "Get all the taxiways", description = "Retrieve the details of all taxiways.")
  public ResponseEntity<CustomResponseDTO<List<TaxiwayDTO>>> getAllTaxiways() {
    List<TaxiwayDTO> taxiways = taxiwayService.getAllTaxiways();
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", taxiways);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get a taxiway by id", description = "Retrieve the details of a spesific taxiway using it's ID.")
  public ResponseEntity<CustomResponseDTO<TaxiwayDTO>> getTaxiwayById(@RequestBody EntityIdDTO id) {
    TaxiwayDTO taxiway = taxiwayService.getSingleTaxiwayById(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", taxiway);
  }

  @PostMapping("/create")
  @Operation(summary = "Create a new taxiway", description = "Create a new taxiway.")
  public ResponseEntity<CustomResponseDTO<Object>> createTaxiway(@RequestBody TaxiwayDTO newTaxiway) {
    taxiwayService.createTaxiway(newTaxiway);
    return AppResponse.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE, null);
  }

  @PatchMapping("/update")
  @Operation(summary = "Update a taxiway", description = "Update an existing taxiway.")
  public ResponseEntity<CustomResponseDTO<Object>> updateTaxiway(@RequestBody TaxiwayDTO updatedTaxiway) {
    taxiwayService.updateTaxiway(updatedTaxiway);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.UPDATE_RESPONSE, null);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete a taxiway", description = "Delete an existing taxiway.")
  public ResponseEntity<CustomResponseDTO<Object>> deleteTaxiway(@RequestBody EntityIdDTO id) {
    taxiwayService.deleteTaxiway(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
