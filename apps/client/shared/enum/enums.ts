/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
namespace Enums {
  export enum AirportType {
    INTERNATIONAL = "International",
    REGIONAL = "Regional",
    DOMESTIC = "Domestic",
  }
  export enum CertificationIssuer {
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
  export enum CrewAvailability {
    AVAILABLE = "Available",
    ON_DUTY = "On-Duty",
    ON_LEAVE = "On-Leave",
    UNAVAILABLE = "Unavailable",
  }
  export enum CrewRole {
    CAPTAIN = "Captain",
    FIRST_OFFICER = "First Officer",
    SECOND_OFFICER = "Seconds Officer",
    THIRD_OFFICER = "Third Officer",
    RELIEF_CREW_MEMBER = "Relief Crew Member",
    FLIGHT_ENGINEER = "Flight Engineer",
    AIRBORNE_SENSOR_OPR = "Airborne Sensor Opr.",
    PURSER = "Purser",
    FLIGHT_ATTENDANT = "Flight Attendant",
    FLIGHT_MEDIC = "Flight Medic",
    LOADMASTER = "Loadmaster",
  }
  export enum PlaneAvailability {
    AVAILABLE = "Available",
    UNDER_MAINTENANCE = "Under-Maintenance",
    IN_USE = "In-Use",
    RETIRED = "Retired",
  }
  export enum RunwaySurfaceType {
    ASPHALT = "Asphalt",
    CONCRETE = "Concrete",
    GRASS = "Grass",
    GRAVEL = "Gravel",
    DIRT = "Dirt",
    COMP_MATERIAL = "Composite Materials",
  }
  export enum GroundVehicleAvailability {
    AVAILABLE = "Available",
    IN_USE = "In-Use",
    UNDER_MAINTENANCE = "Under-Maintenance",
    OUT_OF_SERVICE = "Out-Of-Service",
  }
  export enum GroundVehicleType {
    TUG = "Tug",
    REFUELER = "Refueler",
    LOADER = "Loader",
    CATERING = "Catering",
    DE_ICER = "De-Icer",
    PUSHBACK = "Pushback",
    BUS = "Bus",
  }
}
export default Enums;
