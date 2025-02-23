package com.flightcoordinator.dataservice.utils;

import java.util.stream.Collectors;

import com.flightcoordinator.dataservice.dto.AirportDTO;
import com.flightcoordinator.dataservice.dto.AlgorithmResultDTO;
import com.flightcoordinator.dataservice.dto.AlgorithmRunDTO;
import com.flightcoordinator.dataservice.dto.CertificationDTO;
import com.flightcoordinator.dataservice.dto.CrewDTO;
import com.flightcoordinator.dataservice.dto.FlightDTO;
import com.flightcoordinator.dataservice.dto.PlaneDTO;
import com.flightcoordinator.dataservice.dto.RouteDTO;
import com.flightcoordinator.dataservice.dto.RunwayDTO;
import com.flightcoordinator.dataservice.dto.VehicleDTO;
import com.flightcoordinator.dataservice.entity.AirportEntity;
import com.flightcoordinator.dataservice.entity.AlgorithmResultEntity;
import com.flightcoordinator.dataservice.entity.AlgorithmRunEntity;
import com.flightcoordinator.dataservice.entity.CertificationEntity;
import com.flightcoordinator.dataservice.entity.CrewEntity;
import com.flightcoordinator.dataservice.entity.FlightEntity;
import com.flightcoordinator.dataservice.entity.PlaneEntity;
import com.flightcoordinator.dataservice.entity.RouteEntity;
import com.flightcoordinator.dataservice.entity.RunwayEntity;
import com.flightcoordinator.dataservice.entity.VehicleEntity;

public class ObjectMapper {
  public static AirportDTO toAirportDTO(AirportEntity airportEntity) {
    AirportDTO airportDTO = new AirportDTO();
    airportDTO.setId(airportEntity.getId());
    airportDTO.setName(airportEntity.getName());
    airportDTO.setIataCode(airportEntity.getIataCode());
    airportDTO.setIcaoCode(airportEntity.getIcaoCode());
    airportDTO.setCountryCode(airportEntity.getCountryCode());
    airportDTO.setType(airportEntity.getType());
    airportDTO.setRunwayIds(airportEntity.getRunways().stream()
        .map(runway -> runway.getId()).collect(Collectors.toList()));
    airportDTO.setVehiclesPresentIds(airportEntity.getVehiclesPresent().stream()
        .map(vehicle -> vehicle.getId()).collect(Collectors.toList()));
    airportDTO.setPlanesPresentIds(airportEntity.getPlanesPresent().stream()
        .map(plane -> plane.getId()).collect(Collectors.toList()));
    airportDTO.setRoutesOriginatingFromAirportIds(airportEntity.getRoutesOriginatingFromAirport().stream()
        .map(route -> route.getId()).collect(Collectors.toList()));
    airportDTO.setRoutesDestinedForAirportIds(airportEntity.getRoutesDestinedForAirport().stream()
        .map(route -> route.getId()).collect(Collectors.toList()));
    airportDTO.setCrewMembersPresentIds(airportEntity.getCrewMembersPresent().stream()
        .map(crew -> crew.getId()).collect(Collectors.toList()));
    return airportDTO;
  }

  public static AlgorithmResultDTO toAlgorithmResultDTO(AlgorithmResultEntity algorithmResultEntity) {
    AlgorithmResultDTO algorithmResultDTO = new AlgorithmResultDTO();
    algorithmResultDTO.setId(algorithmResultEntity.getId());
    algorithmResultDTO.setFlightId(algorithmResultEntity.getFlight().getId());
    algorithmResultDTO.setPlaneId(algorithmResultEntity.getPlane().getId());
    algorithmResultDTO.setCrewMemberIds(algorithmResultEntity.getCrewMembers().stream()
        .map(crew -> crew.getId()).collect(Collectors.toList()));
    algorithmResultDTO.setTakeoffRunwayId(algorithmResultEntity.getTakeoffRunway().getId());
    algorithmResultDTO.setLandingRunwayId(algorithmResultEntity.getLandingRunway().getId());
    algorithmResultDTO.setOriginAirportGroundVehicleIds(algorithmResultEntity.getOriginAirportGroundVehicles().stream()
        .map(vehicle -> vehicle.getId()).collect(Collectors.toList()));
    algorithmResultDTO
        .setDestinationAirportGroundVehicleIds(algorithmResultEntity.getDestinationAirportGroundVehicles().stream()
            .map(vehicle -> vehicle.getId()).collect(Collectors.toList()));
    return algorithmResultDTO;
  }

  public static AlgorithmRunDTO toAlgorithmRunDTO(AlgorithmRunEntity algorithmRunEntity) {
    AlgorithmRunDTO algorithmRunDTO = new AlgorithmRunDTO();
    algorithmRunDTO.setId(algorithmRunEntity.getId());
    algorithmRunDTO.setAlgorithmName(algorithmRunEntity.getAlgorithmName());
    algorithmRunDTO.setStartTime(algorithmRunEntity.getStartTime());
    algorithmRunDTO.setEndTime(algorithmRunEntity.getEndTime());
    algorithmRunDTO.setRuntimeInMilliseconds(algorithmRunEntity.getRuntimeInMilliseconds());
    algorithmRunDTO.setParametersJson(algorithmRunEntity.getParametersJson());
    algorithmRunDTO.setResourcesJson(algorithmRunEntity.getResourcesJson());
    algorithmRunDTO.setConstraintsMet(algorithmRunEntity.getConstraintsMet());
    algorithmRunDTO.setLogs(algorithmRunEntity.getLogs());
    algorithmRunDTO.setIsResultsSaved(algorithmRunEntity.isSuccessful());
    algorithmRunDTO.setFailureReason(algorithmRunEntity.getFailureReason());
    algorithmRunDTO.setIsResultsSaved(algorithmRunEntity.isResultsSaved());
    algorithmRunDTO.setResultId(algorithmRunEntity.getResult().getId());
    return algorithmRunDTO;
  }

