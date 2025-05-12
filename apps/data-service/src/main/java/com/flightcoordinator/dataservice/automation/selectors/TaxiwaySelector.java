package com.flightcoordinator.dataservice.automation.selectors;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.flightcoordinator.dataservice.entity.ModelEntity;
import com.flightcoordinator.dataservice.entity.RunwayEntity;
import com.flightcoordinator.dataservice.entity.TaxiwayEntity;

public class TaxiwaySelector {
  private final String airportId;
  private final ModelEntity planeModel;
  private final RunwayEntity selectedRunway;
  private final List<TaxiwayEntity> taxiways;

  public TaxiwaySelector(String airportId, ModelEntity planeModel, RunwayEntity selectedRunway,
      List<TaxiwayEntity> taxiways) {
    this.airportId = airportId;
    this.planeModel = planeModel;
    this.selectedRunway = selectedRunway;
    this.taxiways = taxiways;
  }

  public TaxiwayEntity select() {
    List<TaxiwayEntity> airportTaxiways = taxiways.stream()
        .filter(taxiway -> taxiway.getAirport().getId().equals(airportId))
        .collect(Collectors.toList());

    return airportTaxiways.stream()
        .filter(this::isConnectedToRunway)
        .filter(this::meetsPhysicalRequirements)
        .sorted(Comparator.comparingInt(this::priorityScore).reversed())
        .findFirst()
        .orElseThrow(() -> new RuntimeException(
            "No suitable taxiway found for runway " + selectedRunway.getId() + " at airport " + airportId));
  }

  private boolean isConnectedToRunway(TaxiwayEntity taxiway) {
    return taxiway.getConnectedRunway().getId().equals(selectedRunway.getId());
  }

  private boolean meetsPhysicalRequirements(TaxiwayEntity taxiway) {
    return taxiway.getMaxTurningRadius() >= planeModel.getMinRotationRadius() &&
        taxiway.getMaxWeightCapacity() >= planeModel.getEmptyWeight() + planeModel.getMaxCargoCapacity() &&
        taxiway.getWidth() >= planeModel.getMinRotationRadius();
  }

  private int priorityScore(TaxiwayEntity taxiway) {
    int score = 0;

    if (Boolean.TRUE.equals(taxiway.getHasHighSpeedExit()))
      score += 2;
    if (Boolean.TRUE.equals(taxiway.getHasHoldingPoint()))
      score += 1;
    if (Boolean.TRUE.equals(taxiway.getHasLighting()))
      score += 1;

    return score;
  }
}
