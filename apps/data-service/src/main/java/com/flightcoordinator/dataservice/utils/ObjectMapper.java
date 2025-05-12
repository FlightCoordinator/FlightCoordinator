package com.flightcoordinator.dataservice.utils;

import java.util.stream.Collectors;

import com.flightcoordinator.dataservice.dto.AirportDTO;
import com.flightcoordinator.dataservice.dto.CertificationDTO;
import com.flightcoordinator.dataservice.dto.CrewDTO;
import com.flightcoordinator.dataservice.dto.FlightDTO;
import com.flightcoordinator.dataservice.dto.FlightPlanDTO;
import com.flightcoordinator.dataservice.dto.ModelDTO;
import com.flightcoordinator.dataservice.dto.PlaneDTO;
import com.flightcoordinator.dataservice.dto.RunwayDTO;
import com.flightcoordinator.dataservice.dto.TaxiwayDTO;
import com.flightcoordinator.dataservice.entity.AirportEntity;
import com.flightcoordinator.dataservice.entity.CertificationEntity;
import com.flightcoordinator.dataservice.entity.CrewEntity;
import com.flightcoordinator.dataservice.entity.FlightEntity;
import com.flightcoordinator.dataservice.entity.FlightPlanEntity;
import com.flightcoordinator.dataservice.entity.ModelEntity;
import com.flightcoordinator.dataservice.entity.PlaneEntity;
import com.flightcoordinator.dataservice.entity.RunwayEntity;
import com.flightcoordinator.dataservice.entity.TaxiwayEntity;

public class ObjectMapper {
  public static AirportDTO toAirportDTO(AirportEntity airportEntity) {
    AirportDTO airportDTO = new AirportDTO();
    airportDTO.setId(airportEntity.getId());
    airportDTO.setName(airportEntity.getName());
    airportDTO.setIataCode(airportEntity.getIataCode());
    airportDTO.setIcaoCode(airportEntity.getIcaoCode());
    airportDTO.setCountryCode(airportEntity.getCountryCode());
    airportDTO.setType(airportEntity.getType());
    airportDTO.setOperationStartTime(airportEntity.getOperationStartTime());
    airportDTO.setOperationStopTime(airportEntity.getOperationStopTime());
    airportDTO.setElevation(airportEntity.getElevation());
    airportDTO.setSlope(airportEntity.getSlope());
    airportDTO.setPossibleNoiseCategory(airportEntity.getPossibleNoiseCategory());
    airportDTO.setRunwayIds(airportEntity.getRunways().stream()
        .map(runway -> runway.getId()).collect(Collectors.toList()));
    airportDTO.setTaxiwayIds(airportEntity.getTaxiways().stream()
        .map(vehicle -> vehicle.getId()).collect(Collectors.toList()));
    airportDTO.setPlanesPresentIds(airportEntity.getPlanesPresent().stream()
        .map(plane -> plane.getId()).collect(Collectors.toList()));
    airportDTO.setFlightFromAirportIds(airportEntity.getFlightFromAirport().stream()
        .map(flight -> flight.getId()).collect(Collectors.toList()));
    airportDTO.setFlightToAirportIds(airportEntity.getFlightFromAirport().stream()
        .map(flight -> flight.getId()).collect(Collectors.toList()));
    airportDTO.setCrewMembersPresentIds(airportEntity.getCrewMembersPresent().stream()
        .map(crew -> crew.getId()).collect(Collectors.toList()));
    return airportDTO;
  }

  public static FlightPlanDTO toFlightPlanDTO(FlightPlanEntity flightPlanEntity) {
    FlightPlanDTO flightPlanDTO = new FlightPlanDTO();
    flightPlanDTO.setId(flightPlanEntity.getId());
    flightPlanDTO.setBasedOnFlight(flightPlanEntity.getBasedOnFlight());
    flightPlanDTO.setSelectedPlane(flightPlanEntity.getSelectedPlane());
    flightPlanDTO.setSelectedTakeoffRunway(flightPlanEntity.getSelectedTakeoffRunway());
    flightPlanDTO.setSelectedLandingRunway(flightPlanEntity.getSelectedLandingRunway());
    flightPlanDTO.setSelectedTakeoffTaxiway(flightPlanEntity.getSelectedTakeoffTaxiway());
    flightPlanDTO.setSelectedLandingTaxiway(flightPlanEntity.getSelectedLandingTaxiway());
    flightPlanDTO.setSelectedCrewMembers(flightPlanEntity.getSelectedCrewMembers());
    return flightPlanDTO;
  }

