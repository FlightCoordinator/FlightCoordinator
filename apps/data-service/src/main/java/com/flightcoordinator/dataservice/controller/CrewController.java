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
import com.flightcoordinator.dataservice.dto.misc.CustomResponseDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.service.CrewService;
import com.flightcoordinator.dataservice.utils.AppResponse;

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
  public ResponseEntity<CustomResponseDTO<List<CrewDTO>>> getAllCrewMembers() {
    List<CrewDTO> crewMembers = crewService.getAllCrewMembers();
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", crewMembers);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get a crew member by id", description = "Retrieve the details of a spesific crew member by their ID.")
  public ResponseEntity<CustomResponseDTO<CrewDTO>> getCrewMemberById(@RequestBody EntityIdDTO id) {
    CrewDTO crewMember = crewService.getSingleCrewMemberById(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, "", crewMember);
  }

  @PostMapping("/create")
  @Operation(summary = "Create a new crew member", description = "Create a new crew member.")
  public ResponseEntity<CustomResponseDTO<Object>> createCrewMember(@RequestBody CrewDTO newCrewMember) {
    crewService.createCrewMember(newCrewMember);
    return AppResponse.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE, null);
  }

  @PatchMapping("/update")
  @Operation(summary = "Update an existing crew member", description = "Update an existing crew member.")
  public ResponseEntity<CustomResponseDTO<Object>> updateCrewMember(@RequestBody CrewDTO updatedCrewMember) {
    crewService.updateCrewMember(updatedCrewMember);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.UPDATE_RESPONSE, null);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete an existing crew member", description = "Delete an existing crew member.")
  public ResponseEntity<CustomResponseDTO<Object>> deleteCrewMember(@RequestBody EntityIdDTO id) {
    crewService.deleteCrewMember(id);
    return AppResponse.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
