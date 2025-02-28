package com.flightcoordinator.dataservice.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.SampleData;
import com.flightcoordinator.dataservice.entity.AirportEntity;
import com.flightcoordinator.dataservice.entity.CertificationEntity;
import com.flightcoordinator.dataservice.entity.CrewEntity;
import com.flightcoordinator.dataservice.entity.FlightEntity;
import com.flightcoordinator.dataservice.entity.ModelEntity;
import com.flightcoordinator.dataservice.entity.PlaneEntity;
import com.flightcoordinator.dataservice.entity.RunwayEntity;
import com.flightcoordinator.dataservice.entity.TaxiwayEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.AirportRepository;
import com.flightcoordinator.dataservice.repository.CertificationRepository;
import com.flightcoordinator.dataservice.repository.CrewRepository;
import com.flightcoordinator.dataservice.repository.FlightRepository;
import com.flightcoordinator.dataservice.repository.ModelRepository;
import com.flightcoordinator.dataservice.repository.PlaneRepository;
import com.flightcoordinator.dataservice.repository.RunwayRepository;
import com.flightcoordinator.dataservice.repository.TaxiwayRepository;

@Service
public class DevToolsService {
  @Autowired
  private AirportRepository airportRepository;

  @Autowired
  private CertificationRepository certificationRepository;

  @Autowired
  private CrewRepository crewRepository;

  @Autowired
  private FlightRepository flightRepository;

  @Autowired
  private ModelRepository modelRepository;

  @Autowired
  private PlaneRepository planeRepository;

  @Autowired
  private RunwayRepository runwayRepository;

  @Autowired
  private TaxiwayRepository taxiwayRepository;

  private final Random randomValue = new Random();

  private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

  private List<LocalTime> generateRandomTimestamps(Duration duration) {
    LocalTime first = LocalTime.of(randomValue.nextInt(24), randomValue.nextInt(60));
    LocalTime second = first.plus(duration);

    if (second.isAfter(LocalTime.MAX)) {
      second = LocalTime.MAX;
    }
    return Arrays.asList(first, second);
  }

