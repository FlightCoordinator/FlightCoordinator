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
import com.flightcoordinator.dataservice.dto.CrewDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.response.ResponseHelper;
import com.flightcoordinator.dataservice.response.ResponseObject;
import com.flightcoordinator.dataservice.service.CrewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/crew")
@Tag(name = "Crew Controller", description = "Endpoints for managing crew members.")
public class CrewController {
  @Autowired
  private CrewService crewService;

  @PostMapping("/getAll")
  @Operation(summary = "Get a crew member by id", description = "Retrieve the details of a spesific crew member by their ID.")
  public ResponseEntity<ResponseObject<List<CrewDTO>>> getAllCrewMembers() {
    List<CrewDTO> crewMembers = crewService.getAllCrewMembers();
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "", crewMembers);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get a crew member by id", description = "Retrieve the details of a spesific crew member by their ID.")
  public ResponseEntity<ResponseObject<CrewDTO>> getCrewMemberById(@RequestBody EntityIdDTO id) {
    CrewDTO crewMember = crewService.getSingleCrewMemberById(id);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "", crewMember);
  }

  @PostMapping("/create")
  @Operation(summary = "Create a new crew member", description = "Create a new crew member.")
  public ResponseEntity<ResponseObject<Object>> createCrewMember(@RequestBody CrewDTO newCrewMember) {
    crewService.createCrewMember(newCrewMember);
    return ResponseHelper.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE, null);
  }

  @PatchMapping("/update")
  @Operation(summary = "Update an existing crew member", description = "Update an existing crew member.")
  public ResponseEntity<ResponseObject<Object>> updateCrewMember(@RequestBody CrewDTO updatedCrewMember) {
    crewService.updateCrewMember(updatedCrewMember);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, Messages.UPDATE_RESPONSE, null);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete an existing crew member", description = "Delete an existing crew member.")
  public ResponseEntity<ResponseObject<Object>> deleteCrewMember(@RequestBody EntityIdDTO id) {
    crewService.deleteCrewMember(id);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
