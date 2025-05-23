package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.automation.AutomationEngine;
import com.flightcoordinator.dataservice.automation.GeneratedFlightPlan;
import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.FlightPlanDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.entity.CertificationEntity;
import com.flightcoordinator.dataservice.entity.CrewEntity;
import com.flightcoordinator.dataservice.entity.FlightEntity;
import com.flightcoordinator.dataservice.entity.FlightPlanEntity;
import com.flightcoordinator.dataservice.entity.ModelEntity;
import com.flightcoordinator.dataservice.entity.PlaneEntity;
import com.flightcoordinator.dataservice.entity.RunwayEntity;
import com.flightcoordinator.dataservice.entity.TaxiwayEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.CertificationRepository;
import com.flightcoordinator.dataservice.repository.CrewRepository;
import com.flightcoordinator.dataservice.repository.FlightPlanRepository;
import com.flightcoordinator.dataservice.repository.FlightRepository;
import com.flightcoordinator.dataservice.repository.ModelRepository;
import com.flightcoordinator.dataservice.repository.PlaneRepository;
import com.flightcoordinator.dataservice.repository.RunwayRepository;
import com.flightcoordinator.dataservice.repository.TaxiwayRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class FlightPlanService {
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

  @Autowired
  private FlightPlanRepository flightPlanRepository;

  public FlightPlanDTO getSingleFlightPlanById(EntityIdDTO entityIdDTO) {
    FlightPlanEntity flightPlan = flightPlanRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    FlightPlanDTO flightPlanDTO = ObjectMapper.toFlightPlanDTO(flightPlan);
    return flightPlanDTO;
  }

  public List<FlightPlanDTO> getMultipleFlightPlansById(List<EntityIdDTO> entityIdDTOs) {
    List<FlightPlanEntity> flightPlans = flightPlanRepository.findAllById(
        entityIdDTOs.stream().map(
            entityId -> entityId.getId()).collect(Collectors.toList()));
    if (flightPlans.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<FlightPlanDTO> flightPlanDTOs = flightPlans.stream().map(ObjectMapper::toFlightPlanDTO)
        .collect(Collectors.toList());
    return flightPlanDTOs;
  }

  public List<FlightPlanDTO> getAllFlightPlans() {
    List<FlightPlanEntity> flightPlans = flightPlanRepository.findAll();
    if (flightPlans.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<FlightPlanDTO> flightPlanDTOs = flightPlans.stream().map(ObjectMapper::toFlightPlanDTO)
        .collect(Collectors.toList());
    return flightPlanDTOs;
  }

  public void createFlightPlan(EntityIdDTO flightId) {
    FlightEntity flight = flightRepository.findById(flightId.getId())
        .orElseThrow(() -> new AppError("Invalid flight ID", HttpStatus.BAD_REQUEST.value()));

    List<PlaneEntity> planes = planeRepository.findAll();
    List<ModelEntity> planeModels = modelRepository.findAll();
    List<RunwayEntity> runways = runwayRepository.findAll();
    List<TaxiwayEntity> taxiways = taxiwayRepository.findAll();
    List<CrewEntity> crewMembers = crewRepository.findAll();
    List<CertificationEntity> certifications = certificationRepository.findAll();

    if (planes.isEmpty() || planeModels.isEmpty() || runways.isEmpty() || taxiways.isEmpty() || crewMembers.isEmpty()
        || certifications.isEmpty()) {
      throw new AppError("You need to enter data for all categories", HttpStatus.BAD_REQUEST.value());
    }

    AutomationEngine automationEngine = new AutomationEngine(
        flight,
        planes,
        planeModels,
        runways,
        taxiways,
        crewMembers,
        certifications);

    GeneratedFlightPlan generatedFlightPlan = automationEngine.generateFlightPlan();
    FlightPlanEntity flightPlan = new FlightPlanEntity();
    flightPlan.setBasedOnFlight(generatedFlightPlan.getBasedOnFlight());
    flightPlan.setSelectedPlane(generatedFlightPlan.getSelectedPlane());
    flightPlan.setSelectedTakeoffRunway(generatedFlightPlan.getSelectedTakeoffRunway());
    flightPlan.setSelectedLandingRunway(generatedFlightPlan.getSelectedLandingRunway());
    flightPlan.setSelectedTakeoffTaxiway(generatedFlightPlan.getSelectedTakeoffTaxiway());
    flightPlan.setSelectedLandingTaxiway(generatedFlightPlan.getSelectedLandingTaxiway());
    flightPlan.setSelectedCrewMembers(generatedFlightPlan.getSelectedCrewMembers());

    flightPlanRepository.save(flightPlan);
  }

  public void deleteFlightPlan(EntityIdDTO entityIdDTO) {
    FlightPlanEntity existingFlightPlan = flightPlanRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    flightPlanRepository.delete(existingFlightPlan);
  }

  public Boolean doesSingleFlightPlanExist(FlightPlanEntity flightPlan) {
    Optional<FlightPlanEntity> flightPlanFound = flightPlanRepository.findById(flightPlan.getId());
    return flightPlanFound.isPresent();
  }

  public Boolean doesMultipleFlightPlansExist(List<FlightPlanEntity> flightPlans) {
    List<String> ids = new ArrayList<>();
    flightPlans.forEach(flightPlan -> ids.add(flightPlan.getId()));
    List<FlightPlanEntity> flightPlansFound = flightPlanRepository.findAllById(ids);
    if (flightPlans.size() != flightPlansFound.size()) {
      return false;
    }
    return flightPlansFound.isEmpty();
  }
}
