import CountryCodes from "@/shared/enum/countries";
import Enums from "@/shared/enum/enums";

namespace DataTransfer {
  interface BaseDTO {
    id: string;
  }
  export interface AirportDTO extends BaseDTO {
    name: string;
    iataCode: string;
    icaoCode: string;
    countryCode: CountryCodes;
    type: Enums.AirportType;
    operationStartTime: string;
    operationStopTime: string;
    elevation: number;
    slope: number;
    possibleNoiseCategory: Enums.NoiseCategory;
    runwayIds: string[];
    taxiwayIds: string[];
    planesPresentIds: string[];
    flightFromAirportIds: string[];
    flightToAirportIds: string[];
    crewMembersPresentIds: string[];
  }
  export interface AlgorithmResultDTO extends BaseDTO {
    flightId: string;
    planeId: string;
    crewMemberIds: Array<string>;
    takeoffTaxiwayId: string;
    takeoffRunwayId: string;
    landingRunwayId: string;
    landingTaxiwayId: string;
  }
  export interface AlgorithmRunDTO extends BaseDTO {
    algorithmName: string;
    startTime: Date;
    endTime: Date;
    runtimeInMs: number;
    resourcesJson: string;
    constrainsJson: string;
    logsJson: string;
    isSuccessful: boolean;
    failureReason: string;
    areResultsSaved: boolean;
    resultId: string;
  }
  export interface CertificationDTO extends BaseDTO {
    name: string;
    certificationNumber: string;
    issuer: Enums.Certifier;
    expirationDate: Date;
    validityPeriod: number;
    description: string;
    assignedCrewMemberId: string;
  }
  export interface CrewDTO extends BaseDTO {
    fullName: string;
    email: string;
    phoneNumber: string;
    role: Enums.CrewRoles;
    certificationIds: Array<string>;
    totalFlightHours: number;
    baseAirportId: string;
    currentAirportId: string;
    status: Enums.CrewMemberStatus;
  }
  export interface FlightDTO extends BaseDTO {
    passengerCount: number;
    cargoWeight: number;
    originAirportId: string;
    destinationAirportId: string;
    distance: number;
    estimatedTakeoffTime: string;
    estimatedLandingTime: string;
    estimatedFlightDuration: number;
  }
  export interface ModelDTO extends BaseDTO {
    manufacturer: string;
    planeIdentifier: string;
    modelName: string;
    certifier: Enums.Certifier;
    certificationStatus: Enums.CertificationStatus;
    noiseCategory: Enums.NoiseCategory;
    fuelCapacity: number;
    fuelEfficiency: number;
    maxPassengerCapacity: number;
    maxCargoCapacity: number;
    emptyWeight: number;
    tailHeight: number;
    wingspan: number;
    engineType: Enums.EngineType;
    engineCount: number;
    thrustPerEngine: number;
    maxCrosswindComp: number;
    requiredRunwayLength: number;
    requiredRunwayWidth: number;
    minRotationRadius: number;
    cruiseSpeed: number;
    maxSpeed: number;
    stallSpeed: number;
    maxAltitude: number;
    climbRate: number;
    descentRate: number;
    maxFlightRange: number;
    hasWeatherRadar: boolean;
    hasAutopilot: boolean;
    hasFlyByWire: boolean;
    hasFireSupression: boolean;
    gpsEnabled: boolean;
  }
  export interface PlaneDTO extends BaseDTO {
    modelId: string;
    tailNumber: string;
    nextMaintenanceDate: Date;
    cyclesSinceLastMaintenance: number;
    retirementDate: Date;
    engineHours: number;
    currentWearLevel: number;
    totalFlightHours: number;
    fuelAmount: number;
    planeStatus: Enums.PlaneStatus;
    currentLocationId: string;
    aircraftOperator: string;
  }
  export interface RunwayDTO extends BaseDTO {
    runwayNumber: string;
    airportId: string;
    length: number;
    width: number;
    surfaceType: Enums.SurfaceType;
    maxWeightCapacity: number;
    hasMarkings: boolean;
    hasLighting: boolean;
    hasILS: boolean;
    hasSafetyArea: boolean;
    visualApproachAid: Enums.VisualApproachAid;
    altitude: number;
    status: Enums.RunwayStatus;
    crosswindLimit: number;
  }
  export interface TaxiwayDTO extends BaseDTO {
    name: string;
    airportId: string;
    loadCapacity: number;
    hasHoldingPoint: boolean;
    hasHighSpeedExit: boolean;
    width: number;
    length: number;
    maxTurningRadius: number;
    maxWeightCapacity: number;
    hasLighting: boolean;
    hasSignage: boolean;
    connectedRunwayId: string;
  }
}
export default DataTransfer;
