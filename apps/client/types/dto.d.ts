import Enums from "@/shared/enum/enums";

namespace DataTransfer {
  interface BaseDTO {
    id: string;
  }
  export interface AirportDTO extends BaseDTO {
    name: string;
    iataCode: string;
    icaoCode: string;
    countryCode: string;
    type: Enums.AirportType;
    runwayIds: Array<string>;
    vehiclesPresentIds: Array<string>;
    planesPresentIds: Array<string>;
    routesOriginatingFromAirportIds: Array<string>;
    routesDestinedForAirportIds: Array<string>;
    crewMembersPresentIds: Array<string>;
  }
  export interface AlgorithmResultDTO extends BaseDTO {
    flightId: string;
    planeId: string;
    crewMemberIds: Array<string>;
    takeoffRunwayId: string;
    landingRunwayId: string;
    originAirportGroundVehicleIds: Array<string>;
    destinationAirportGroundVehicleIds: Array<string>;
  }
  export interface AlgorithmRunDTO extends BaseDTO {
    algorithmName: string;
    startTime: Date;
    endTime: Date;
    runtimeInMilliseconds: number;
    parametersJson: string;
    resourcesJson: string;
    constrainsMet: Map<string, boolean>;
    logs: string[];
    isSuccessful: boolean;
    failureReason: string;
    isResultsSaved: boolean;
    resultId: string;
  }
  export interface CertificationDTO extends BaseDTO {
    name: string;
    certificationNumber: number;
    issuer: Enums.CertificationIssuer;
    expirationDate: Date;
    validityPeriod: number;
    assignableRole: Enums.CrewRoles;
    description: string;
    assignedCrewMember: string;
  }
  export interface CrewDTO extends BaseDTO {
    fullName: string;
    email: string;
    phoneNumber: string;
    role: Enums.CrewRoles;
    certificationIds: Array<string>;
    totalFlightHours: number;
    baseAirportId: string;
    availability: Enums.CrewAvailability;
  }
  export interface FlightDTO extends BaseDTO {
    passengerCount: number;
    flightRouteId: string;
  }
  export interface PlaneDTO extends BaseDTO {
    model: string;
    registrationNumber: string;
    passengerCapacity: number;
    fuelEfficiency: number;
    maxFlightRange: number;
    lastMaintenance: Date;
    totalFlightHours: number;
    maxTakeoffWeight: number;
    shortestRunwayLengthRequired: number;
    shortestRunwayWidthRequired: number;
    planeStatus: Enums.PlaneAvailability;
    currentLocationId: string;
    aircraftOperator: string;
  }
  export interface RouteDTO extends BaseDTO {
    originAirportId: string;
    destinationAirportId: string;
    distance: number;
    estimatedTime: number;
  }
  export interface RunwayDTO extends BaseDTO {
    length: number;
    width: number;
    surfaceType: Enums.RunwaySurfaceType;
    maxWeightCapacity: number;
    orientation: string;
    airportId: string;
  }
  export interface VehicleDTO extends BaseDTO {
    type: Enums.GroundVehicleType;
    vehicleCode: string;
    capacity: number;
    availability: Enums.GroundVehicleAvailability;
    maintenanceDue: Date;
    airportId: string;
  }
}
export default DataTransfer;