  private void generateSampleAirports() {
    if (SampleData.Airport.sampleAirportName.size() < 20 ||
        SampleData.Airport.sampleIATACode.size() < 20 ||
        SampleData.Airport.sampleICAOCode.size() < 20 ||
        SampleData.Airport.sampleCountryCode.size() < 20 ||
        SampleData.Airport.sampleType.size() < 20 ||
        SampleData.Airport.sampleOperationStartTime.size() < 20 ||
        SampleData.Airport.sampleOperationStopTime.size() < 20 ||
        SampleData.Airport.sampleElevation.size() < 20 ||
        SampleData.Airport.sampleSlope.size() < 20 ||
        SampleData.Airport.samplePossibleNoiseCategory.size() < 20) {
      throw new AppError(
          "Sample airport data is incomplete. Each list should have at least 20 entries",
          HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    for (int i = 0; i < 20; i++) {
      AirportEntity airport = new AirportEntity();

      airport.setName(SampleData.Airport.sampleAirportName.get(i));
      airport.setIataCode(SampleData.Airport.sampleIATACode.get(i));
      airport.setIcaoCode(SampleData.Airport.sampleICAOCode.get(i));
      airport.setCountryCode(SampleData.Airport.sampleCountryCode.get(i));
      airport.setType(SampleData.Airport.sampleType.get(i));
      airport.setOperationStartTime(SampleData.Airport.sampleOperationStartTime.get(i));
      airport.setOperationStopTime(SampleData.Airport.sampleOperationStopTime.get(i));
      airport.setElevation(SampleData.Airport.sampleElevation.get(i));
      airport.setSlope(SampleData.Airport.sampleSlope.get(i));
      airport.setPossibleNoiseCategory(SampleData.Airport.samplePossibleNoiseCategory.get(i));

      airportRepository.save(airport);
    }
  }

  private void generateSampleCrewMembers() {
    List<AirportEntity> allAirports = airportRepository.findAll();

    if (SampleData.Crew.sampleFullName.size() < 20 ||
        SampleData.Crew.sampleEmail.size() < 20 ||
        SampleData.Crew.samplePhoneNumber.size() < 20 ||
        SampleData.Crew.sampleRole.size() < 20 ||
        SampleData.Crew.sampleTotalFlightHours.size() < 20 ||
        SampleData.Crew.sampleStatus.size() < 20 ||
        allAirports.size() < 20) {
      System.out.println("sampleFullName: " + SampleData.Crew.sampleFullName.size());
      System.out.println("sampleEmail: " + SampleData.Crew.sampleEmail.size());
      System.out.println("samplePhoneNumber: " + SampleData.Crew.samplePhoneNumber.size());
      System.out.println("sampleRole: " + SampleData.Crew.sampleRole.size());
      System.out.println("sampleTotalFlightHours: " + SampleData.Crew.sampleTotalFlightHours.size());
      System.out.println("sampleStatus: " + SampleData.Crew.sampleStatus.size());
      System.out.println("AirportEntity count: " + allAirports.size());
      throw new AppError(
          "Sample crew member data is incomplete. Each list should have at least 20 entries",
          HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    for (int i = 0; i < 20; i++) {
      CrewEntity crewMember = new CrewEntity();

      crewMember.setFullName(SampleData.Crew.sampleFullName.get(i));
      crewMember.setEmail(SampleData.Crew.sampleEmail.get(i));
      crewMember.setPhoneNumber(SampleData.Crew.samplePhoneNumber.get(i));
      crewMember.setRole(SampleData.Crew.sampleRole.get(i));
      crewMember.setTotalFlightHours(SampleData.Crew.sampleTotalFlightHours.get(i));
      crewMember.setCurrentAirport(allAirports.get((allAirports.size() - 1) - i));
      crewMember.setBaseAirport(allAirports.get(i));
      crewMember.setStatus(SampleData.Crew.sampleStatus.get(i));

      crewRepository.save(crewMember);
    }
  }

  private void generateSampleCertifications() throws ParseException {
    List<CrewEntity> allCrewEntities = crewRepository.findAll();

    if (SampleData.Certification.sampleName.size() < 40
        || SampleData.Certification.sampleCertificationNumber.size() < 40
        || SampleData.Certification.sampleIssuer.size() < 40
        || SampleData.Certification.sampleExpirationDate.size() < 40
        || SampleData.Certification.sampleValidityPeriod.size() < 40
        || SampleData.Certification.sampleDescription.size() < 40
        || allCrewEntities.size() < 20) {
      System.out.println("sampleName count: " + SampleData.Certification.sampleName.size());
      System.out
          .println("sampleCertificationNumber count: " + SampleData.Certification.sampleCertificationNumber.size());
      System.out.println("sampleIssuer count: " + SampleData.Certification.sampleIssuer.size());
      System.out.println("sampleExpirationDate count: " + SampleData.Certification.sampleExpirationDate.size());
      System.out.println("sampleValidityPeriod count: " + SampleData.Certification.sampleValidityPeriod.size());
      System.out.println("sampleDescription count: " + SampleData.Certification.sampleDescription.size());
      System.out.println("CrewEntity count: " + allCrewEntities.size());
      throw new AppError(
          "Sample certification data is incomplete. Each list should have at least 20 entries",
          HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    for (int i = 0; i < 40; i++) {
      CertificationEntity certification = new CertificationEntity();

      certification.setName(SampleData.Certification.sampleName.get(i));
      certification.setCertificationNumber(SampleData.Certification.sampleCertificationNumber.get(i));
      certification.setIssuer(SampleData.Certification.sampleIssuer.get(i));
      certification.setExpirationDate(dateFormat.parse(SampleData.Certification.sampleExpirationDate.get(i)));
      certification.setValidityPeriod(SampleData.Certification.sampleValidityPeriod.get(i));
      certification.setDescription(SampleData.Certification.sampleDescription.get(i));
      certification.setAssignedCrewMember(allCrewEntities.get((i + 1) % allCrewEntities.size()));

      certificationRepository.save(certification);
    }
  }

  private void generateSampleFlights() {
    List<AirportEntity> allAirportEntities = airportRepository.findAll();

    if (SampleData.Flight.samplepassengerCount.size() < 10 ||
        SampleData.Flight.samplecargoWeight.size() < 10 ||
        SampleData.Flight.sampledistance.size() < 10 ||
        allAirportEntities.size() < 10) {
      System.out.println("samplepassengerCount: " + SampleData.Flight.samplepassengerCount.size());
      System.out.println("samplecargoWeight: " + SampleData.Flight.samplecargoWeight.size());
      System.out.println("sampledistance: " + SampleData.Flight.sampledistance.size());
      System.out.println("AirportEntity count: " + allAirportEntities.size());
      throw new AppError(
          "Sample flight data is incomplete. Each list should have at least 10 entries",
          HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    for (int i = 0; i < 10; i++) {
      FlightEntity flight = new FlightEntity();

      Float flightDuration = randomValue.nextFloat(60, 240);
      List<LocalTime> times = generateRandomTimestamps(Duration.ofMinutes(((long) flightDuration.floatValue())));

      flight.setPassengerCount(SampleData.Flight.samplepassengerCount.get(i));
      flight.setCargoWeight(SampleData.Flight.samplecargoWeight.get(i));
      flight.setOriginAirport(allAirportEntities.get(randomValue.nextInt(0, allAirportEntities.size() - 1)));
      flight.setDestinationAirport(allAirportEntities.get(randomValue.nextInt(0, allAirportEntities.size() - 1)));
      flight.setDistance(SampleData.Flight.sampledistance.get(i));
      flight.setEstimatedTakeoffTime(times.get(0).toString());
      flight.setEstimatedLandingTime(times.get(1).toString());
      flight.setEstimatedFlightDuration(flightDuration);

      flightRepository.save(flight);
    }
  }

  private void generateSampleModels() {
    if (SampleData.Model.sampleManufacturer.size() < 20 ||
        SampleData.Model.samplePlaneIdentifier.size() < 20 ||
        SampleData.Model.sampleModelName.size() < 20 ||
        SampleData.Model.sampleCertifier.size() < 20 ||
        SampleData.Model.sampleCertificationStatus.size() < 20 ||
        SampleData.Model.sampleNoiseCategory.size() < 20 ||
        SampleData.Model.sampleFuelCapacity.size() < 20 ||
        SampleData.Model.sampleFuelEfficiency.size() < 20 ||
        SampleData.Model.samplePassengerCapacity.size() < 20 ||
        SampleData.Model.sampleMaxCargoCapacity.size() < 20 ||
        SampleData.Model.sampleEmptyWeight.size() < 20 ||
        SampleData.Model.sampleTailHeight.size() < 20 ||
        SampleData.Model.sampleWingspan.size() < 20 ||
        SampleData.Model.sampleEngineType.size() < 20 ||
        SampleData.Model.sampleEngineCount.size() < 20 ||
        SampleData.Model.sampleThrustPerEngine.size() < 20 ||
        SampleData.Model.sampleMaxCrosswindComp.size() < 20 ||
        SampleData.Model.sampleRequiredRunwayLength.size() < 20 ||
        SampleData.Model.sampleRequiredRunwayWidth.size() < 20 ||
        SampleData.Model.sampleMinRotationRadius.size() < 20 ||
        SampleData.Model.sampleCruiseSpeed.size() < 20 ||
        SampleData.Model.sampleMaxSpeed.size() < 20 ||
        SampleData.Model.sampleStallSpeed.size() < 20 ||
        SampleData.Model.sampleMaxAltitude.size() < 20 ||
        SampleData.Model.sampleClimbRate.size() < 20 ||
        SampleData.Model.sampleDescentRate.size() < 20 ||
        SampleData.Model.sampleMaxFlightRange.size() < 20 ||
        SampleData.Model.sampleHasWeatherRadar.size() < 20 ||
        SampleData.Model.sampleHasAutopilot.size() < 20 ||
        SampleData.Model.sampleHasFlyByWire.size() < 20 ||
        SampleData.Model.sampleHasFireSupression.size() < 20 ||
        SampleData.Model.sampleGpsEnabled.size() < 20) {
      System.out.println("sampleManufacturer count: " + SampleData.Model.sampleManufacturer.size());
      System.out.println("samplePlaneIdentifier count: " + SampleData.Model.samplePlaneIdentifier.size());
      System.out.println("sampleModelName count: " + SampleData.Model.sampleModelName.size());
      System.out.println("sampleCertifier count: " + SampleData.Model.sampleCertifier.size());
      System.out.println("sampleCertificationStatus count: " + SampleData.Model.sampleCertificationStatus.size());
      System.out.println("sampleNoiseCategory count: " + SampleData.Model.sampleNoiseCategory.size());
      System.out.println("sampleFuelCapacity count: " + SampleData.Model.sampleFuelCapacity.size());
      System.out.println("sampleFuelEfficiency count: " + SampleData.Model.sampleFuelEfficiency.size());
      System.out.println("samplePassengerCapacity count: " + SampleData.Model.samplePassengerCapacity.size());
      System.out.println("sampleMaxCargoCapacity count: " + SampleData.Model.sampleMaxCargoCapacity.size());
      System.out.println("sampleEmptyWeight count: " + SampleData.Model.sampleEmptyWeight.size());
      System.out.println("sampleTailHeight count: " + SampleData.Model.sampleTailHeight.size());
      System.out.println("sampleWingspan count: " + SampleData.Model.sampleWingspan.size());
      System.out.println("sampleEngineType count: " + SampleData.Model.sampleEngineType.size());
      System.out.println("sampleEngineCount count: " + SampleData.Model.sampleEngineCount.size());
      System.out.println("sampleThrustPerEngine count: " + SampleData.Model.sampleThrustPerEngine.size());
      System.out.println("sampleMaxCrosswindComp count: " + SampleData.Model.sampleMaxCrosswindComp.size());
      System.out.println("sampleRequiredRunwayLength count: " + SampleData.Model.sampleRequiredRunwayLength.size());
      System.out.println("sampleRequiredRunwayWidth count: " + SampleData.Model.sampleRequiredRunwayWidth.size());
      System.out.println("sampleMinRotationRadius count: " + SampleData.Model.sampleMinRotationRadius.size());
      System.out.println("sampleCruiseSpeed count: " + SampleData.Model.sampleCruiseSpeed.size());
      System.out.println("sampleMaxSpeed count: " + SampleData.Model.sampleMaxSpeed.size());
      System.out.println("sampleStallSpeed count: " + SampleData.Model.sampleStallSpeed.size());
      System.out.println("sampleMaxAltitude count: " + SampleData.Model.sampleMaxAltitude.size());
      System.out.println("sampleClimbRate count: " + SampleData.Model.sampleClimbRate.size());
      System.out.println("sampleDescentRate count: " + SampleData.Model.sampleDescentRate.size());
      System.out.println("sampleMaxFlightRange count: " + SampleData.Model.sampleMaxFlightRange.size());
      System.out.println("sampleHasWeatherRadar count: " + SampleData.Model.sampleHasWeatherRadar.size());
      System.out.println("sampleHasAutopilot count: " + SampleData.Model.sampleHasAutopilot.size());
      System.out.println("sampleHasFlyByWire count: " + SampleData.Model.sampleHasFlyByWire.size());
      System.out.println("sampleHasFireSupression count: " + SampleData.Model.sampleHasFireSupression.size());
      System.out.println("sampleGpsEnabled count: " + SampleData.Model.sampleGpsEnabled.size());
      throw new AppError(
          "Sample model data is incomplete. Each list should have at least 20 entries",
          HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    for (int i = 0; i < 20; i++) {
      ModelEntity model = new ModelEntity();

      model.setManufacturer(SampleData.Model.sampleManufacturer.get(i));
      model.setPlaneIdentifier(SampleData.Model.samplePlaneIdentifier.get(i));
      model.setModelName(SampleData.Model.sampleModelName.get(i));
      model.setCertifier(SampleData.Model.sampleCertifier.get(i));
      model.setCertificationStatus(SampleData.Model.sampleCertificationStatus.get(i));
      model.setNoiseCategory(SampleData.Model.sampleNoiseCategory.get(i));
      model.setFuelCapacity(SampleData.Model.sampleFuelCapacity.get(i));
      model.setFuelEfficiency(SampleData.Model.sampleFuelEfficiency.get(i));
      model.setMaxPassengerCapacity(SampleData.Model.samplePassengerCapacity.get(i));
      model.setMaxCargoCapacity(SampleData.Model.sampleMaxCargoCapacity.get(i));
      model.setEmptyWeight(SampleData.Model.sampleEmptyWeight.get(i));
      model.setTailHeight(SampleData.Model.sampleTailHeight.get(i));
      model.setWingspan(SampleData.Model.sampleWingspan.get(i));
      model.setEngineType(SampleData.Model.sampleEngineType.get(i));
      model.setEngineCount(SampleData.Model.sampleEngineCount.get(i));
      model.setThrustPerEngine(SampleData.Model.sampleThrustPerEngine.get(i));
      model.setMaxCrosswindComp(SampleData.Model.sampleMaxCrosswindComp.get(i));
      model.setRequiredRunwayLength(SampleData.Model.sampleRequiredRunwayLength.get(i));
      model.setRequiredRunwayWidth(SampleData.Model.sampleRequiredRunwayWidth.get(i));
      model.setMinRotationRadius(SampleData.Model.sampleMinRotationRadius.get(i));
      model.setCruiseSpeed(SampleData.Model.sampleCruiseSpeed.get(i));
      model.setMaxSpeed(SampleData.Model.sampleMaxSpeed.get(i));
      model.setStallSpeed(SampleData.Model.sampleStallSpeed.get(i));
      model.setMaxAltitude(SampleData.Model.sampleMaxAltitude.get(i));
      model.setClimbRate(SampleData.Model.sampleClimbRate.get(i));
      model.setDescentRate(SampleData.Model.sampleDescentRate.get(i));
      model.setMaxFlightRange(SampleData.Model.sampleMaxFlightRange.get(i));
      model.setHasWeatherRadar(SampleData.Model.sampleHasWeatherRadar.get(i));
      model.setHasAutopilot(SampleData.Model.sampleHasAutopilot.get(i));
      model.setHasFlyByWire(SampleData.Model.sampleHasFlyByWire.get(i));
      model.setHasFireSupression(SampleData.Model.sampleHasFireSupression.get(i));
      model.setGpsEnabled(SampleData.Model.sampleGpsEnabled.get(i));

      modelRepository.save(model);
    }
  }

  private void generateSamplePlanes() throws ParseException {
    List<ModelEntity> allPlaneModels = modelRepository.findAll();
    List<AirportEntity> allAirports = airportRepository.findAll();

    if (SampleData.Plane.sampleTailNumber.size() < 20 ||
        SampleData.Plane.sampleNextMaintenanceDate.size() < 20 ||
        SampleData.Plane.sampleRetirementDate.size() < 20 ||
        SampleData.Plane.sampleEngineHours.size() < 20 ||
        SampleData.Plane.sampleWearLevel.size() < 20 ||
        SampleData.Plane.sampleTotalFlightHours.size() < 20 ||
        SampleData.Plane.sampleFuelAmount.size() < 20 ||
        SampleData.Plane.samplePlaneStatus.size() < 20 ||
        SampleData.Plane.sampleAircraftOperator.size() < 20 ||
        allPlaneModels.size() < 20 || allAirports.size() < 20) {
      System.out.println("sampleTailNumber: " + SampleData.Plane.sampleTailNumber.size());
      System.out.println("sampleNextMaintenanceDate: " + SampleData.Plane.sampleNextMaintenanceDate.size());
      System.out.println("sampleRetirementDate: " + SampleData.Plane.sampleRetirementDate.size());
      System.out.println("sampleEngineHours: " + SampleData.Plane.sampleEngineHours.size());
      System.out.println("sampleWearLevel: " + SampleData.Plane.sampleWearLevel.size());
      System.out.println("sampleTotalFlightHours: " + SampleData.Plane.sampleTotalFlightHours.size());
      System.out.println("sampleFuelAmount: " + SampleData.Plane.sampleFuelAmount.size());
      System.out.println("samplePlaneStatus: " + SampleData.Plane.samplePlaneStatus.size());
      System.out.println("sampleAircraftOperator: " + SampleData.Plane.sampleAircraftOperator.size());
      throw new AppError(
          "Sample plane data is incomplete. Each list should have at least 20 entries",
          HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    for (int i = 0; i < 20; i++) {
      PlaneEntity plane = new PlaneEntity();

      plane.setModel(allPlaneModels.get(i));
      plane.setTailNumber(SampleData.Plane.sampleTailNumber.get(i));
      plane.setNextMaintenanceDate(dateFormat.parse(SampleData.Plane.sampleNextMaintenanceDate.get(i)));
      plane.setCyclesSinceLastMaintenance(randomValue.nextInt(7, 14));
      plane.setRetirementDate(dateFormat.parse(SampleData.Plane.sampleRetirementDate.get(i)));
      plane.setEngineHours(SampleData.Plane.sampleEngineHours.get(i));
      plane.setCurrentWearLevel(SampleData.Plane.sampleWearLevel.get(i));
      plane.setTotalFlightHours(SampleData.Plane.sampleTotalFlightHours.get(i));
      plane.setFuelAmount(SampleData.Plane.sampleFuelAmount.get(i));
      plane.setPlaneStatus(SampleData.Plane.samplePlaneStatus.get(i));
      plane.setCurrentLocation(allAirports.get((i + 1) % allAirports.size()));
      plane.setAircraftOperator(SampleData.Plane.sampleAircraftOperator.get(i));

      planeRepository.save(plane);
    }
  }

  private void generateSampleRunways() {
    List<AirportEntity> allAirports = airportRepository.findAll();

    if (SampleData.Runway.sampleRunwayNumber.size() < 40 ||
        SampleData.Runway.sampleLength.size() < 40 ||
        SampleData.Runway.sampleWidth.size() < 40 ||
        SampleData.Runway.sampleSurfaceType.size() < 40 ||
        SampleData.Runway.sampleMaxWeightCapacity.size() < 40 ||
        SampleData.Runway.sampleHasMarking.size() < 40 ||
        SampleData.Runway.sampleHasLighting.size() < 40 ||
        SampleData.Runway.sampleHasILS.size() < 40 ||
        SampleData.Runway.sampleHasSafetyArea.size() < 40 ||
        SampleData.Runway.sampleVisualApproachAid.size() < 40 ||
        SampleData.Runway.sampleAltitude.size() < 40 ||
        SampleData.Runway.sampleRunwayStatus.size() < 40 ||
        SampleData.Runway.sampleCrosswindLimit.size() < 40 ||
        allAirports.size() < 20) {
      System.out.println("sampleRunwayNumber: " + SampleData.Runway.sampleRunwayNumber.size());
      System.out.println("sampleLength: " + SampleData.Runway.sampleLength.size());
      System.out.println("sampleWidth: " + SampleData.Runway.sampleWidth.size());
      System.out.println("sampleSurfaceType: " + SampleData.Runway.sampleSurfaceType.size());
      System.out.println("sampleMaxWeightCapacity: " + SampleData.Runway.sampleMaxWeightCapacity.size());
      System.out.println("sampleHasMarking: " + SampleData.Runway.sampleHasMarking.size());
      System.out.println("sampleHasLighting: " + SampleData.Runway.sampleHasLighting.size());
      System.out.println("sampleHasILS: " + SampleData.Runway.sampleHasILS.size());
      System.out.println("sampleHasSafetyArea: " + SampleData.Runway.sampleHasSafetyArea.size());
      System.out.println("sampleVisualApproachAid: " + SampleData.Runway.sampleVisualApproachAid.size());
      System.out.println("sampleAltitude: " + SampleData.Runway.sampleAltitude.size());
      System.out.println("sampleRunwayStatus: " + SampleData.Runway.sampleRunwayStatus.size());
      System.out.println("sampleCrosswindLimit: " + SampleData.Runway.sampleCrosswindLimit.size());
      System.out.println("AirportEntity count: " + allAirports.size());
      throw new AppError(
          "Sample runway data is incomplete. Each list should have at least 40 entries",
          HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    int airportIter = 0;

    for (int i = 0; i < 40; i++) {
      RunwayEntity runway = new RunwayEntity();

      runway.setRunwayNumber(SampleData.Runway.sampleRunwayNumber.get(i));
      runway.setAirport(allAirports.get(airportIter));
      runway.setLength(SampleData.Runway.sampleLength.get(i));
      runway.setWidth(SampleData.Runway.sampleWidth.get(i));
      runway.setSurfaceType(SampleData.Runway.sampleSurfaceType.get(i));
      runway.setMaxWeightCapacity(SampleData.Runway.sampleMaxWeightCapacity.get(i));
      runway.setHasMarkings(SampleData.Runway.sampleHasMarking.get(i));
      runway.setHasLighting(SampleData.Runway.sampleHasLighting.get(i));
      runway.setHasILS(SampleData.Runway.sampleHasILS.get(i));
      runway.setHasSafetyArea(SampleData.Runway.sampleHasSafetyArea.get(i));
      runway.setVisualApproachAid(SampleData.Runway.sampleVisualApproachAid.get(i));
      runway.setAltitude(SampleData.Runway.sampleAltitude.get(i));
      runway.setStatus(SampleData.Runway.sampleRunwayStatus.get(i));
      runway.setCrosswindLimit(SampleData.Runway.sampleCrosswindLimit.get(i));

      if (i % 2 == 0 && airportIter < (allAirports.size() - 1))
        airportIter++;

      runwayRepository.save(runway);
    }
  }

  private void generateSampleTaxiways() {
    List<AirportEntity> allAirports = airportRepository.findAll();
    List<RunwayEntity> allRunways = runwayRepository.findAll();

    if (SampleData.Taxiway.sampleName.size() < 50 ||
        SampleData.Taxiway.sampleLoadCapacity.size() < 50 ||
        SampleData.Taxiway.sampleHasHighSpeedExit.size() < 50 ||
        SampleData.Taxiway.sampleWidth.size() < 50 ||
        SampleData.Taxiway.sampleLength.size() < 50 ||
        SampleData.Taxiway.sampleMaxTurningRadius.size() < 50 ||
        SampleData.Taxiway.sampleMaxWeightCapacity.size() < 50) {
      System.out.println("sampleName: " + SampleData.Taxiway.sampleName.size());
      System.out.println("sampleLoadCapacity: " + SampleData.Taxiway.sampleLoadCapacity.size());
      System.out.println("sampleHasHighSpeedExit: " + SampleData.Taxiway.sampleHasHighSpeedExit.size());
      System.out.println("sampleWidth: " + SampleData.Taxiway.sampleWidth.size());
      System.out.println("sampleLength: " + SampleData.Taxiway.sampleLength.size());
      System.out.println("sampleMaxTurningRadius: " + SampleData.Taxiway.sampleMaxTurningRadius.size());
      System.out.println("sampleMaxWeightCapacity: " + SampleData.Taxiway.sampleMaxWeightCapacity.size());
      throw new AppError(
          "Sample taxiway data is incomplete. Each list should have at least 50 entries",
          HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    for (int i = 0; i < 50; i++) {
      TaxiwayEntity taxiway = new TaxiwayEntity();

      AirportEntity airport = allAirports.get((i + 1) % allAirports.size());

      taxiway.setName(SampleData.Taxiway.sampleName.get(i));
      taxiway.setAirport(airport);
      taxiway.setLoadCapacity(SampleData.Taxiway.sampleLoadCapacity.get(i));
      taxiway.setHasHoldingPoint(i % 5 == 0 && i % 4 == 0);
      taxiway.setHasHighSpeedExit(SampleData.Taxiway.sampleHasHighSpeedExit.get(i));
      taxiway.setWidth(SampleData.Taxiway.sampleWidth.get(i));
      taxiway.setLength(SampleData.Taxiway.sampleLength.get(i));
      taxiway.setMaxTurningRadius(SampleData.Taxiway.sampleMaxTurningRadius.get(i));
      taxiway.setMaxWeightCapacity(SampleData.Taxiway.sampleMaxWeightCapacity.get(i));
      taxiway.setHasLighting(i % 6 == 0 && i % 9 == 0);
      taxiway.setHasSignage(i % 2 == 0 && i % 5 == 0);
      taxiway
          .setConnectedRunway(allRunways.stream().filter(runway -> runway.getAirport().getId().equals(airport.getId()))
              .collect(Collectors.toList()).getFirst());

      taxiwayRepository.save(taxiway);
    }
  }

  public void generateSampleData() {
    try {
      generateSampleAirports();
      generateSampleCrewMembers();
      generateSampleCertifications();
      generateSampleFlights();
      generateSampleModels();
      generateSamplePlanes();
      generateSampleRunways();
      generateSampleTaxiways();
    } catch (ParseException e) {
      throw new AppError(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(), HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
  }
}
