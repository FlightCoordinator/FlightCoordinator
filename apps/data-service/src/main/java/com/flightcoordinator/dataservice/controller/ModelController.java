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
import com.flightcoordinator.dataservice.dto.ModelDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.response.ResponseHelper;
import com.flightcoordinator.dataservice.response.ResponseObject;
import com.flightcoordinator.dataservice.service.ModelService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/${server.api-version}/model")
@Tag(name = "Model Controller", description = "Endpoints for managing plane models.")
public class ModelController {
  @Autowired
  private ModelService modelService;

  @PostMapping("/getAll")
  @Operation(summary = "Get all the plane models", description = "Retrieve the details of all plane models.")
  public ResponseEntity<ResponseObject<List<ModelDTO>>> getAllModels() {
    List<ModelDTO> models = modelService.getAllModels();
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "", models);
  }

  @PostMapping("/getById")
  @Operation(summary = "Get a plane model by id", description = "Retrieve the details of a spesific plane model using it's ID.")
  public ResponseEntity<ResponseObject<ModelDTO>> getModelById(@RequestBody EntityIdDTO id) {
    ModelDTO model = modelService.getSingleModelById(id);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, "", model);
  }

  @PostMapping("/create")
  @Operation(summary = "Create a new plane model", description = "Create a new plane model.")
  public ResponseEntity<ResponseObject<Object>> createModel(@RequestBody ModelDTO newModel) {
    modelService.createModel(newModel);
    return ResponseHelper.generateResponse(HttpStatus.CREATED.value(), true, Messages.CREATE_RESPONSE, null);
  }

  @PatchMapping("/update")
  @Operation(summary = "Update an plane model", description = "Update an existing plane model.")
  public ResponseEntity<ResponseObject<Object>> updateModel(@RequestBody ModelDTO updatedModel) {
    modelService.updateModel(updatedModel);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, Messages.UPDATE_RESPONSE, null);
  }

  @DeleteMapping("/delete")
  @Operation(summary = "Delete an plane model", description = "Delete an existing plane model.")
  public ResponseEntity<ResponseObject<Object>> deleteModel(@RequestBody EntityIdDTO id) {
    modelService.deleteModel(id);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, Messages.DELETE_RESPONSE, null);
  }
}
