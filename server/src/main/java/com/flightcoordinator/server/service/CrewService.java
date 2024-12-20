package com.flightcoordinator.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.server.entity.CrewEntity;
import com.flightcoordinator.server.exception.AppError;
import com.flightcoordinator.server.repository.CrewRepository;

@Service
public class CrewService {
  @Autowired
  private CrewRepository crewRepository;

  public CrewEntity getSingleCrewMemberById(String crewMemberId) {
    Optional<CrewEntity> crewMember = crewRepository.findById(crewMemberId);
    return crewMember.orElseThrow(() -> new AppError("notFound.crew", HttpStatus.NOT_FOUND.value()));
  }

  public List<CrewEntity> getMultipleCrewMemberById(List<String> crewMemberIds) {
    List<CrewEntity> crewMembers = crewRepository.findAllById(crewMemberIds);
    if (crewMembers.isEmpty()) {
      throw new AppError("notFound.crew", HttpStatus.NOT_FOUND.value());
    }
    return crewMembers;
  }

  public List<CrewEntity> getAllCrewMembers() {
    List<CrewEntity> crewMembers = crewRepository.findAll();
    if (crewMembers.isEmpty()) {
      throw new AppError("notFound.crew", HttpStatus.NOT_FOUND.value());
    }
    return crewMembers;
  }

  public void createCrewMember(CrewEntity newCrewMember) {
    crewRepository.save(newCrewMember);
  }

  public void updateCrewMember(String crewMemberId, CrewEntity updatedCrewMember) {
    Boolean doesPhoneNumberValid = isPhoneNumberValid(updatedCrewMember.getPhoneNumber());
    if (doesPhoneNumberValid) {
      throw new AppError("genericMessages.badRequest", HttpStatus.BAD_REQUEST.value());
    }

    CrewEntity existingCrewMember = getSingleCrewMemberById(crewMemberId);

    existingCrewMember.setFullName(updatedCrewMember.getFullName());
    existingCrewMember.setEmail(updatedCrewMember.getEmail());
    existingCrewMember.setPhoneNumber(updatedCrewMember.getPhoneNumber());
    existingCrewMember.setRole(updatedCrewMember.getRole());
    existingCrewMember.setCertifications(updatedCrewMember.getCertifications());
    existingCrewMember.setTotalFlightHours(updatedCrewMember.getTotalFlightHours());
    existingCrewMember.setBaseAirport(updatedCrewMember.getBaseAirport());
    existingCrewMember.setAvailability(updatedCrewMember.getAvailability());

    crewRepository.save(existingCrewMember);
  }

  public void deleteCrewMember(String crewMemberId) {
    CrewEntity existingCrewMember = getSingleCrewMemberById(crewMemberId);
    crewRepository.delete(existingCrewMember);
  }

  private Boolean isPhoneNumberValid(Integer phoneNumber) {
    return phoneNumber.toString().length() == 11;
  }

  public Boolean doesSingleCrewExist(CrewEntity crewMember) {
    String crewMemberId = crewMember.getId();
    Optional<CrewEntity> crewMemberFound = crewRepository.findById(crewMemberId);
    return crewMemberFound.isPresent();
  }

  public Boolean doesMultipleCrewsExist(List<CrewEntity> crewMembers) {
    List<String> crewMemberIds = new ArrayList<>();
    crewMembers.forEach(crewMember -> crewMemberIds.add(crewMember.getId()));
    List<CrewEntity> crewMembersFound = crewRepository.findAllById(crewMemberIds);
    if (crewMembers.size() != crewMembersFound.size()) {
      return false;
    }
    return crewMembersFound.isEmpty();
  }
}
