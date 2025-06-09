package com.flightcoordinator.dataservice.automation.selectors;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.flightcoordinator.dataservice.entity.AirportEntity;
import com.flightcoordinator.dataservice.entity.CertificationEntity;
import com.flightcoordinator.dataservice.entity.CrewEntity;
import com.flightcoordinator.dataservice.enums.CrewMemberRole;
import com.flightcoordinator.dataservice.enums.CrewMemberStatus;

public class CrewSelector {
  private final List<CrewEntity> crewMembers;
  private final List<CertificationEntity> certifications;
  private final AirportEntity originAirport;

  public CrewSelector(List<CrewEntity> crewMembers,
      List<CertificationEntity> certifications,
      AirportEntity originAirport) {
    this.crewMembers = crewMembers;
    this.certifications = certifications;
    this.originAirport = originAirport;
  }

  public List<CrewEntity> select() {
    Map<CrewMemberRole, Integer> requiredRoles = getRequiredCrewRoles();
    List<CrewEntity> selectedCrew = new ArrayList<>();

    for (Map.Entry<CrewMemberRole, Integer> entry : requiredRoles.entrySet()) {
      CrewMemberRole role = entry.getKey();
      int count = entry.getValue();

      List<CrewEntity> localCandidates = crewMembers.stream()
          .filter(cm -> cm.getRole() == role)
          .filter(this::isAvailable)
          .filter(this::isAtOriginAirport)
          .filter(this::hasValidCertifications)
          .sorted(Comparator.comparingDouble(this::scoreCrewMember).reversed())
          .collect(Collectors.toList());

      List<CrewEntity> relocatableCandidates = crewMembers.stream()
          .filter(cm -> cm.getRole() == role)
          .filter(this::isAvailable)
          .filter(cm -> !isAtOriginAirport(cm))
          .filter(this::hasValidCertifications)
          .sorted(Comparator.comparingDouble(cm -> scoreCrewMemberWithRelocationPenalty((CrewEntity) cm)).reversed())
          .collect(Collectors.toList());

      List<CrewEntity> finalCandidates = new ArrayList<>();
      finalCandidates.addAll(localCandidates);
      finalCandidates.addAll(relocatableCandidates);

      if (finalCandidates.size() < count) {
        throw new RuntimeException("Not enough valid crew for role: " + role);
      }
      selectedCrew.addAll(finalCandidates.subList(0, count));
    }
    return selectedCrew;
  }

  private boolean isAvailable(CrewEntity crewMember) {
    return crewMember.getStatus() == CrewMemberStatus.ACTIVE;
  }

  private boolean isAtOriginAirport(CrewEntity crewMember) {
    return crewMember.getCurrentAirport().getId().equals(originAirport.getId());
  }

  private boolean hasValidCertifications(CrewEntity crewMember) {
    return certifications.stream()
        .filter(c -> c.getAssignedCrewMember().getId().equals(crewMember.getId()))
        .filter(c -> c.getExpirationDate().after(new Date()))
        .findAny().isPresent();
  }

  private double scoreCrewMember(CrewEntity crewMember) {
    double fatiguePenalty = (double) crewMember.getTotalFlightHours() / 1000.0;
    double baseScore = 1.0 - fatiguePenalty;
    return baseScore + (Math.random() * 0.1); // Slight randomness
  }

  private Map<CrewMemberRole, Integer> getRequiredCrewRoles() {
    Map<CrewMemberRole, Integer> map = new HashMap<>();
    map.put(CrewMemberRole.CAPTAIN, 1);
    map.put(CrewMemberRole.FIRST_OFFICER, 1);
    map.put(CrewMemberRole.FLIGHT_ATTENDANT, 2);
    return map;
  }

  private double scoreCrewMemberWithRelocationPenalty(CrewEntity crewMember) {
    double base = scoreCrewMember(crewMember);
    return base - 0.2; // Penalize slightly for relocation
  }
}
