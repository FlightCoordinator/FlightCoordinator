import { BaseModel } from "./BaseModel";

export enum CertificationIssuers {
  FAA = "Federal Aviation Administration",
  EASA = "European Union Aviation Safety Agency",
  CAA = "Civil Aviation Authority",
  TRANSPORT_CANADA = "Transport Canada",
  DGCA = "Directorate General of Civil Aviation",
  CAAC = "Civil Aviation Administration of China",
  CASA = "Civil Aviation Safety Authority",
  ICAO = "International Civil Aviation Organization",
  ANAC = "Agência Nacional de Aviação Civil",
  GCAA = "General Civil Aviation Authority",
  SACAA = "South African Civil Aviation Authority",
  BOEING = "Boeing",
  AIRBUS = "Airbus",
  CESSNA = "Cessna",
  EMBRAER = "Embraer",
  BOMBARDIER = "Bombardier",
  DASSAULT = "Dassault Aviation",
  GULFSTREAM = "Gulfstream",
  IATA = "International Air Transport Association",
  RED_CROSS = "Red Cross",
  AHA = "American Heart Association",
  FLIGHT_SAFETY = "FlightSafety International",
  CAE = "CAE",
}

export enum CertificationIssuingCountry {
  US = "United States",
  EU = "European Union",
  CANADA = "Canada",
  INDIA = "India",
  CHINA = "China",
  AUSTRALIA = "Australia",
  UAE = "United Arab Emirates",
  GLOBAL = "Global",
}

export interface CertificationModel extends BaseModel {
  name: string;
  issuer: CertificationIssuers;
  issuingCountry: CertificationIssuingCountry;
  expirationDate: Date;
  validityPeriod: number;
  assignableRole: string[];
  description: string;
}
