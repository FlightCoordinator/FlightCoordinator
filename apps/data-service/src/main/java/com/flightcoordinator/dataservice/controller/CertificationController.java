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
import com.flightcoordinator.dataservice.dto.CertificationDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.response.ResponseHelper;
import com.flightcoordinator.dataservice.response.ResponseObject;
import com.flightcoordinator.dataservice.service.CertificationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/certification")
@Tag(name = "Certifications Controller", description = "Endpoints for managing crew members' certifications.")
public class CertificationController {
  @Autowired
  private CertificationService certificationService;

  @PostMapping("/getAll")
  @Operation(summary = "Get all the certifications", description = "Retrieve the details of all certifications.")
  public ResponseEntity<ResponseObject<List<CertificationDTO>>> getAllCertification() {
    List<CertificationDTO> certifications = certificationService.getAllCertifications();
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "", certifications);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get a certification by id", description = "Retrieve the details of a spesific certification using it's ID.")
  public ResponseEntity<ResponseObject<CertificationDTO>> getCertificationById(@RequestBody EntityIdDTO id) {
    CertificationDTO certification = certificationService.getSingleCertificationById(id);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "", certification);
  }

  @PostMapping("/create")
  @Operation(summary = "Create a new certification", description = "Create a new certification.")
  public ResponseEntity<ResponseObject<Object>> createCertification(@RequestBody CertificationDTO newCertification) {
    certificationService.createCertification(newCertification);
    return ResponseHelper.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE, null);
  }

  @PatchMapping("/update")
  @Operation(summary = "Update a certification", description = "Update an existing certification.")
  public ResponseEntity<ResponseObject<Object>> updateCertification(
      @RequestBody CertificationDTO updatedCertification) {
    certificationService.updateCertification(updatedCertification);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, Messages.UPDATE_RESPONSE, null);
  }

  @DeleteMapping("delete")
  @Operation(summary = "Delete a certification", description = "Delete an existing certification.")
  public ResponseEntity<ResponseObject<Object>> deleteCertification(@RequestBody EntityIdDTO id) {
    certificationService.deleteCertification(id);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