  public static CertificationDTO toCertificationDTO(CertificationEntity certificationEntity) {
    CertificationDTO certificationDTO = new CertificationDTO();
    certificationDTO.setId(certificationEntity.getId());
    certificationDTO.setName(certificationEntity.getName());
    certificationDTO.setCertificationNumber(certificationEntity.getCertificationNumber());
    certificationDTO.setIssuer(certificationEntity.getIssuer());
    certificationDTO.setExpirationDate(certificationEntity.getExpirationDate());
    certificationDTO.setValidityPeriod(certificationEntity.getValidityPeriod());
    certificationDTO.setAssignableRole(certificationEntity.getAssignableRole());
    certificationDTO.setDescription(certificationEntity.getDescription());
    certificationDTO.setAssignedCrewMember(certificationEntity.getAssignedCrewMember().getId());
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
    crewDTO.setAvailability(crewEntity.getAvailability());
    return crewDTO;
  }

  public static FlightDTO toFlightDTO(FlightEntity flightEntity) {
    FlightDTO flightDTO = new FlightDTO();
    flightDTO.setId(flightEntity.getId());
    flightDTO.setPassengerCount(flightEntity.getPassengerCount());
    flightDTO.setFlightRouteId(flightEntity.getFlightRoute().getId());
    return flightDTO;
  }

  public static PlaneDTO toPlaneDTO(PlaneEntity planeEntity) {
    PlaneDTO planeDTO = new PlaneDTO();
    planeDTO.setId(planeEntity.getId());
    planeDTO.setModel(planeEntity.getModel());
    planeDTO.setRegistrationNumber(planeEntity.getRegistrationNumber());
    planeDTO.setPassengerCapacity(planeEntity.getPassengerCapacity());
    planeDTO.setFuelEfficiency(planeEntity.getFuelEfficiency());
    planeDTO.setMaxFlightRange(planeEntity.getMaxFlightRange());
    planeDTO.setLastMaintenance(planeEntity.getLastMaintenance());
    planeDTO.setTotalFlightHours(planeEntity.getTotalFlightHours());
    planeDTO.setShortestRunwayLengthRequired(planeEntity.getShortestRunwayLengthRequired());
    planeDTO.setShortestRunwayWidthRequired(planeEntity.getShortestRunwayWidthRequired());
    planeDTO.setPlaneStatus(planeEntity.getPlaneStatus());
    planeDTO.setCurrentLocationId(planeEntity.getCurrentLocation().getId());
    planeDTO.setAircraftOperator(planeEntity.getAircraftOperator());
    return planeDTO;
  }

  public static RouteDTO toRouteDTO(RouteEntity routeEntity) {
    RouteDTO routeDTO = new RouteDTO();
    routeDTO.setId(routeEntity.getId());
    routeDTO.setOriginAirportId(routeEntity.getOriginAirport().getId());
    routeDTO.setDestinationAirportId(routeEntity.getDestinationAirport().getId());
    routeDTO.setDistance(routeEntity.getDistance());
    routeDTO.setEstimatedTime(routeEntity.getEstimatedTime());
    return routeDTO;
  }

  public static RunwayDTO toRunwayDTO(RunwayEntity runwayEntity) {
    RunwayDTO runwayDTO = new RunwayDTO();
    runwayDTO.setId(runwayEntity.getId());
    runwayDTO.setLength(runwayEntity.getLength());
    runwayDTO.setWidth(runwayEntity.getWidth());
    runwayDTO.setSurfaceType(runwayEntity.getSurfaceType());
    runwayDTO.setMaxWeightCapacity(runwayEntity.getMaxWeightCapacity());
    runwayDTO.setOrientation(runwayEntity.getOrientation());
    runwayDTO.setAirportId(runwayEntity.getAirport().getId());
    return runwayDTO;
  }

  public static VehicleDTO toVehicleDTO(VehicleEntity vehicleEntity) {
    VehicleDTO vehicleDTO = new VehicleDTO();
    vehicleDTO.setId(vehicleEntity.getId());
    vehicleDTO.setType(vehicleEntity.getType());
    vehicleDTO.setVehicleCode(vehicleEntity.getVehicleCode());
    vehicleDTO.setCapacity(vehicleEntity.getCapacity());
    vehicleDTO.setAvailability(vehicleEntity.getAvailability());
    vehicleDTO.setMaintenanceDue(vehicleEntity.getMaintenanceDue());
    vehicleDTO.setAirportId(vehicleEntity.getAirport().getId());
    return vehicleDTO;
  }
}
