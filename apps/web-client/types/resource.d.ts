import type DataTransfer from "./dataTransfer";

namespace ResourceTypes {
  interface ObjectBase {
    id: string;
  }
  export namespace Airport {
    export interface AirportObject extends ObjectBase {
      name: string;
      iataCode: string;
      icaoCode: string;
      countryCode: string;
      type: string;
      operationStartTime: string;
      operationStopTime: string;
      elevation: number;
      slope: number;
      possibleNoiseCategory: string;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<AirportObject, "id">;
      export type UpdateMutationParams = AirportObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = DataTransfer.AirportDTO[];
    }
  }
  export namespace Certification {
    export interface CertificationObject extends ObjectBase {
      name: string;
      certificationNumber: string;
      issuer: string;
      expirationDate: Date;
      validityPeriod: number;
      description: string;
      assignedCrewMemberId: string;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<CertificationObject, "id">;
      export type UpdateMutationParams = CertificationObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = DataTransfer.CertificationDTO[];
    }
  }
  export namespace Crew {
    export interface CrewObject extends ObjectBase {
      fullName: string;
      email: string;
      phoneNumber: string;
      role: string;
      totalFlightHours: number;
      baseAirportId: string;
      currentAirportId: string;
      status: string;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<CrewObject, "id">;
      export type UpdateMutationParams = CrewObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = DataTransfer.CrewDTO[];
    }
  }
  export namespace Model {
    export interface ModelObject extends ObjectBase {
      manufacturer: string;
      planeIdentifier: string;
      modelName: string;
      certifier: string;
      certificationStatus: string;
      noiseCategory: string;
      fuelCapacity: number;
      fuelEfficiency: number;
      maxPassengerCapacity: number;
      maxCargoCapacity: number;
      emptyWeight: number;
      tailHeight: number;
      wingspan: number;
      engineType: string;
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
      hasWeatherRadar: string;
      hasAutopilot: string;
      hasFlyByWire: string;
      hasFireSupression: string;
      gpsEnabled: string;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<ModelObject, "id">;
      export type UpdateMutationParams = ModelObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = DataTransfer.ModelDTO[];
    }
  }
  export namespace Plane {
    export interface PlaneObject extends ObjectBase {
      modelId: string;
      tailNumber: string;
      nextMaintenanceDate: Date;
      cyclesSinceLastMaintenance: number;
      retirementDate: Date;
      engineHours: number;
      currentWearLevel: number;
      totalFlightHours: number;
      fuelAmount: number;
      planeStatus: string;
      currentLocationId: string;
      aircraftOperator: string;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<PlaneObject, "id">;
      export type UpdateMutationParams = PlaneObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = DataTransfer.PlaneDTO[];
    }
  }
  export namespace Runway {
    export interface RunwayObject extends ObjectBase {
      runwayNumber: string;
      airportId: string;
      length: number;
      width: number;
      surfaceType: string;
      maxWeightCapacity: number;
      hasMarkings: string;
      hasLighting: string;
      hasILS: string;
      hasSafetyArea: string;
      visualApproachAid: string;
      altitude: number;
      status: string;
      crosswindLimit: number;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<RunwayObject, "id">;
      export type UpdateMutationParams = RunwayObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = DataTransfer.RunwayDTO[];
    }
  }
  export namespace Taxiway {
    export interface TaxiwayObject extends ObjectBase {
      name: string;
      airportId: string;
      loadCapacity: number;
      hasHoldingPoint: string;
      hasHighSpeedExit: string;
      width: number;
      length: number;
      maxTurningRadius: number;
      maxWeightCapacity: number;
      hasLighting: string;
      hasSignage: string;
      connectedRunwayId: string;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<TaxiwayObject, "id">;
      export type UpdateMutationParams = TaxiwayObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = DataTransfer.TaxiwayDTO[];
    }
  }
  export namespace Flight {
    export interface FlightObject extends ObjectBase {
      passengerCount: number;
      cargoWeight: number;
      originAirportId: string;
      destinationAirportId: string;
      distance: number;
      estimatedTakeoffTime: string;
      estimatedLandingTime: string;
      estimatedFlightDuration: number;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<PlaneObject, "id">;
      export type UpdateMutationParams = PlaneObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = DataTransfer.FlightDTO[];
    }
  }
}

export default ResourceTypes;