  public static CertificationDTO toCertificationDTO(CertificationEntity certificationEntity) {
    CertificationDTO certificationDTO = new CertificationDTO();
    certificationDTO.setId(certificationEntity.getId());
    certificationDTO.setName(certificationEntity.getName());
    certificationDTO.setCertificationNumber(certificationEntity.getCertificationNumber());
    certificationDTO.setIssuer(certificationEntity.getIssuer());
    certificationDTO.setExpirationDate(certificationEntity.getExpirationDate());
    certificationDTO.setValidityPeriod(certificationEntity.getValidityPeriod());
    certificationDTO.setDescription(certificationEntity.getDescription());
    certificationDTO.setAssignedCrewMemberId(certificationEntity.getAssignedCrewMember().getId());
    return certificationDTO;
  }

  public static CrewDTO toCrewDTO(CrewEntity crewEntity) {
    CrewDTO crewDTO = new CrewDTO();
    crewDTO.setId(crewEntity.getId());
    crewDTO.setFullName(crewEntity.getFullName());
    crewDTO.setEmail(crewEntity.getEmail());
    crewDTO.setPhoneNumber(crewEntity.getPhoneNumber());
    crewDTO.setRole(crewEntity.getRole());
    crewDTO.setCertificationIds(crewEntity.getCertifications().stream()
        .map(certification -> certification.getId()).collect(Collectors.toList()));
    crewDTO.setTotalFlightHours(crewEntity.getTotalFlightHours());
    crewDTO.setBaseAirportId(crewEntity.getBaseAirport().getId());
    crewDTO.setStatus(crewEntity.getStatus());
    return crewDTO;
  }

  public static FlightDTO toFlightDTO(FlightEntity flightEntity) {
    FlightDTO flightDTO = new FlightDTO();
    flightDTO.setId(flightEntity.getId());
    flightDTO.setPassengerCount(flightEntity.getPassengerCount());
    flightDTO.setCargoWeight(flightEntity.getCargoWeight());
    flightDTO.setOriginAirportId(flightEntity.getOriginAirport().getId());
    flightDTO.setDestinationAirportId(flightEntity.getDestinationAirport().getId());
    flightDTO.setDistance(flightEntity.getDistance());
    flightDTO.setEstimatedTakeoffTime(flightEntity.getEstimatedTakeoffTime());
    flightDTO.setEstimatedLandingTime(flightEntity.getEstimatedLandingTime());
    flightDTO.setEstimatedFlightDuration(flightEntity.getEstimatedFlightDuration());
    return flightDTO;
  }

  public static PlaneDTO toPlaneDTO(PlaneEntity planeEntity) {
    PlaneDTO planeDTO = new PlaneDTO();
    planeDTO.setId(planeEntity.getId());
    planeDTO.setModelId(planeEntity.getModel().getId());
    planeDTO.setTailNumber(planeEntity.getTailNumber());
    planeDTO.setNextMaintenanceDate(planeEntity.getNextMaintenanceDate());
    planeDTO.setCyclesSinceLastMaintenance(planeEntity.getCyclesSinceLastMaintenance());
    planeDTO.setRetirementDate(planeEntity.getRetirementDate());
    planeDTO.setEngineHours(planeEntity.getEngineHours());
    planeDTO.setCurrentWearLevel(planeEntity.getCurrentWearLevel());
    planeDTO.setTotalFlightHours(planeEntity.getTotalFlightHours());
    planeDTO.setFuelAmount(planeEntity.getFuelAmount());
    planeDTO.setPlaneStatus(planeEntity.getPlaneStatus());
    planeDTO.setCurrentLocationId(planeEntity.getCurrentLocation().getId());
    planeDTO.setAircraftOperator(planeEntity.getAircraftOperator());
    return planeDTO;
  }

