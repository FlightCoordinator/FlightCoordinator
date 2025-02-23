import type DataTransfer from "./dto";

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
      certificationNumber: number;
      issuer: string;
      expirationDate: Date;
      validityPeriod: number;
      assignableRole: string;
      description: string;
      assignedCrewMember: string;
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
      availability: string;
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
  export namespace Plane {
    export interface PlaneObject extends ObjectBase {
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
  export namespace Route {
    export interface RouteObject extends ObjectBase {
      originAirportId: string;
      destinationAirportId: string;
      distance: number;
      estimatedTime: number;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<RouteObject, "id">;
      export type UpdateMutationParams = RouteObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = DataTransfer.RouteDTO[];
    }
  }
  export namespace Runway {
    export interface RunwayObject extends ObjectBase {
      length: number;
      width: number;
      surfaceType: string;
      maxWeightCapacity: number;
      orientation: string;
      airportId: string;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<RunwayObject, "id">;
      export type UpdateMutationParams = RunwayObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = EntityTypes.RunwayEntity[];
    }
  }
  export namespace Vehicle {
    export interface VehicleObject extends ObjectBase {
      type: string;
      vehicleCode: string;
      capacity: number;
      availability: string;
      maintenanceDue: Date;
      airportId: string;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<VehicleObject, "id">;
      export type UpdateMutationParams = VehicleObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = EntityTypes.VehicleEntity[];
    }
  }
  export namespace Flight {
    export interface FlightObject extends ObjectBase {
      passengerCount: number;
      flightRouteId: string;
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
  export namespace AlgorithmResult {
    type AlgorithmResultId = { algorithmResultId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.AlgorithmResultDTO;
      export type UpdateMutationParams = AlgorithmResultId & DataTransfer.AlgorithmResultDTO;
      export type DeleteMutationParams = AlgorithmResultId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = AlgorithmResultId;
      export type QueryResponseParams = DataTransfer.AlgorithmResultDTO[];
    }
  }
  export namespace AlgorithmRun {
    type AlgorithmRunId = { algorithmRunId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.AlgorithmRunDTO;
      export type UpdateMutationParams = AlgorithmRunId & DataTransfer.AlgorithmRunDTO;
      export type DeleteMutationParams = AlgorithmRunId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = AlgorithmRunId;
      export type QueryResponseParams = DataTransfer.AlgorithmRunDTO[];
    }
  }
}

export default ResourceTypes;
