/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
namespace Enums {
  export enum AirportType {
    INTERNATIONAL = "International",
    REGIONAL = "Regional",
    DOMESTIC = "Domestic",
  }
  export enum CertificationStatus {
    CERTIFIED = "Certified",
    PENDING_APPROVAL = "Pending Approval",
    REVOKED = "Revoked",
    UNDER_REVIEW = "Under Review",
    EXPIRED = "Expired",
  }
  export enum Certifier {
    FAA = "Federal Aviation Administration of United States",
    EASA = "European Union Aviation Safety Agency",
    CAA_UK = "Civil Aviation Authority of United Kingdom",
    CAA_NZ = "Civil Aviation Authority of New Zealand",
    CAA_PK = "Pakistan Civil Aviation Authority",
    CAD_HK = "Civil Aviation Department of Hong Kong",
    CAA_PH = "Civil Aviation Authority of the Philippines",
    CAA_SG = "Civil Aviation Authority of Singapore",
    TRANSPORT_CANADA = "Transport Canada",
    DGCA_TR = "Directorate General of Civil Aviation of Turkey",
    DGCA_IN = "Directorate General of Civil Aviation of India",
    DGCA_ID = "Directorate General of Civil Aviation of Indonesia",
    DGCA_KW = "Directorate General of Civil Aviation of Kuwait",
    CAAC = "Civil Aviation Administration of China",
    CASA = "Civil Aviation Safety Authority of Australia",
    ICAO = "International Civil Aviation Organization",
    ANAC = "National Civil Aviation Agency of Brazil",
    GCAA = "General Civil Aviation Authority of United Arab Emirates",
    SACAA = "South African Civil Aviation Authority",
    IATA = "International Air Transport Association",
    FLIGHT_SAFETY = "FlightSafety International",
    ATRA = "Aviation Training & Research Academy",
    LAT = "Lufthansa Aviation Training",
    CAE = "CAE Inc.",
  }
  export enum CrewMemberRole {
    CAPTAIN = "Captain",
    FIRST_OFFICER = "First Officer",
    SECOND_OFFICER = "Second Officer",
    RELIEF_CREW_MEMBER = "Relief Crew Member",
    PURSER = "Purser",
    CABIN_SUPERVISOR = "Cabin Supervisor",
    FLIGHT_ATTENDANT = "Flight Attendant",
    FLIGHT_MEDIC = "Flight Medic",
  }
  export enum CrewMemberStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    ON_LEAVE = "On-Leave",
    RETIRED = "Retired",
  }
  export enum EngineType {
    TURBOJET = "Turbo Jet",
    TURBOPROP = "Turbo Propeller",
    TURBOFAN = "Turbo Fan",
    RAMJET = "Ram Jet",
    SCRAMJET = "Scram Jet",
    PISTON = "Piston",
    ELECTRIC = "Electric",
    HYBRID_ELECTRIC = "Hybric Electric",
    HYDROGEN_FUEL_CELL = "Hydrogen Fuel Cell",
  }
  export enum NoiseCategory {
    CHAPTER_2 = "Chapter 2 - Older, louder aircraft",
    CHAPTER_3 = "Chapter 3 - Modern aircraft with standard noise levels",
    CHAPTER_4 = "Chapter 4 - Latest generation, significantly quieter",
    CHAPTER_14 = "Chapter 14 - Most recent standard, strictest noise regulations",
  }
  export enum PlaneStatus {
    ACTIVE = "Active",
    UNDER_MAINTENANCE = "Under-Maintenance",
    INACTIVE = "Inactive",
    RETIRED = "Retired",
  }
  export enum RunwayStatus {
    OPEN = "Open",
    CLOSED = "Closed",
    MAINTENANCE = "Under Maintenance",
    UNDER_CONSTRUCTION = "Under Construction",
    EMERGENCY_USE_ONLY = "Emergency Use Only",
  }
  export enum SurfaceType {
    ASPHALT = "Asphalt",
    CONCRETE = "Concrete",
    GRASS = "Grass",
    GRAVEL = "Gravel",
    DIRT = "Dirt",
    COMP_MATERIAL = "Composite Materials",
  }
  export enum VisualApproachAid {
    PAPI = "Precision Approach Path Indicator",
    VASI = "Visual Approach Slope Indicator",
    ALSF1 = "Approach Lighting System with Sequenced Flashers I",
    ALSF2 = "Approach Lighting System with Sequenced Flashers II",
    ODALS = "Omni-Directional Approach Lighting System",
    MALSR = "Medium Intensity Approach Lighting System with Runway Alignment Indicator Lights",
    SSALR = "Simplified Short Approach Lighting System with Runway Alignment Indicator Lights",
    MALS = "Medium Intensity Approach Lighting System",
    REIL = "Runway End Identifier Lights",
    HIRL = "High Intensity Runway Lights",
    MIRL = "Medium Intensity Runway Lights",
    LIR = "Low Intensity Runway Lights",
    NONE = "None",
  }
}
export default Enums;
