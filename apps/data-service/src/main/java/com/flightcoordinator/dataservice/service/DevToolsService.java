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

    for (int i = 0; i < 20; i++) {
      CrewEntity crewMember = new CrewEntity();

      crewMember.setFullName(SampleData.Crew.sampleFullName.get(i));
      crewMember.setEmail(SampleData.Crew.sampleEmail.get(i));
      crewMember.setPhoneNumber(SampleData.Crew.samplePhoneNumber.get(i));
      crewMember.setRole(SampleData.Crew.sampleRole.get(i));
      crewMember.setTotalFlightHours(SampleData.Crew.sampleTotalFlightHours.get(i));
      crewMember.setBaseAirport(allAirports.get((allAirports.size() - 1) - i));
      crewMember.setStatus(SampleData.Crew.sampleStatus.get(i));

      crewRepository.save(crewMember);
    }
  }

  private void generateSampleCertifications() throws ParseException {
    List<CrewEntity> allCrewEntities = crewRepository.findAll();

    for (int i = 0; i < 40; i++) {
      CertificationEntity certification = new CertificationEntity();

      certification.setName(SampleData.Certification.sampleName.get(i));
      certification.setCertificationNumber(SampleData.Certification.sampleCertificationNumber.get(i));
      certification.setIssuer(SampleData.Certification.sampleIssuer.get(i));
      certification.setExpirationDate(dateFormat.parse(SampleData.Certification.sampleExpirationDate.get(i)));
      certification.setValidityPeriod(SampleData.Certification.sampleValidityPeriod.get(i));
      certification.setDescription(SampleData.Certification.sampleDescription.get(i));
      certification.setAssignedCrewMember(allCrewEntities.removeFirst());

      certificationRepository.save(certification);
    }
  }

  private void generateSampleFlights() {
    List<AirportEntity> allAirportEntities = airportRepository.findAll();

    for (int i = 0; i < 10; i++) {
      FlightEntity flight = new FlightEntity();

      Float flightDuration = randomValue.nextFloat(60, 240);
      List<LocalTime> times = generateRandomTimestamps(Duration.ofMinutes(((long) flightDuration.floatValue())));

      flight.setPassengerCount(SampleData.Flight.samplepassengerCount.get(i));
      flight.setCargoWeight(SampleData.Flight.samplecargoWeight.get(i));
      flight.setOriginAirport(allAirportEntities.get(randomValue.nextInt(0, allAirportEntities.size() - 1)));
      flight.setDestinationAirport(allAirportEntities.get(randomValue.nextInt(0, allAirportEntities.size() - 1)));
      flight.setDistance(SampleData.Flight.sampledistance.get(i));
      flight.setEstimatedTakeoffTime(times.get(1).toString());
      flight.setEstimatedLandingTime(times.get(2).toString());
      flight.setEstimatedFlightDuration(flightDuration);

      flightRepository.save(flight);
    }
  }

  private void generateSampleModels() {
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
      plane.setCurrentLocation(i % 2 == 0 ? allAirports.removeFirst() : allAirports.removeLast());
      plane.setAircraftOperator(SampleData.Plane.sampleAircraftOperator.get(i));

      planeRepository.save(plane);
    }
  }

  private void generateSampleRunways() {
    List<AirportEntity> allAirports = airportRepository.findAll();

    for (int i = 0; i < 40; i++) {
      RunwayEntity runway = new RunwayEntity();

      runway.setRunwayNumber(SampleData.Runway.sampleRunwayNumber.get(i));
      runway.setAirport(allAirports.get(allAirports.size() % i));
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

      runwayRepository.save(runway);
    }
  }

  private void generateSampleTaxiways() {
    List<AirportEntity> allAirports = airportRepository.findAll();
    List<RunwayEntity> allRunways = runwayRepository.findAll();

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
