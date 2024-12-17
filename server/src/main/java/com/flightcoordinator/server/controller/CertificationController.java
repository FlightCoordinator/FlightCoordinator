package com.flightcoordinator.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightcoordinator.server.entity.CertificationEntity;
import com.flightcoordinator.server.response.ResponseHelper;
import com.flightcoordinator.server.response.ResponseObject;
import com.flightcoordinator.server.service.CertificationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${api.version}/certification")
@Tag(name = "Certifications Controller", description = "Endpoints for managing crew members' certifications.")
public class CertificationController {
  @Autowired
  private CertificationService certificationService;

  @GetMapping("/getById/{certificationId}")
  @PreAuthorize("hasAuthority('CERT_READ')")
  @Operation(summary = "Get a certification by id", description = "Retrieve the details of a spesific certification using it's ID.")
  public ResponseEntity<ResponseObject<CertificationEntity>> getCertificationById(
      @PathVariable String certificationId) {
    CertificationEntity certification = certificationService.getSingleCertificationById(certificationId);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(),
        certification);
  }

  @GetMapping("/getAll")
  @PreAuthorize("hasAuthority('CERT_READ')")
  @Operation(summary = "Get all the certifications", description = "Retrieve the details of all certifications.")
  public ResponseEntity<ResponseObject<List<CertificationEntity>>> getAllCertification() {
    List<CertificationEntity> certifications = certificationService.getAllCertifications();
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(),
        certifications);
  }

  @PostMapping("/create")
  @PreAuthorize("hasAuthority('CERT_CREATE')")
  @Operation(summary = "Create a new certification", description = "Create a new certification.")
  public ResponseEntity<ResponseObject<Object>> createCertification(
      @RequestBody CertificationEntity newCertification) {
    certificationService.createCertification(newCertification);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), null);
  }

  @PatchMapping("/update/{certificationId}")
  @PreAuthorize("hasAuthority('CERT_UPDATE')")
  @Operation(summary = "Update a certification", description = "Update an existing certification.")
  public ResponseEntity<ResponseObject<Object>> updateCertification(@PathVariable String certificationId,
      @RequestBody CertificationEntity updatedCertification) {
    certificationService.updateCertification(certificationId, updatedCertification);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), null);
  }

  @DeleteMapping("delete/{certificationId}")
  @PreAuthorize("hasAuthority('CERT_DELETE')")
  @Operation(summary = "Delete a certification", description = "Delete an existing certification.")
  public ResponseEntity<ResponseObject<Object>> deleteCertification(@PathVariable String certificationId) {
    certificationService.deleteCertification(certificationId);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), null);
  }
}
