package com.flightcoordinator.dataservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flightcoordinator.dataservice.constants.Messages;
import com.flightcoordinator.dataservice.dto.CertificationDTO;
import com.flightcoordinator.dataservice.dto.misc.EntityIdDTO;
import com.flightcoordinator.dataservice.entity.CertificationEntity;
import com.flightcoordinator.dataservice.entity.CrewEntity;
import com.flightcoordinator.dataservice.exception.AppError;
import com.flightcoordinator.dataservice.repository.CertificationRepository;
import com.flightcoordinator.dataservice.repository.CrewRepository;
import com.flightcoordinator.dataservice.utils.ObjectMapper;

@Service
public class CertificationService {
  @Autowired
  private CertificationRepository certificationRepository;

  @Autowired
  private CrewRepository crewRepository;

  public CertificationDTO getSingleCertificationById(EntityIdDTO entityIdDTO) {
    CertificationEntity certification = certificationRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    CertificationDTO certificationDTO = ObjectMapper.toCertificationDTO(certification);
    return certificationDTO;
  }

  public List<CertificationDTO> getMultipleCertificationsById(List<EntityIdDTO> entityIdDTOs) {
    List<CertificationEntity> certifications = certificationRepository.findAllById(entityIdDTOs.stream().map(
        entityId -> entityId.getId()).collect(Collectors.toList()));
    if (certifications.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<CertificationDTO> certificationDTOs = certifications.stream().map(ObjectMapper::toCertificationDTO)
        .collect(Collectors.toList());
    return certificationDTOs;
  }

  public List<CertificationDTO> getAllCertifications() {
    List<CertificationEntity> certifications = certificationRepository.findAll();
    if (certifications.isEmpty()) {
      throw new AppError(Messages.NOT_FOUND_MULTIPLE, HttpStatus.NOT_FOUND.value());
    }
    List<CertificationDTO> certificationDTOs = certifications.stream().map(ObjectMapper::toCertificationDTO)
        .collect(Collectors.toList());
    return certificationDTOs;
  }

  public void createCertification(CertificationDTO newCertificationDTO) {
    CrewEntity crewEntity = crewRepository.findById(newCertificationDTO.getAssignedCrewMemberId())
        .orElseThrow(() -> new AppError(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST.value()));

    CertificationEntity certificationEntity = new CertificationEntity();
    certificationEntity.setName(newCertificationDTO.getName());
    certificationEntity.setCertificationNumber(newCertificationDTO.getCertificationNumber());
    certificationEntity.setIssuer(newCertificationDTO.getIssuer());
    certificationEntity.setExpirationDate(newCertificationDTO.getExpirationDate());
    certificationEntity.setValidityPeriod(newCertificationDTO.getValidityPeriod());
    certificationEntity.setDescription(newCertificationDTO.getDescription());
    certificationEntity.setAssignedCrewMember(crewEntity);

    certificationRepository.save(certificationEntity);
  }

  public void updateCertification(CertificationDTO updatedCertificationDTO) {
    CrewEntity crewEntity = crewRepository.findById(updatedCertificationDTO.getAssignedCrewMemberId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    CertificationEntity existingCertification = certificationRepository.findById(updatedCertificationDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));

    existingCertification.setName(updatedCertificationDTO.getName());
    existingCertification.setCertificationNumber(updatedCertificationDTO.getCertificationNumber());
    existingCertification.setIssuer(updatedCertificationDTO.getIssuer());
    existingCertification.setExpirationDate(updatedCertificationDTO.getExpirationDate());
    existingCertification.setValidityPeriod(updatedCertificationDTO.getValidityPeriod());
    existingCertification.setDescription(updatedCertificationDTO.getDescription());
    existingCertification.setAssignedCrewMember(crewEntity);

    certificationRepository.save(existingCertification);
  }

  public void deleteCertification(EntityIdDTO entityIdDTO) {
    CertificationEntity existingCertification = certificationRepository.findById(entityIdDTO.getId())
        .orElseThrow(() -> new AppError(Messages.NOT_FOUND_SINGLE, HttpStatus.NOT_FOUND.value()));
    certificationRepository.delete(existingCertification);
  }

  public Boolean doesSingleCertificationExist(CertificationEntity certification) {
    Optional<CertificationEntity> certificationFound = certificationRepository.findById(certification.getId());
    return certificationFound.isPresent();
  }

  public Boolean doesMultipleCertificationsExist(List<CertificationEntity> certifications) {
    List<String> ids = new ArrayList<>();
    certifications.forEach(certification -> ids.add(certification.getId()));
    List<CertificationEntity> certificationsFound = certificationRepository.findAllById(ids);
    if (certifications.size() != certificationsFound.size()) {
      return false;
    }
    return certificationsFound.isEmpty();
  }
}
