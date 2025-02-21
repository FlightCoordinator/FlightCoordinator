package com.flightcoordinator.server.enums;

public enum CertificationIssuer {
  FAA("Federal Aviation Administration of United States"),
  EASA("European Union Aviation Safety Agency"),
  CAA_UK("Civil Aviation Authority of United Kingdom"),
  CAA_NZ("Civil Aviation Authority of New Zealand"),
  CAA_PK("Pakistan Civil Aviation Authority"),
  CAD_HK("Civil Aviation Department of Hong Kong"),
  CAA_PH("Civil Aviation Authority of the Philippines"),
  CAA_SG("Civil Aviation Authority of Singapore"),
  TRANSPORT_CANADA("Transport Canada"),
  DGCA_TR("Directorate General of Civil Aviation of Turkey"),
  DGCA_IN("Directorate General of Civil Aviation of India"),
  DGCA_ID("Directorate General of Civil Aviation of Indonesia"),
  DGCA_KW("Directorate General of Civil Aviation of Kuwait"),
  CAAC("Civil Aviation Administration of China"),
  CASA("Civil Aviation Safety Authority of Australia"),
  ICAO("International Civil Aviation Organization"),
  ANAC("National Civil Aviation Agency of Brazil"),
  GCAA("General Civil Aviation Authority of United Arab Emirates"),
  SACAA("South African Civil Aviation Authority"),
  IATA("International Air Transport Association"),
  FLIGHT_SAFETY("FlightSafety International"),
  ATRA("Aviation Training & Research Academy"),
  LAT("Lufthansa Aviation Training"),
  CAE("CAE Inc.");

  public final String organization;

  private CertificationIssuer(String organization) {
    this.organization = organization;
  }
}
