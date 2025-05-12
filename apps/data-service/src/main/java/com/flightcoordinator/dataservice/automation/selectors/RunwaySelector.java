package com.flightcoordinator.dataservice.automation.selectors;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;

import com.flightcoordinator.dataservice.entity.ModelEntity;
import com.flightcoordinator.dataservice.entity.PlaneEntity;
import com.flightcoordinator.dataservice.entity.RunwayEntity;
import com.flightcoordinator.dataservice.enums.RunwayStatus;
import com.flightcoordinator.dataservice.exception.AppError;

public class RunwaySelector {
  private final String airportId;
  private final PlaneEntity selectedPlane;
  private final ModelEntity planeModel;
  private final List<RunwayEntity> runways;

  public RunwaySelector(String airportId, PlaneEntity selectedPlane, ModelEntity planeModel,
      List<RunwayEntity> runways) {
    this.airportId = airportId;
    this.selectedPlane = selectedPlane;
    this.planeModel = planeModel;
    this.runways = runways;
  }

  public RunwayEntity select() {
    List<RunwayEntity> airportRunways = runways.stream()
        .filter(runway -> runway.getAirport().getId().equals(airportId))
        .collect(Collectors.toList());

    if (airportRunways.isEmpty()) {
      throw new AppError(
          "No suitable runway found for plane with ID: " + selectedPlane.getId(),
          HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    return airportRunways.stream()
        .filter(this::isOperational)
        .filter(this::meetsDimensionRequirements)
        .filter(this::meetsWeightRequirement)
        .filter(this::meetsCrosswindLimit)
        .min(Comparator.comparingDouble(this::runwayFitScore))
        .orElseThrow(() -> new AppError(
            "No suitable runway found for plane with ID: " + selectedPlane.getId(),
            HttpStatus.INTERNAL_SERVER_ERROR.value()));
  }

  private boolean isOperational(RunwayEntity runway) {
    return runway.getStatus() == RunwayStatus.OPEN;
  }

  private boolean meetsDimensionRequirements(RunwayEntity runway) {
    return runway.getLength() >= planeModel.getRequiredRunwayLength() &&
        runway.getWidth() >= planeModel.getRequiredRunwayWidth();
  }

  private boolean meetsWeightRequirement(RunwayEntity runway) {
    return runway.getMaxWeightCapacity() >= planeModel.getEmptyWeight() + planeModel.getMaxCargoCapacity();
  }

  private boolean meetsCrosswindLimit(RunwayEntity runway) {
    return runway.getCrosswindLimit() >= planeModel.getMaxCrosswindComp();
  }

  private double runwayFitScore(RunwayEntity runway) {
    double lengthDiff = runway.getLength() - planeModel.getRequiredRunwayLength();
    double widthDiff = runway.getWidth() - planeModel.getRequiredRunwayWidth();
    return lengthDiff + widthDiff;
  }
}