  public static ModelDTO toModelDTO(ModelEntity modelEntity) {
    ModelDTO modelDTO = new ModelDTO();
    modelDTO.setId(modelEntity.getId());
    modelDTO.setManufacturer(modelEntity.getManufacturer());
    modelDTO.setPlaneIdentifier(modelEntity.getPlaneIdentifier());
    modelDTO.setModelName(modelEntity.getModelName());
    modelDTO.setCertifier(modelEntity.getCertifier());
    modelDTO.setCertificationStatus(modelEntity.getCertificationStatus());
    modelDTO.setNoiseCategory(modelEntity.getNoiseCategory());
    modelDTO.setFuelCapacity(modelEntity.getFuelCapacity());
    modelDTO.setFuelEfficiency(modelEntity.getFuelEfficiency());
    modelDTO.setMaxPassengerCapacity(modelEntity.getMaxPassengerCapacity());
    modelDTO.setMaxCargoCapacity(modelEntity.getMaxCargoCapacity());
    modelDTO.setEmptyWeight(modelEntity.getEmptyWeight());
    modelDTO.setTailHeight(modelEntity.getTailHeight());
    modelDTO.setWingspan(modelEntity.getWingspan());
    modelDTO.setEngineType(modelEntity.getEngineType());
    modelDTO.setEngineCount(modelEntity.getEngineCount());
    modelDTO.setThrustPerEngine(modelEntity.getThrustPerEngine());
    modelDTO.setMaxCrosswindComp(modelEntity.getMaxCrosswindComp());
    modelDTO.setRequiredRunwayLength(modelEntity.getRequiredRunwayLength());
    modelDTO.setRequiredRunwayWidth(modelEntity.getRequiredRunwayWidth());
    modelDTO.setMinRotationRadius(modelEntity.getMinRotationRadius());
    modelDTO.setCruiseSpeed(modelEntity.getCruiseSpeed());
    modelDTO.setMaxSpeed(modelEntity.getMaxSpeed());
    modelDTO.setStallSpeed(modelEntity.getStallSpeed());
    modelDTO.setMaxAltitude(modelEntity.getMaxAltitude());
    modelDTO.setClimbRate(modelEntity.getClimbRate());
    modelDTO.setDescentRate(modelEntity.getDescentRate());
    modelDTO.setMaxFlightRange(modelEntity.getMaxFlightRange());
    modelDTO.setHasWeatherRadar(modelEntity.getHasWeatherRadar());
    modelDTO.setHasAutopilot(modelEntity.getHasAutopilot());
    modelDTO.setHasFlyByWire(modelEntity.getHasFlyByWire());
    modelDTO.setHasFireSupression(modelEntity.getHasFireSupression());
    modelDTO.setGpsEnabled(modelEntity.getGpsEnabled());
    return modelDTO;
  }

  public static RunwayDTO toRunwayDTO(RunwayEntity runwayEntity) {
    RunwayDTO runwayDTO = new RunwayDTO();
    runwayDTO.setId(runwayEntity.getId());
    runwayDTO.setRunwayNumber(runwayEntity.getRunwayNumber());
    runwayDTO.setAirportId(runwayEntity.getAirport().getId());
    runwayDTO.setLength(runwayEntity.getLength());
    runwayDTO.setWidth(runwayEntity.getWidth());
    runwayDTO.setSurfaceType(runwayEntity.getSurfaceType());
    runwayDTO.setMaxWeightCapacity(runwayEntity.getMaxWeightCapacity());
    runwayDTO.setHasMarkings(runwayEntity.getHasMarkings());
    runwayDTO.setHasLighting(runwayEntity.getHasLighting());
    runwayDTO.setHasILS(runwayEntity.getHasILS());
    runwayDTO.setHasSafetyArea(runwayEntity.getHasSafetyArea());
    runwayDTO.setVisualApproachAid(runwayEntity.getVisualApproachAid());
    runwayDTO.setAltitude(runwayEntity.getAltitude());
    runwayDTO.setStatus(runwayEntity.getStatus());
    runwayDTO.setCrosswindLimit(runwayEntity.getCrosswindLimit());
    return runwayDTO;
  }

  public static TaxiwayDTO toTaxiwayDTO(TaxiwayEntity taxiwayEntity) {
    TaxiwayDTO taxiwayDTO = new TaxiwayDTO();
    taxiwayDTO.setId(taxiwayEntity.getId());
    taxiwayDTO.setName(taxiwayEntity.getName());
    taxiwayDTO.setAirportId(taxiwayEntity.getAirport().getId());
    taxiwayDTO.setLoadCapacity(taxiwayEntity.getLoadCapacity());
    taxiwayDTO.setHasHoldingPoint(taxiwayEntity.getHasHoldingPoint());
    taxiwayDTO.setHasHighSpeedExit(taxiwayEntity.getHasHighSpeedExit());
    taxiwayDTO.setWidth(taxiwayEntity.getWidth());
    taxiwayDTO.setLength(taxiwayEntity.getLength());
    taxiwayDTO.setMaxTurningRadius(taxiwayEntity.getMaxTurningRadius());
    taxiwayDTO.setMaxWeightCapacity(taxiwayEntity.getMaxWeightCapacity());
    taxiwayDTO.setHasLighting(taxiwayEntity.getHasLighting());
    taxiwayDTO.setHasSignage(taxiwayEntity.getHasSignage());
    taxiwayDTO.setConnectedRunwayId(taxiwayEntity.getConnectedRunway().getId());
    return taxiwayDTO;
  }
}
