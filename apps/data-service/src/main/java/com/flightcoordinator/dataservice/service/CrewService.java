package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.CrewDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.entity.AirportEntity;
import com.flightcoordinator.dataservice.entity.CrewEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.AirportRepository;
import com.flightcoordinator.dataservice.repository.CrewRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class CrewService {
  @Autowired
  private CrewRepository crewRepository;

  @Autowired
  private AirportRepository airportRepository;

  public CrewDTO getSingleCrewMemberById(EntityIdDTO entityIdDTO) {
    CrewEntity crewMember = crewRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    CrewDTO crewDTO = ObjectMapper.toCrewDTO(crewMember);
    return crewDTO;
  }

  public List<CrewDTO> getMultipleCrewMemberById(List<EntityIdDTO> entityIdDTOs) {
    List<CrewEntity> crewMembers = crewRepository.findAllById(entityIdDTOs.stream().map(
        entityId -> entityId.getId()).collect(Collectors.toList()));
    if (crewMembers.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<CrewDTO> crewDTOs = crewMembers.stream().map(ObjectMapper::toCrewDTO).collect(Collectors.toList());
    return crewDTOs;
  }

  public List<CrewDTO> getAllCrewMembers() {
    List<CrewEntity> crewMembers = crewRepository.findAll();
    if (crewMembers.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<CrewDTO> crewDTOs = crewMembers.stream().map(ObjectMapper::toCrewDTO).collect(Collectors.toList());
    return crewDTOs;
  }

  public void createCrewMember(CrewDTO newCrewMemberDTO) {
    AirportEntity baseAirport = airportRepository.findById(newCrewMemberDTO.getBaseAirportId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    AirportEntity currentAirport = airportRepository.findById(newCrewMemberDTO.getCurrentAirportId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    CrewEntity crewEntity = new CrewEntity();
    crewEntity.setFullName(newCrewMemberDTO.getFullName());
    crewEntity.setEmail(newCrewMemberDTO.getEmail());
    crewEntity.setPhoneNumber(newCrewMemberDTO.getPhoneNumber());
    crewEntity.setRole(newCrewMemberDTO.getRole());
    crewEntity.setTotalFlightHours(newCrewMemberDTO.getTotalFlightHours());
    crewEntity.setBaseAirport(baseAirport);
    crewEntity.setCurrentAirport(currentAirport);
    crewEntity.setStatus(newCrewMemberDTO.getStatus());

    crewRepository.save(crewEntity);
  }

  public void updateCrewMember(CrewDTO updatedCrewMemberDTO) {
    AirportEntity baseAirport = airportRepository.findById(updatedCrewMemberDTO.getBaseAirportId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    AirportEntity currentAirport = airportRepository.findById(updatedCrewMemberDTO.getCurrentAirportId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    CrewEntity existingCrewMember = crewRepository.findById(updatedCrewMemberDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    existingCrewMember.setFullName(updatedCrewMemberDTO.getFullName());
    existingCrewMember.setEmail(updatedCrewMemberDTO.getEmail());
    existingCrewMember.setPhoneNumber(updatedCrewMemberDTO.getPhoneNumber());
    existingCrewMember.setRole(updatedCrewMemberDTO.getRole());
    existingCrewMember.setTotalFlightHours(updatedCrewMemberDTO.getTotalFlightHours());
    existingCrewMember.setBaseAirport(baseAirport);
    existingCrewMember.setCurrentAirport(currentAirport);
    existingCrewMember.setStatus(updatedCrewMemberDTO.getStatus());

    crewRepository.save(existingCrewMember);
  }

  public void deleteCrewMember(EntityIdDTO entityIdDTO) {
    CrewEntity existingCrewMember = crewRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    crewRepository.delete(existingCrewMember);
  }

  public Boolean doesSingleCrewExist(CrewEntity crewMember) {
    Optional<CrewEntity> crewMemberFound = crewRepository.findById(crewMember.getId());
    return crewMemberFound.isPresent();
  }

  public Boolean doesMultipleCrewsExist(List<CrewEntity> crewMembers) {
    List<String> ids = new ArrayList<>();
    crewMembers.forEach(crewMember -> ids.add(crewMember.getId()));
    List<CrewEntity> crewMembersFound = crewRepository.findAllById(ids);
    if (crewMembers.size() != crewMembersFound.size()) {
      return false;
    }
    return crewMembersFound.isEmpty();
  }
}
