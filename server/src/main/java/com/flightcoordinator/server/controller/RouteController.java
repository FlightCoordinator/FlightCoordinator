package com.flightcoordinator.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightcoordinator.server.model.RouteModel;
import com.flightcoordinator.server.response.ResponseHelper;
import com.flightcoordinator.server.response.ResponseObject;
import com.flightcoordinator.server.service.RouteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/route")
@Tag(name = "Route Controller", description = "Endpoints for managing routes.")
public class RouteController {
  @Autowired
  private RouteService service;

  @GetMapping("/getById/{routeId}")
  @Operation(summary = "Get a route by id", description = "Retrieve the details of a spesific route using it's ID")
  public ResponseEntity<ResponseObject<RouteModel>> getRouteById(@PathVariable String routeId) {
    RouteModel route = service.getSingleRouteById(routeId);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), route);
  }

  @GetMapping("/getAll")
  @Operation(summary = "Get all the routes", description = "Retrieve the details of all routes.")
  public ResponseEntity<ResponseObject<List<RouteModel>>> getAllRoutes() {
    List<RouteModel> routes = service.getAllRoutes();
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), routes);
  }

  @PostMapping("/create")
  @Operation(summary = "Create a new route", description = "Create a new route.")
  public ResponseEntity<ResponseObject<Object>> createRoute(@RequestBody RouteModel newRoute) {
    service.createRoute(newRoute);
    return ResponseHelper.generateResponse(HttpStatus.CREATED.value(), true, HttpStatus.CREATED.getReasonPhrase(),
        null);
  }

  @PatchMapping("/update/{routeId}")
  @Operation(summary = "Update an route", description = "Update an existing route.")
  public ResponseEntity<ResponseObject<Object>> updateRoute(@PathVariable String routeId,
      @RequestBody RouteModel updatedRoute) {
    service.updateRoute(routeId, updatedRoute);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), null);
  }

  @DeleteMapping("/delete/{routeId}")
  @Operation(summary = "Delete an route", description = "Delete an existing route.")
  public ResponseEntity<ResponseObject<Object>> deleteRoute(@PathVariable String routeId) {
    service.deleteRoute(routeId);
    return ResponseHelper.generateResponse(HttpStatus.OK.value(), true, HttpStatus.OK.getReasonPhrase(), null);
  }
}
