package com.flightcoordinator.dataservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.response.ResponseHelper;
import com.flightcoordinator.dataservice.response.ResponseObject;
import com.flightcoordinator.dataservice.service.DevToolsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/devTools")
@Tag(name = "Development Tools' Controller", description = "Endpoint for various tools for development operations.")
public class DevToolsController {
  @Autowired
  private DevToolsService devToolsService;

  @PostMapping("/generateSampleData")
  @Operation(summary = "Generate sample data for development", description = "Generate sample data for development.")
  public ResponseEntity<ResponseObject<List<Object>>> createSampleData() {
    devToolsService.generateSampleData();
    return ResponseHelper.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE, null);
  }
}
