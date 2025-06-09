package com.flightcoordinator.dataservice.automation.selectors;

import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import com.flightcoordinator.dataservice.automation.utils.TimeUtils;
import com.flightcoordinator.dataservice.entity.FlightEntity;
import com.flightcoordinator.dataservice.entity.ModelEntity;
import com.flightcoordinator.dataservice.entity.PlaneEntity;
import com.flightcoordinator.dataservice.enums.PlaneStatus;
import com.flightcoordinator.dataservice.exception.AppError;

public class PlaneSelector {
  private final FlightEntity flight;
  private final List<PlaneEntity> planes;
  private final List<ModelEntity> models;

  public PlaneSelector(FlightEntity flight, List<ModelEntity> models, List<PlaneEntity> planes) {
    this.flight = flight;
    this.models = models;
    this.planes = planes;
  }

  public PlaneEntity select() {
    return planes.stream()
        .filter(this::isPlaneAvailable)
        .filter(this::canCarryPayload)
        .filter(this::hasEnoughFuel)
        .min(Comparator.comparingDouble(this::getWasteScore))
        .orElseThrow(() -> new AppError("No suitable plane found for flight id: " + flight.getId(), 404));
  }

  private boolean isPlaneAvailable(PlaneEntity plane) {
    if (plane.getPlaneStatus() != PlaneStatus.ACTIVE) {
      return false;
    }
    if (TimeUtils.isDatePassed(plane.getRetirementDate())) {
      return false;
    }
    float durationMinutes = flight.getEstimatedFlightDuration();
    ZonedDateTime estimatedArrival = ZonedDateTime.now()
        .plusMinutes((long) durationMinutes)
        .plusSeconds((long) ((durationMinutes % 1) * 60));
    Date arrivalAsDate = Date.from(estimatedArrival.toInstant());

    if (arrivalAsDate.after(plane.getRetirementDate())) {
      return false;
    }
    if (!plane.getCurrentLocation().equals(flight.getOriginAirport())) {
      return false;
    }
    return true;
  }

  private boolean canCarryPayload(PlaneEntity plane) {
    ModelEntity model = getModelOf(plane);

    return flight.getPassengerCount() <= model.getMaxPassengerCapacity() &&
        flight.getCargoWeight() <= model.getMaxCargoCapacity();
  }

  private boolean hasEnoughFuel(PlaneEntity plane) {
    ModelEntity model = getModelOf(plane);
    float requiredFuel = flight.getDistance() / model.getFuelEfficiency();
    return plane.getFuelAmount() >= requiredFuel;
  }

  private double getWasteScore(PlaneEntity plane) {
    ModelEntity model = getModelOf(plane);
    double passengerWasted = model.getMaxPassengerCapacity() - flight.getPassengerCount();
    double cargoWasted = model.getMaxCargoCapacity() - flight.getCargoWeight();
    return passengerWasted + cargoWasted;
  };

  private ModelEntity getModelOf(PlaneEntity plane) {
    return models.stream()
        .filter(model -> model.getId().equals(plane.getModel().getId()))
        .findFirst()
        .orElseThrow(() -> new AppError("Cannot find the model of requested plane", 500));
  }
}
